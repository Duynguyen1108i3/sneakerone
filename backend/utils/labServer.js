const { spawn, spawnSync } = require("child_process");
const express = require("express");
const fs = require("fs");
const http = require("http");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "../..");
const LABTH_DIR = path.join(REPO_ROOT, "labth");
const PHP_ROUTER = path.join(__dirname, "../php-router.php");
const PHP_PORT = Number(process.env.PHP_PORT) || 9001;

const IGNORED_SUBDIRS = new Set([
    "classes",
    "config",
    "css",
    "js",
    "image",
    "images",
    "image_data",
    "include",
    "module",
    "database",
    "lib",
    "files",
    "ckfinder",
    "ckeditor",
    "error",
    "resources",
    "font",
    "fonts"
]);

let phpProcess = null;
let phpAvailable = true;
let phpMode = "native";
let phpModeChecked = false;
let isShuttingDown = false;
let wasmContextPromise = null;
let wasmQueue = Promise.resolve();

function hasWasmRuntimePackages() {
    try {
        require.resolve("@php-wasm/universal");
        require.resolve("@php-wasm/node-8-3");
        return true;
    } catch (error) {
        return false;
    }
}

function detectPhpModeSync() {
    if (phpModeChecked) {
        return phpMode;
    }
    phpModeChecked = true;

    const probe = spawnSync("php", ["-v"], { stdio: "ignore", timeout: 1500 });
    if (!probe.error && probe.status === 0) {
        phpMode = "native";
        phpAvailable = true;
        return phpMode;
    }

    if (hasWasmRuntimePackages()) {
        phpMode = "wasm";
        phpAvailable = true;
        console.log("PHP CLI not found; using built-in PHP 8.3 WebAssembly runtime for /labth.");
    } else {
        phpMode = "preview";
        phpAvailable = false;
        console.warn("PHP CLI not found; /labth will fall back to static/source preview mode.");
    }
    return phpMode;
}

function naturalCompare(a, b) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatGroupTitle(folderName) {
    if (folderName.toLowerCase() === "database") {
        return "Database";
    }

    const labMatch = /^lab(\d+)$/i.exec(folderName);
    if (labMatch) {
        return `Lab ${labMatch[1].padStart(2, "0")}`;
    }

    return folderName;
}

function toPosixRelative(fullPath) {
    return path.relative(LABTH_DIR, fullPath).split(path.sep).join("/");
}

function makeItem(fullPath, groupFolder) {
    const relPath = toPosixRelative(fullPath);
    const ext = path.extname(fullPath).slice(1).toLowerCase();
    const displayName = groupFolder && relPath.startsWith(`${groupFolder}/`)
        ? relPath.slice(groupFolder.length + 1).split("/").join(" / ")
        : relPath;

    return {
        name: displayName,
        path: relPath,
        ext
    };
}

function scanDatabaseDir(dirPath, groupFolder, items) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const allowedExt = new Set([".sql", ".png", ".jpg", ".jpeg", ".gif", ".html", ".php"]);

    for (const entry of entries) {
        if (entry.name.startsWith(".")) {
            continue;
        }

        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            scanDatabaseDir(fullPath, groupFolder, items);
        } else if (entry.isFile() && allowedExt.has(path.extname(entry.name).toLowerCase())) {
            items.push(makeItem(fullPath, groupFolder));
        }
    }
}

function findIndexEntry(dirPath) {
    for (const candidate of ["index.php", "index.html"]) {
        const fullCandidate = path.join(dirPath, candidate);
        if (fs.existsSync(fullCandidate) && fs.statSync(fullCandidate).isFile()) {
            return fullCandidate;
        }
    }
    return null;
}

function scanLabSubdir(dirPath, groupFolder, depth, items) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    if (depth >= 1) {
        const indexFile = findIndexEntry(dirPath);
        if (indexFile) {
            items.push(makeItem(indexFile, groupFolder));

            for (const adminFolder of ["admin", "admins"]) {
                const adminDir = path.join(dirPath, adminFolder);
                if (fs.existsSync(adminDir) && fs.statSync(adminDir).isDirectory()) {
                    const adminIndex = findIndexEntry(adminDir);
                    if (adminIndex) {
                        items.push(makeItem(adminIndex, groupFolder));
                    }
                }
            }
            return;
        }
    }

    for (const entry of entries) {
        if (entry.name.startsWith(".")) {
            continue;
        }

        const fullPath = path.join(dirPath, entry.name);
        if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (ext === ".php" || ext === ".html") {
                items.push(makeItem(fullPath, groupFolder));
            }
        } else if (entry.isDirectory()) {
            if (IGNORED_SUBDIRS.has(entry.name.toLowerCase())) {
                continue;
            }
            scanLabSubdir(fullPath, groupFolder, depth + 1, items);
        }
    }
}

function scanLabDirectory() {
    detectPhpModeSync();

    if (!fs.existsSync(LABTH_DIR)) {
        return { serverMode: "express", phpAvailable, phpMode, groups: [] };
    }

    const entries = fs.readdirSync(LABTH_DIR, { withFileTypes: true });
    const rootItems = [];
    const folderNames = [];

    for (const entry of entries) {
        if (entry.name.startsWith(".")) {
            continue;
        }

        const fullPath = path.join(LABTH_DIR, entry.name);
        if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (ext === ".php" || ext === ".html") {
                rootItems.push(makeItem(fullPath, ""));
            }
        } else if (entry.isDirectory()) {
            folderNames.push(entry.name);
        }
    }

    folderNames.sort((a, b) => {
        const aIsDb = a.toLowerCase() === "database";
        const bIsDb = b.toLowerCase() === "database";
        if (aIsDb !== bIsDb) {
            return aIsDb ? 1 : -1;
        }
        return naturalCompare(a, b);
    });

    const groups = [];

    if (rootItems.length) {
        rootItems.sort((a, b) => naturalCompare(a.path, b.path));
        groups.push({
            id: "root",
            title: "Chung",
            items: rootItems
        });
    }

    for (const folderName of folderNames) {
        const folderPath = path.join(LABTH_DIR, folderName);
        const items = [];

        if (folderName.toLowerCase() === "database") {
            scanDatabaseDir(folderPath, folderName, items);
        } else {
            scanLabSubdir(folderPath, folderName, 0, items);
        }

        if (items.length) {
            items.sort((a, b) => naturalCompare(a.path, b.path));
            groups.push({
                id: folderName,
                title: formatGroupTitle(folderName),
                items
            });
        }
    }

    return {
        serverMode: "express",
        phpAvailable,
        phpMode,
        groups
    };
}

function startPhpServer() {
    if (isShuttingDown || phpProcess) {
        return;
    }

    if (!fs.existsSync(LABTH_DIR)) {
        return;
    }

    if (detectPhpModeSync() !== "native") {
        return;
    }

    const child = spawn(
        "php",
        ["-S", `127.0.0.1:${PHP_PORT}`, "-t", REPO_ROOT, PHP_ROUTER],
        {
            env: {
                ...process.env,
                PHP_CLI_SERVER_WORKERS: process.env.PHP_CLI_SERVER_WORKERS || "4"
            },
            stdio: ["ignore", "pipe", "pipe"]
        }
    );

    phpProcess = child;

    child.stdout.on("data", (chunk) => {
        const text = chunk.toString().trim();
        if (text) {
            console.log(`[php] ${text}`);
        }
    });

    child.stderr.on("data", (chunk) => {
        const text = chunk.toString().trim();
        if (text && !text.includes("Development Server")) {
            console.error(`[php] ${text}`);
        }
    });

    child.on("error", (error) => {
        phpProcess = null;
        if (error.code === "ENOENT") {
            if (hasWasmRuntimePackages()) {
                phpMode = "wasm";
                phpAvailable = true;
                console.log("PHP CLI not found; using built-in PHP 8.3 WebAssembly runtime for /labth.");
            } else {
                phpMode = "preview";
                phpAvailable = false;
                console.warn("PHP CLI not found; /labth will fall back to static/source preview mode.");
            }
            return;
        }
        console.error("Failed to start PHP server:", error.message);
    });

    child.on("exit", (code) => {
        if (phpProcess === child) {
            phpProcess = null;
        }
        if (!isShuttingDown && phpAvailable && phpMode === "native" && code !== 0) {
            console.warn(`PHP server exited with code ${code}; restarting...`);
            setTimeout(startPhpServer, 1000);
        }
    });
}

function stopPhpServer() {
    isShuttingDown = true;
    if (phpProcess) {
        phpProcess.kill("SIGTERM");
        phpProcess = null;
    }
    wasmContextPromise = null;
}

function copyLabFilesToWasm(php, hostDir, vfsDir) {
    php.mkdirTree(vfsDir);
    const entries = fs.readdirSync(hostDir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name.startsWith(".") && entry.name !== ".htaccess") {
            continue;
        }
        const src = path.join(hostDir, entry.name);
        const dst = `${vfsDir}/${entry.name}`;
        if (entry.isDirectory()) {
            copyLabFilesToWasm(php, src, dst);
        } else if (entry.isFile() && /\.(php|html?|sql|txt|md|log|htaccess)$/i.test(entry.name)) {
            php.writeFile(dst, fs.readFileSync(src));
        }
    }
}

async function getOrCreateWasmContext() {
    if (!wasmContextPromise) {
        wasmContextPromise = (async () => {
            const { PHP, PHPRequestHandler, loadPHPRuntime } = require("@php-wasm/universal");
            const { getPHPLoaderModule, jspi } = require("@php-wasm/node-8-3");
            const pkgDir = path.dirname(require.resolve("@php-wasm/node-8-3/package.json"));
            const variant = (await jspi()) ? "jspi" : "asyncify";
            const loader = await getPHPLoaderModule();
            const runtimeId = await loadPHPRuntime(loader, {
                locateFile(file) {
                    const raw = String(file || "");
                    if (path.isAbsolute(raw) && fs.existsSync(raw)) {
                        return raw;
                    }
                    return path.join(pkgDir, variant, raw.replace(/^\//, ""));
                }
            });
            const php = new PHP(runtimeId);
            copyLabFilesToWasm(php, LABTH_DIR, "/labth");
            const handler = new PHPRequestHandler({
                php,
                documentRoot: "/labth",
                absoluteUrl: "http://127.0.0.1",
                cookieStore: false
            });
            return { php, handler };
        })().catch((error) => {
            wasmContextPromise = null;
            throw error;
        });
    }
    return wasmContextPromise;
}

function collectRequestBody(req) {
    if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method) || req.readableEnded) {
        return Promise.resolve(undefined);
    }
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => resolve(chunks.length ? Buffer.concat(chunks) : undefined));
        req.on("error", reject);
    });
}

function extractInlineRedirectLocation(filePath) {
    try {
        const source = fs.readFileSync(filePath, "utf8");
        const match = /header\s*\(\s*["']location\s*:\s*([^"'\r\n]+)["']\s*\)/i.exec(source);
        return match ? match[1].trim() : "";
    } catch (error) {
        return "";
    }
}

function enqueueWasmTask(task) {
    const run = wasmQueue.then(task, task);
    wasmQueue = run.catch(() => {});
    return run;
}

function createWasmHandler(staticMiddleware, fallbackHandler) {
    return async (req, res, next) => {
        let decodedPath = "/";
        try {
            decodedPath = decodeURIComponent(req.path);
        } catch (error) {
            return res.status(400).send("Invalid path.");
        }

        const resolvedPath = path.resolve(LABTH_DIR, `.${decodedPath}`);
        if (resolvedPath !== LABTH_DIR && !resolvedPath.startsWith(LABTH_DIR + path.sep)) {
            return res.status(403).send("Forbidden");
        }

        let targetFile = resolvedPath;
        let phpRequestUrl = req.url;
        if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
            if (!req.path.endsWith("/")) {
                const qs = req.originalUrl.includes("?") ? req.originalUrl.slice(req.originalUrl.indexOf("?")) : "";
                return res.redirect(302, `${req.baseUrl}${req.path}/${qs}`);
            }

            const indexFile = findIndexEntry(resolvedPath);
            if (!indexFile) {
                const entries = fs.readdirSync(resolvedPath, { withFileTypes: true })
                    .filter((entry) => !entry.name.startsWith("."))
                    .sort((a, b) => naturalCompare(a.name, b.name));
                const listItems = entries.map((entry) => {
                    const suffix = entry.isDirectory() ? "/" : "";
                    return `<li><a href="${escapeHtml(encodeURIComponent(entry.name) + suffix)}">${escapeHtml(entry.name + suffix)}</a></li>`;
                }).join("");
                res.setHeader("Content-Disposition", "inline");
                return res.status(200).type("html").send(`<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>labth${escapeHtml(decodedPath)}</title><style>body{font-family:system-ui,sans-serif;max-width:860px;margin:40px auto;padding:0 20px;line-height:1.6}a{color:#111;font-weight:600;text-decoration:none}a:hover{text-decoration:underline}li{padding:6px 0}</style></head><body><p><a href="/#labthweb">&larr; Quay lại LABTHWEB</a></p><h2>labth${escapeHtml(decodedPath)}</h2><ul>${listItems}</ul></body></html>`);
            }
            targetFile = indexFile;
            const qsIndex = req.url.indexOf("?");
            const rawPath = qsIndex >= 0 ? req.url.slice(0, qsIndex) : req.url;
            const qs = qsIndex >= 0 ? req.url.slice(qsIndex) : "";
            phpRequestUrl = `${rawPath}${path.basename(indexFile)}${qs}`;
        }

        if (!fs.existsSync(targetFile) || !fs.statSync(targetFile).isFile()) {
            return res.status(404).send("Not Found");
        }

        const ext = path.extname(targetFile).toLowerCase();
        if (ext === ".sql" || ext === ".txt" || ext === ".md" || ext === ".log" || path.basename(targetFile) === ".htaccess") {
            res.setHeader("Content-Disposition", "inline");
            return res.type("text/plain; charset=utf-8").sendFile(targetFile);
        }

        if (ext !== ".php") {
            return staticMiddleware(req, res, next);
        }

        try {
            const body = await collectRequestBody(req);
            const requestHeaders = {};
            for (const [key, value] of Object.entries(req.headers || {})) {
                if (typeof value === "string") {
                    requestHeaders[key.toLowerCase()] = value;
                } else if (Array.isArray(value) && value.length) {
                    requestHeaders[key.toLowerCase()] = value.join(", ");
                }
            }
            delete requestHeaders["content-length"];

            const phpRes = await enqueueWasmTask(async () => {
                const { handler } = await getOrCreateWasmContext();
                return await handler.request({
                    url: phpRequestUrl,
                    method: req.method,
                    headers: requestHeaders,
                    body: body ? new Uint8Array(body) : undefined
                });
            });

            const responseHeaders = {};
            for (const [key, values] of Object.entries(phpRes.headers || {})) {
                const lowerKey = key.toLowerCase();
                if (lowerKey === "content-length" || lowerKey === "transfer-encoding") {
                    continue;
                }
                responseHeaders[lowerKey] = Array.isArray(values) ? (values.length === 1 ? values[0] : values) : values;
            }

            if (phpRes.httpStatusCode >= 300 && phpRes.httpStatusCode < 400 && !responseHeaders.location) {
                const fallbackLoc = extractInlineRedirectLocation(targetFile);
                if (fallbackLoc) {
                    responseHeaders.location = fallbackLoc;
                }
            }

            if (typeof responseHeaders.location === "string" && responseHeaders.location.startsWith("http://127.0.0.1")) {
                responseHeaders.location = responseHeaders.location.slice("http://127.0.0.1".length) || "/";
            }

            const wantDownload = req.query && req.query.download === "1";
            if (!wantDownload) {
                const disposition = String(responseHeaders["content-disposition"] || "").toLowerCase();
                if (!disposition || disposition.startsWith("attachment")) {
                    responseHeaders["content-disposition"] = "inline";
                }
            }

            if (!responseHeaders["content-type"]) {
                responseHeaders["content-type"] = "text/html; charset=utf-8";
            }

            res.writeHead(phpRes.httpStatusCode || 200, responseHeaders);
            return res.end(Buffer.from(phpRes.bytes || []));
        } catch (error) {
            console.warn(`PHP-WASM fallback for ${toPosixRelative(targetFile)}:`, error.message || error.name || error);
            if (!error || error.name !== "ErrnoError") {
                wasmContextPromise = null;
            }
            if (res.headersSent) {
                return;
            }
            const source = fs.readFileSync(targetFile, "utf8");
            const relPath = toPosixRelative(targetFile);
            const reason = error && error.name === "ErrnoError"
                ? "Bài lab này có kết nối MySQL (mặc định môi trường này chưa chạy MySQL Server), nên hiển thị mã nguồn để tham khảo."
                : "Không thể thực thi trực tiếp bài lab này trong PHP WebAssembly; hiển thị mã nguồn để tham khảo.";
            res.setHeader("Content-Disposition", "inline");
            return res.status(200).type("html").send(buildStaticPhpHtmlPreview(relPath, source, reason));
        }
    };
}

function proxyToPhp(req, res, next, fallbackHandler, attempt = 0) {
    if (!phpAvailable || phpMode !== "native") {
        return fallbackHandler(req, res, next);
    }

    const headers = { ...req.headers };
    delete headers.connection;

    const proxyReq = http.request(
        {
            hostname: "127.0.0.1",
            port: PHP_PORT,
            path: req.originalUrl,
            method: req.method,
            headers
        },
        (proxyRes) => {
            const responseHeaders = { ...proxyRes.headers };
            if (typeof responseHeaders.location === "string") {
                const internalPrefix = `http://127.0.0.1:${PHP_PORT}`;
                if (responseHeaders.location.startsWith(internalPrefix)) {
                    responseHeaders.location = responseHeaders.location.slice(internalPrefix.length) || "/";
                }
            }

            const reqPath = String(req.path || "").toLowerCase();
            const wantDownload = req.query && req.query.download === "1";
            if (!wantDownload) {
                const disposition = String(responseHeaders["content-disposition"] || "").toLowerCase();
                if (disposition.startsWith("attachment")) {
                    responseHeaders["content-disposition"] = "inline";
                }
            }

            if (!responseHeaders["content-type"] && (reqPath.endsWith(".php") || reqPath.endsWith(".html") || reqPath.endsWith("/"))) {
                responseHeaders["content-type"] = "text/html; charset=utf-8";
            }

            res.writeHead(proxyRes.statusCode || 200, responseHeaders);
            proxyRes.pipe(res);
        }
    );

    proxyReq.on("error", (error) => {
        if (!phpAvailable || phpMode !== "native") {
            return fallbackHandler(req, res, next);
        }

        if (error.code === "ECONNREFUSED" && attempt < 5 && !req.aborted) {
            setTimeout(() => proxyToPhp(req, res, next, fallbackHandler, attempt + 1), 150);
            return;
        }

        if (!res.headersSent) {
            res.status(502).send("PHP backend is temporarily unavailable.");
        }
    });

    req.on("aborted", () => {
        proxyReq.destroy();
    });

    req.pipe(proxyReq);
}

function buildStaticPhpHtmlPreview(relPath, source, customNotice) {
    const baseDir = path.posix.dirname(`/labth/${relPath}`).replace(/\/?$/, "/");
    const withoutPhp = String(source || "")
        .replace(/<\?(?:php|=)?[\s\S]*?\?>/gi, "")
        .replace(/<\?(?:php|=)?[\s\S]*$/i, "")
        .trim();
    const hasHtmlMarkup = /<[a-z][\s\S]*>/i.test(withoutPhp);
    const noticeText = customNotice || `Chế độ xem trực tiếp mã nguồn${hasHtmlMarkup ? " và giao diện HTML tĩnh" : ""}.`;

    let srcdoc = "";
    if (hasHtmlMarkup) {
        if (/<head(?:\s[^>]*)?>/i.test(withoutPhp)) {
            srcdoc = withoutPhp.replace(/<head(?:\s[^>]*)?>/i, (match) => `${match}<base href="${escapeHtml(baseDir)}">`);
        } else {
            srcdoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><base href="${escapeHtml(baseDir)}"></head><body>${withoutPhp}</body></html>`;
        }
    }

    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(relPath)} - PHP Preview</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; max-width: 1040px; margin: 32px auto; padding: 0 20px; color: #111; line-height: 1.6; }
        .top-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
        .back-link { color: #111; font-weight: 700; text-decoration: none; }
        .notice { background: #f5f5f5; border: 1px solid #ddd; border-radius: 14px; padding: 16px 18px; margin-bottom: 18px; }
        .notice strong { display: block; margin-bottom: 4px; }
        .tabs { display: flex; gap: 8px; margin-bottom: 14px; }
        .tab-btn { padding: 8px 14px; border-radius: 999px; border: 1px solid #d4d4d4; background: #fff; font-weight: 700; cursor: pointer; }
        .tab-btn.active { background: #111; color: #fff; border-color: #111; }
        .panel.is-hidden { display: none; }
        iframe { width: 100%; min-height: 460px; border: 1px solid #ddd; border-radius: 14px; background: #fff; }
        pre { background: #111; color: #f5f5f5; padding: 20px; border-radius: 14px; overflow-x: auto; font-size: 13px; line-height: 1.5; margin: 0; }
    </style>
</head>
<body>
    <div class="top-bar">
        <a class="back-link" href="/#labthweb">&larr; Quay lại LABTHWEB</a>
        <span><strong>labth/${escapeHtml(relPath)}</strong></span>
    </div>
    <div class="notice">
        <strong>labth/${escapeHtml(relPath)}</strong>
        <span>${escapeHtml(noticeText)}</span>
    </div>
    ${hasHtmlMarkup ? `
    <div class="tabs">
        <button class="tab-btn active" type="button" data-tab="source">Mã nguồn PHP</button>
        <button class="tab-btn" type="button" data-tab="render">Giao diện HTML</button>
    </div>` : ""}
    <div class="panel" data-panel="source">
        <pre><code>${escapeHtml(source)}</code></pre>
    </div>
    ${hasHtmlMarkup ? `
    <div class="panel is-hidden" data-panel="render">
        <iframe sandbox title="${escapeHtml(relPath)}" srcdoc="${escapeHtml(srcdoc)}"></iframe>
    </div>
    <script>
        document.querySelectorAll("[data-tab]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var target = btn.getAttribute("data-tab");
                document.querySelectorAll("[data-tab]").forEach(function (b) { b.classList.toggle("active", b === btn); });
                document.querySelectorAll("[data-panel]").forEach(function (p) { p.classList.toggle("is-hidden", p.getAttribute("data-panel") !== target); });
            });
        });
    </script>` : ""}
</body>
</html>`;
}

function createStaticFallbackHandler() {
    const staticMiddleware = express.static(LABTH_DIR);

    return (req, res, next) => {
        let decodedPath = "/";
        try {
            decodedPath = decodeURIComponent(req.path);
        } catch (error) {
            return res.status(400).send("Invalid path.");
        }

        const resolvedPath = path.resolve(LABTH_DIR, `.${decodedPath}`);
        if (resolvedPath !== LABTH_DIR && !resolvedPath.startsWith(LABTH_DIR + path.sep)) {
            return res.status(403).send("Forbidden");
        }

        let targetFile = resolvedPath;
        if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
            if (!req.path.endsWith("/")) {
                const qs = req.originalUrl.includes("?") ? req.originalUrl.slice(req.originalUrl.indexOf("?")) : "";
                return res.redirect(302, `${req.baseUrl}${req.path}/${qs}`);
            }

            const indexFile = findIndexEntry(resolvedPath);
            if (indexFile) {
                targetFile = indexFile;
            } else {
                const entries = fs.readdirSync(resolvedPath, { withFileTypes: true })
                    .filter((entry) => !entry.name.startsWith("."))
                    .sort((a, b) => naturalCompare(a.name, b.name));
                const listItems = entries.map((entry) => {
                    const suffix = entry.isDirectory() ? "/" : "";
                    return `<li><a href="${escapeHtml(encodeURIComponent(entry.name) + suffix)}">${escapeHtml(entry.name + suffix)}</a></li>`;
                }).join("");
                res.setHeader("Content-Disposition", "inline");
                return res.status(200).type("html").send(`<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>labth${escapeHtml(decodedPath)}</title><style>body{font-family:system-ui,sans-serif;max-width:860px;margin:40px auto;padding:0 20px;line-height:1.6}a{color:#111;font-weight:600;text-decoration:none}a:hover{text-decoration:underline}li{padding:6px 0}</style></head><body><p><a href="/#labthweb">&larr; Quay lại LABTHWEB</a></p><h2>labth${escapeHtml(decodedPath)}</h2><ul>${listItems}</ul></body></html>`);
            }
        }

        if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
            const ext = path.extname(targetFile).toLowerCase();
            if (ext === ".php") {
                const source = fs.readFileSync(targetFile, "utf8");
                const relPath = toPosixRelative(targetFile);
                res.setHeader("Content-Disposition", "inline");
                return res.status(200).type("html").send(buildStaticPhpHtmlPreview(relPath, source));
            }

            if (ext === ".sql" || ext === ".txt" || ext === ".md" || ext === ".log" || path.basename(targetFile) === ".htaccess") {
                res.setHeader("Content-Disposition", "inline");
                return res.type("text/plain; charset=utf-8").sendFile(targetFile);
            }
        }

        return staticMiddleware(req, res, next);
    };
}

function createLabMiddleware() {
    const staticMiddleware = express.static(LABTH_DIR);
    const fallbackHandler = createStaticFallbackHandler();
    const wasmHandler = createWasmHandler(staticMiddleware, fallbackHandler);

    return (req, res, next) => {
        if (!fs.existsSync(LABTH_DIR)) {
            return res.status(404).send("labth folder not found.");
        }

        detectPhpModeSync();

        let decodedPath = "/";
        try {
            decodedPath = decodeURIComponent(req.path);
        } catch (error) {
            return res.status(400).send("Invalid path.");
        }

        const resolvedPath = path.resolve(LABTH_DIR, `.${decodedPath}`);
        if (resolvedPath !== LABTH_DIR && !resolvedPath.startsWith(LABTH_DIR + path.sep)) {
            return res.status(403).send("Forbidden");
        }

        if (req.path === "/" && !findIndexEntry(LABTH_DIR)) {
            return res.redirect(302, "/#labthweb");
        }

        if (phpMode === "wasm") {
            return wasmHandler(req, res, next);
        }

        if (phpAvailable && phpMode === "native") {
            const onFallback = (r, s, n) => (phpMode === "wasm" ? wasmHandler(r, s, n) : fallbackHandler(r, s, n));
            return proxyToPhp(req, res, next, onFallback);
        }

        return fallbackHandler(req, res, next);
    };
}

module.exports = {
    scanLabDirectory,
    startPhpServer,
    stopPhpServer,
    createLabMiddleware
};
