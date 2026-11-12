const { spawn } = require("child_process");
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
let isShuttingDown = false;

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
    if (!fs.existsSync(LABTH_DIR)) {
        return { phpAvailable, groups: [] };
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
        phpAvailable,
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
            phpAvailable = false;
            console.warn("PHP CLI not found; /labth will fall back to static/source preview mode.");
            return;
        }
        console.error("Failed to start PHP server:", error.message);
    });

    child.on("exit", (code) => {
        if (phpProcess === child) {
            phpProcess = null;
        }
        if (!isShuttingDown && phpAvailable && code !== 0) {
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
}

function proxyToPhp(req, res, next, fallbackHandler, attempt = 0) {
    if (!phpAvailable) {
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

            res.writeHead(proxyRes.statusCode || 200, responseHeaders);
            proxyRes.pipe(res);
        }
    );

    proxyReq.on("error", (error) => {
        if (!phpAvailable) {
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
            const indexFile = findIndexEntry(resolvedPath);
            if (indexFile) {
                targetFile = indexFile;
            }
        }

        if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
            const ext = path.extname(targetFile).toLowerCase();
            if (ext === ".php") {
                const source = fs.readFileSync(targetFile, "utf8");
                const relPath = toPosixRelative(targetFile);
                return res.status(200).type("html").send(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(relPath)} - PHP Preview</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; max-width: 960px; margin: 40px auto; padding: 0 20px; color: #111; line-height: 1.6; }
        .notice { background: #f5f5f5; border: 1px solid #ddd; border-radius: 14px; padding: 18px 20px; margin-bottom: 20px; }
        .notice strong { display: block; margin-bottom: 6px; }
        .back-link { display: inline-block; margin-bottom: 16px; color: #111; font-weight: 700; text-decoration: none; }
        pre { background: #111; color: #f5f5f5; padding: 20px; border-radius: 14px; overflow-x: auto; font-size: 13px; line-height: 1.5; }
    </style>
</head>
<body>
    <a class="back-link" href="/#labthweb">&larr; Quay lại LABTHWEB</a>
    <div class="notice">
        <strong>Chế độ xem mã nguồn: labth/${escapeHtml(relPath)}</strong>
        <span>Máy chủ hiện tại chưa có PHP CLI nên không thực thi trực tiếp file <code>.php</code>. Khi deploy lên Render (Docker) hoặc chạy qua XAMPP/MAMP, bài lab này sẽ chạy PHP đầy đủ.</span>
    </div>
    <pre><code>${escapeHtml(source)}</code></pre>
</body>
</html>`);
            }

            if (ext === ".sql") {
                return res.type("text/plain; charset=utf-8").sendFile(targetFile);
            }
        }

        return staticMiddleware(req, res, next);
    };
}

function createLabMiddleware() {
    const fallbackHandler = createStaticFallbackHandler();

    return (req, res, next) => {
        if (!fs.existsSync(LABTH_DIR)) {
            return res.status(404).send("labth folder not found.");
        }

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

        if (phpAvailable) {
            return proxyToPhp(req, res, next, fallbackHandler);
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
