const LAB_GROUPS = [
    {
        id: "lab01",
        title: "Lab 01",
        items: [
            { name: "example01.php", path: "lab01/example01.php", ext: "php" },
            { name: "lab1_3.php", path: "lab01/lab1_3.php", ext: "php" },
            { name: "lab1_4.php", path: "lab01/lab1_4.php", ext: "php" },
            { name: "vi_du_04 / example01.php", path: "lab01/vi_du_04/example01.php", ext: "php" },
            { name: "vi_du_05 / bookstore / index.php", path: "lab01/vi_du_05/bookstore/index.php", ext: "php" }
        ]
    },
    {
        id: "lab02",
        title: "Lab 02",
        items: [
            { name: "lab2_1a.html", path: "lab02/lab2_1a.html", ext: "html" },
            { name: "lab2_1b.php", path: "lab02/lab2_1b.php", ext: "php" },
            { name: "lab2_2.php", path: "lab02/lab2_2.php", ext: "php" },
            { name: "lab2_3.php", path: "lab02/lab2_3.php", ext: "php" },
            { name: "lab2_4.php", path: "lab02/lab2_4.php", ext: "php" },
            { name: "lab2_5.php", path: "lab02/lab2_5.php", ext: "php" },
            { name: "lab2_5a.php", path: "lab02/lab2_5a.php", ext: "php" },
            { name: "lab2_5b.php", path: "lab02/lab2_5b.php", ext: "php" },
            { name: "lab2_6.php", path: "lab02/lab2_6.php", ext: "php" }
        ]
    },
    {
        id: "lab03",
        title: "Lab 03",
        items: [
            { name: "lab3_1.php", path: "lab03/lab3_1.php", ext: "php" },
            { name: "lab3_2.php", path: "lab03/lab3_2.php", ext: "php" },
            { name: "lab3_3.php", path: "lab03/lab3_3.php", ext: "php" },
            { name: "lab3_4.php", path: "lab03/lab3_4.php", ext: "php" },
            { name: "lab3_5.php", path: "lab03/lab3_5.php", ext: "php" }
        ]
    },
    {
        id: "lab04",
        title: "Lab 04",
        items: [
            { name: "lab4_1.php", path: "lab04/lab4_1.php", ext: "php" },
            { name: "lab4_2.php", path: "lab04/lab4_2.php", ext: "php" },
            { name: "lab4_3.php", path: "lab04/lab4_3.php", ext: "php" },
            { name: "lap4_4.php", path: "lab04/lap4_4.php", ext: "php" }
        ]
    },
    {
        id: "lab05",
        title: "Lab 05",
        items: [
            { name: "lab5_1.php", path: "lab05/lab5_1.php", ext: "php" },
            { name: "lab5_2.php", path: "lab05/lab5_2.php", ext: "php" },
            { name: "lab5_3 / 1.php", path: "lab05/lab5_3/1.php", ext: "php" },
            { name: "lab5_3 / 2.php", path: "lab05/lab5_3/2.php", ext: "php" },
            { name: "lab5_4 / index.php", path: "lab05/lab5_4/index.php", ext: "php" },
            { name: "lab5_4 / admin / index.php", path: "lab05/lab5_4/admin/index.php", ext: "php" }
        ]
    },
    {
        id: "lab06",
        title: "Lab 06",
        items: [
            { name: "lab06_1.php", path: "lab06/lab06_1.php", ext: "php" },
            { name: "lab06_2.php", path: "lab06/lab06_2.php", ext: "php" },
            { name: "lab06_3.php", path: "lab06/lab06_3.php", ext: "php" }
        ]
    },
    {
        id: "lab08",
        title: "Lab 08",
        items: [
            { name: "lab8_1.php", path: "lab08/lab8_1.php", ext: "php" },
            { name: "lab8_2.php", path: "lab08/lab8_2.php", ext: "php" },
            { name: "lab8_3.php", path: "lab08/lab8_3.php", ext: "php" },
            { name: "lab8_31.php", path: "lab08/lab8_31.php", ext: "php" },
            { name: "lab8_4 / index.php", path: "lab08/lab8_4/index.php", ext: "php" },
            { name: "lab8_5 / index.php", path: "lab08/lab8_5/index.php", ext: "php" }
        ]
    },
    {
        id: "lab09",
        title: "Lab 09",
        items: [
            { name: "lab9_1 / index.php", path: "lab09/lab9_1/index.php", ext: "php" },
            { name: "lab9_2 / index.php", path: "lab09/lab9_2/index.php", ext: "php" },
            { name: "lab9_2 / admins / index.html", path: "lab09/lab9_2/admins/index.html", ext: "html" },
            { name: "lab9_3 / index.php", path: "lab09/lab9_3/index.php", ext: "php" },
            { name: "lab9_4 / index.php", path: "lab09/lab9_4/index.php", ext: "php" },
            { name: "lab9_4 / admins / index.php", path: "lab09/lab9_4/admins/index.php", ext: "php" }
        ]
    },
    {
        id: "lab10",
        title: "Lab 10",
        items: [
            { name: "lab10_1 / index.php", path: "lab10/lab10_1/index.php", ext: "php" },
            { name: "lab10_2 / index.php", path: "lab10/lab10_2/index.php", ext: "php" },
            { name: "lab10_2 / admins / index.php", path: "lab10/lab10_2/admins/index.php", ext: "php" }
        ]
    },
    {
        id: "database",
        title: "Database",
        items: [
            { name: "bookstore.sql", path: "database/bookstore.sql", ext: "sql" },
            { name: "bookstore_vn.sql", path: "database/bookstore_vn.sql", ext: "sql" },
            { name: "bookstore.png", path: "database/bookstore.png", ext: "png" },
            { name: "bookstore_vn.png", path: "database/bookstore_vn.png", ext: "png" }
        ]
    }
];

(function initRootLabsModal() {
    const DIRECT_BROWSER_LAB_EXTS = new Set(["html", "htm", "png", "jpg", "jpeg", "gif", "svg", "webp", "pdf"]);
    const modal = document.getElementById("labs-modal");
    const overlay = document.querySelector("[data-labs-overlay]");
    const filtersEl = document.querySelector("[data-labs-filters]");
    const contentEl = document.querySelector("[data-labs-content]");
    const searchEl = document.querySelector("[data-labs-search]");
    const countEl = document.querySelector("[data-labs-count]");
    const statusEl = document.querySelector("[data-labs-status]");

    if (!modal || !overlay || !filtersEl || !contentEl) {
        return;
    }

    let groups = LAB_GROUPS;
    let activeFilter = "all";
    let searchQuery = "";
    let labsLoaded = false;
    let labServerActive = false;
    let labServerBase = "";
    let phpAvailable = false;

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function serializeJsonForHtmlScript(value) {
        return JSON.stringify(value)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/&/g, "\\u0026")
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029");
    }

    function encodeLabRelPath(relPath) {
        return String(relPath || "")
            .split("/")
            .filter(Boolean)
            .map((segment) => encodeURIComponent(segment))
            .join("/");
    }

    function computeLabRootUrl(resolvedUrl, relPath) {
        const depth = String(relPath || "").split("/").filter(Boolean).length;
        const prefix = depth > 1 ? "../".repeat(depth - 1) : "./";
        return new URL(prefix, resolvedUrl).href;
    }

    function resolveLabRelativeRef(currentRelPath, ref, labRootUrl) {
        if (!ref || /^(?:https?:|mailto:|tel:|javascript:|#|\/\/)/i.test(ref)) {
            return null;
        }
        const cleanRef = String(ref).split(/[?#]/)[0].trim();
        if (!cleanRef || !/\.php$/i.test(cleanRef)) {
            return null;
        }
        try {
            const currentUrl = new URL(encodeLabRelPath(currentRelPath), labRootUrl);
            const targetUrl = new URL(cleanRef, currentUrl);
            if (!targetUrl.href.startsWith(labRootUrl)) {
                return null;
            }
            return decodeURIComponent(targetUrl.href.slice(labRootUrl.length));
        } catch (error) {
            return null;
        }
    }

    function extractPhpDependencyRefs(source) {
        const refs = new Set();
        const text = String(source || "");
        const includeRegex = /(?:include|include_once|require|require_once)\s*\(?\s*["']([^"'$\r\n]+?\.php)["']/gi;
        const attrRegex = /(?:action|href)\s*=\s*["']([^"'$?\r\n:]+?\.php(?:\?[^"']*)?)["']/gi;
        let match;
        while ((match = includeRegex.exec(text)) !== null) {
            refs.add(match[1]);
        }
        while ((match = attrRegex.exec(text)) !== null) {
            refs.add(match[1]);
        }
        return [...refs];
    }

    async function preloadPhpLabFiles(entryRelPath, entrySource, labRootUrl) {
        const files = { [entryRelPath]: entrySource };
        const visited = new Set([entryRelPath]);
        const queue = [{ relPath: entryRelPath, source: entrySource, depth: 0 }];
        const MAX_FILES = 24;
        const MAX_DEPTH = 3;

        while (queue.length > 0 && Object.keys(files).length < MAX_FILES) {
            const current = queue.shift();
            if (!current || current.depth >= MAX_DEPTH) {
                continue;
            }
            const refs = extractPhpDependencyRefs(current.source);
            const pending = [];
            for (const ref of refs) {
                const candidateRel = resolveLabRelativeRef(current.relPath, ref, labRootUrl);
                if (!candidateRel || visited.has(candidateRel)) {
                    continue;
                }
                visited.add(candidateRel);
                pending.push(candidateRel);
                if (visited.size >= MAX_FILES * 2) {
                    break;
                }
            }
            if (!pending.length) {
                continue;
            }
            const fetched = await Promise.all(pending.map(async (rel) => {
                try {
                    const res = await fetch(`${labRootUrl}${encodeLabRelPath(rel)}`);
                    if (!res.ok) {
                        return null;
                    }
                    const ct = String(res.headers.get("content-type") || "").toLowerCase();
                    if (ct.includes("image/") || ct.includes("octet-stream")) {
                        return null;
                    }
                    return { rel, text: await res.text() };
                } catch (error) {
                    return null;
                }
            }));
            for (const item of fetched) {
                if (item && Object.keys(files).length < MAX_FILES) {
                    files[item.rel] = item.text;
                    queue.push({ relPath: item.rel, source: item.text, depth: current.depth + 1 });
                }
            }
        }

        return files;
    }

    function buildLabHref(relPath) {
        return labServerActive
            ? `${labServerBase}/labth/${encodeLabRelPath(relPath)}`
            : `labth/${encodeLabRelPath(relPath)}`;
    }

    function buildLabPreviewHtml(relPath, rawUrl, source, ext, preloadedFiles = null) {
        const resolvedUrl = new URL(rawUrl, window.location.href).href;
        const baseDir = new URL(".", resolvedUrl).href;
        const labRootUrl = computeLabRootUrl(resolvedUrl, relPath);
        const isPhp = ext === "php";
        const withoutPhp = isPhp
            ? String(source || "")
                .replace(/<\?(?:php|=)?[\s\S]*?\?>/gi, "")
                .replace(/<\?(?:php|=)?[\s\S]*$/i, "")
                .trim()
            : "";
        const hasHtmlMarkup = isPhp && /<[a-z][\s\S]*>/i.test(withoutPhp);

        let srcdoc = "";
        if (hasHtmlMarkup) {
            if (/<head(?:\s[^>]*)?>/i.test(withoutPhp)) {
                srcdoc = withoutPhp.replace(/<head(?:\s[^>]*)?>/i, (match) => `${match}<base href="${escapeHtml(baseDir)}">`);
            } else {
                srcdoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><base href="${escapeHtml(baseDir)}"></head><body>${withoutPhp}</body></html>`;
            }
        }

        const badgeLabel = isPhp ? "PHP Browser" : "Browser Preview";
        const initialNoticeTitle = isPhp
            ? `Đang chạy PHP trực tiếp: labth/${escapeHtml(relPath)}`
            : `Mở trực tiếp trên trình duyệt: labth/${escapeHtml(relPath)}`;
        const initialNoticeText = isPhp
            ? "Đang tải và thực thi PHP 8.3 WebAssembly trực tiếp trên trình duyệt..."
            : `Đang xem nội dung file .${escapeHtml(ext)} trực tiếp trên trình duyệt.`;

        const phpBootstrap = isPhp
            ? serializeJsonForHtmlScript({
                entryRelPath: relPath,
                labRootUrl,
                files: preloadedFiles || { [relPath]: source },
                hasHtmlMarkup
            })
            : "";

        return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(relPath)} - Trình duyệt LABTHWEB</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; max-width: 1040px; margin: 32px auto; padding: 0 20px; color: #111; line-height: 1.6; }
        .top-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #111; color: #fff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
        .notice { background: #f5f5f5; border: 1px solid #ddd; border-radius: 14px; padding: 16px 18px; margin-bottom: 18px; }
        .notice.is-error { background: #fff7ed; border-color: #fdba74; }
        .notice strong { display: block; margin-bottom: 4px; }
        .tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .tab-btn { padding: 8px 14px; border-radius: 999px; border: 1px solid #d4d4d4; background: #fff; font-weight: 700; cursor: pointer; }
        .tab-btn.active { background: #111; color: #fff; border-color: #111; }
        .panel.is-hidden,
        .is-hidden { display: none; }
        iframe { width: 100%; min-height: 500px; border: 1px solid #ddd; border-radius: 14px; background: #fff; }
        pre { background: #111; color: #f5f5f5; padding: 20px; border-radius: 14px; overflow-x: auto; font-size: 13px; line-height: 1.5; margin: 0; }
        .loading-box { padding: 28px 20px; border: 1px solid #ddd; border-radius: 14px; background: #fafafa; color: #333; }
    </style>
</head>
<body>
    <div class="top-bar">
        <strong id="active-file-label">labth/${escapeHtml(relPath)}</strong>
        <span class="badge" id="preview-badge">${badgeLabel}</span>
    </div>
    <div class="notice" id="preview-notice">
        <strong id="notice-title">${initialNoticeTitle}</strong>
        <span id="notice-text">${initialNoticeText}</span>
    </div>
    ${isPhp ? `
    <div class="tabs">
        <button class="tab-btn active" type="button" data-tab="php">Kết quả PHP</button>
        <button class="tab-btn" type="button" data-tab="source">Mã nguồn PHP</button>
        ${hasHtmlMarkup ? `<button class="tab-btn" type="button" data-tab="render">Giao diện HTML</button>` : ""}
    </div>
    <div class="panel" data-panel="php">
        <div class="loading-box" id="php-loading-box">Đang khởi tạo PHP 8.3 WebAssembly... (lần đầu tải ~18MB từ CDN, các lần sau dùng bộ nhớ đệm)</div>
        <iframe id="php-output-frame" class="is-hidden" sandbox="allow-scripts allow-forms" title="${escapeHtml(relPath)}"></iframe>
    </div>
    <div class="panel is-hidden" data-panel="source">
        <pre><code id="php-source-code">${escapeHtml(source)}</code></pre>
    </div>
    ${hasHtmlMarkup ? `
    <div class="panel is-hidden" data-panel="render">
        <iframe sandbox title="${escapeHtml(relPath)} HTML" srcdoc="${escapeHtml(srcdoc)}"></iframe>
    </div>` : ""}` : `
    <div class="panel" data-panel="source">
        <pre><code>${escapeHtml(source)}</code></pre>
    </div>`}
    <script>
        function switchPreviewTab(target) {
            document.querySelectorAll("[data-tab]").forEach(function (b) {
                b.classList.toggle("active", b.getAttribute("data-tab") === target);
            });
            document.querySelectorAll("[data-panel]").forEach(function (p) {
                p.classList.toggle("is-hidden", p.getAttribute("data-panel") !== target);
            });
        }
        document.querySelectorAll("[data-tab]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                switchPreviewTab(btn.getAttribute("data-tab"));
            });
        });
    </script>
    ${isPhp ? `
    <script type="application/json" id="php-bootstrap">${phpBootstrap}</script>
    <script type="module">
        const config = JSON.parse(document.getElementById("php-bootstrap").textContent);
        const noticeEl = document.getElementById("preview-notice");
        const noticeTitleEl = document.getElementById("notice-title");
        const noticeTextEl = document.getElementById("notice-text");
        const activeFileEl = document.getElementById("active-file-label");
        const loadingBoxEl = document.getElementById("php-loading-box");
        const outputFrame = document.getElementById("php-output-frame");
        const sourceCodeEl = document.getElementById("php-source-code");

        function setNotice(title, text, isError = false) {
            if (noticeTitleEl) noticeTitleEl.textContent = title;
            if (noticeTextEl) noticeTextEl.textContent = text;
            if (noticeEl) noticeEl.classList.toggle("is-error", Boolean(isError));
        }

        function escapeAttr(val) {
            return String(val ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        }

        function buildOutputSrcdoc(rawHtml, currentRelPath) {
            const encodedRel = currentRelPath.split("/").filter(Boolean).map(encodeURIComponent).join("/");
            const currentPageUrl = config.labRootUrl + encodedRel;
            const currentDirUrl = new URL(".", currentPageUrl).href;
            const bridgePayload = JSON.stringify(encodeURIComponent(currentPageUrl));
            const bridgeScript = "<script>" +
                "(function(){" +
                "var curPage=decodeURIComponent(" + bridgePayload + ");" +
                "document.addEventListener('click',function(e){" +
                "var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;" +
                "if(!a)return;" +
                "var href=a.getAttribute('href');" +
                "if(!href||/^(?:javascript:|mailto:|tel:|#)/i.test(href))return;" +
                "var resolved;try{resolved=new URL(href,curPage);}catch(_){return;}" +
                "if(resolved.pathname.toLowerCase().endsWith('.php')){e.preventDefault();window.parent.postMessage({__labWasmNav:true,url:resolved.href,method:'GET'},'*');}" +
                "});" +
                "document.addEventListener('submit',async function(e){" +
                "var form=e.target;if(!form||form.tagName!=='FORM')return;" +
                "var action=form.getAttribute('action')||curPage;" +
                "var resolved;try{resolved=new URL(action,curPage).href;}catch(_){return;}" +
                "e.preventDefault();" +
                "var method=(form.getAttribute('method')||'GET').toUpperCase();" +
                "var enctype=(form.getAttribute('enctype')||'').toLowerCase();" +
                "var fd=new FormData(form);" +
                "if(e.submitter&&e.submitter.name){fd.append(e.submitter.name,e.submitter.value||'');}" +
                "var fields=[];" +
                "for(var pair of fd.entries()){" +
                "var k=pair[0],v=pair[1];" +
                "if(typeof File!=='undefined'&&v instanceof File){fields.push({name:k,isFile:true,fileName:v.name,type:v.type,bytes:await v.arrayBuffer()});}" +
                "else{fields.push({name:k,isFile:false,value:String(v)});}" +
                "}" +
                "window.parent.postMessage({__labWasmNav:true,url:resolved,method:method,enctype:enctype,fields:fields},'*');" +
                "});" +
                "})();" +
                "<" + "/script>";

            let html = String(rawHtml ?? "");
            if (/<head(?:\\s[^>]*)?>/i.test(html)) {
                html = html.replace(/<head(?:\\s[^>]*)?>/i, (m) => m + '<base href="' + escapeAttr(currentDirUrl) + '">');
            } else {
                html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><base href="' + escapeAttr(currentDirUrl) + '"></head><body>' + html + '</body></html>';
            }
            if (/<\\/body>/i.test(html)) {
                return html.replace(/<\\/body>/i, bridgeScript + "</body>");
            }
            return html + bridgeScript;
        }

        function extractRedirectLoc(sourceText) {
            const match = /header\\s*\\(\\s*["']location\\s*:\\s*([^"'\\r\\n]+)["']\\s*\\)/i.exec(String(sourceText || ""));
            return match ? match[1].trim() : "";
        }

        async function runBrowserPhp() {
            let php;
            let handler;
            const written = new Set();

            function ensureFileInVfs(relPath, content) {
                const full = "/labth/" + relPath;
                const slash = full.lastIndexOf("/");
                if (slash > 0) {
                    php.mkdirTree(full.slice(0, slash));
                }
                php.writeFile(full, content);
                written.add(relPath);
            }

            async function ensurePathFetched(relPath) {
                if (written.has(relPath)) return;
                const encoded = relPath.split("/").filter(Boolean).map(encodeURIComponent).join("/");
                const res = await fetch(config.labRootUrl + encoded);
                if (!res.ok) throw new Error("HTTP " + res.status);
                const text = await res.text();
                config.files[relPath] = text;
                ensureFileInVfs(relPath, text);
            }

            try {
                const [{ PHP, PHPRequestHandler, loadPHPRuntime }, { getPHPLoaderModule, jspi }] = await Promise.all([
                    import("https://cdn.jsdelivr.net/npm/@php-wasm/universal@3.1.64/+esm"),
                    import("https://cdn.jsdelivr.net/npm/@php-wasm/web-8-3@3.1.64/+esm")
                ]);
                const variant = (await jspi()) ? "jspi" : "asyncify";
                const variantBase = "https://cdn.jsdelivr.net/npm/@php-wasm/web-8-3@3.1.64/" + variant + "/";
                const loader = await getPHPLoaderModule();
                const runtimeId = await loadPHPRuntime(loader, {
                    locateFile(file) {
                        const raw = String(file || "");
                        if (/^https?:\\/\\//i.test(raw)) return raw;
                        return variantBase + raw.replace(/^\\.?\\//, "");
                    }
                });
                php = new PHP(runtimeId);
                for (const [rel, text] of Object.entries(config.files || {})) {
                    ensureFileInVfs(rel, text);
                }
                handler = new PHPRequestHandler({
                    php,
                    documentRoot: "/labth",
                    absoluteUrl: "http://127.0.0.1"
                });

                async function executeRequest(relPath, queryString = "", method = "GET", headers = {}, body = undefined, hop = 0) {
                    await ensurePathFetched(relPath);
                    if (activeFileEl) activeFileEl.textContent = "labth/" + relPath;
                    if (sourceCodeEl && config.files[relPath]) sourceCodeEl.textContent = config.files[relPath];

                    const res = await handler.request({
                        url: "/" + relPath + queryString,
                        method,
                        headers,
                        body
                    });
                    const status = res.httpStatusCode || 200;
                    const resHeaders = res.headers || {};
                    let location = resHeaders.location || resHeaders.Location || "";
                    if (Array.isArray(location)) location = location[0] || "";
                    if (status >= 300 && status < 400 && !location) {
                        location = extractRedirectLoc(config.files[relPath]);
                    }
                    if (status >= 300 && status < 400 && location && hop < 5) {
                        const curUrl = new URL(relPath.split("/").map(encodeURIComponent).join("/"), config.labRootUrl);
                        const nextUrl = new URL(location.replace(/^http:\\/\\/127\\.0\\.0\\.1/, ""), curUrl);
                        if (nextUrl.href.startsWith(config.labRootUrl)) {
                            const nextPathAndQuery = nextUrl.href.slice(config.labRootUrl.length);
                            const qIdx = nextPathAndQuery.indexOf("?");
                            const nextRel = decodeURIComponent(qIdx >= 0 ? nextPathAndQuery.slice(0, qIdx) : nextPathAndQuery);
                            const nextQs = qIdx >= 0 ? nextPathAndQuery.slice(qIdx) : "";
                            return await executeRequest(nextRel, nextQs, "GET", {}, undefined, hop + 1);
                        }
                    }

                    const text = res.text;
                    if (loadingBoxEl) loadingBoxEl.classList.add("is-hidden");
                    if (outputFrame) {
                        outputFrame.classList.remove("is-hidden");
                        outputFrame.srcdoc = buildOutputSrcdoc(text, relPath);
                    }
                    setNotice(
                        "Đã chạy PHP trực tiếp: labth/" + relPath,
                        "Đang thực thi bằng PHP 8.3 WebAssembly trực tiếp trên trình duyệt (HTTP " + status + ")."
                    );
                }

                window.addEventListener("message", async (event) => {
                    if (!outputFrame || event.source !== outputFrame.contentWindow) return;
                    const data = event.data;
                    if (!data || data.__labWasmNav !== true || !data.url) return;
                    if (!String(data.url).startsWith(config.labRootUrl)) return;

                    const tail = String(data.url).slice(config.labRootUrl.length);
                    const qIdx = tail.indexOf("?");
                    const targetRel = decodeURIComponent(qIdx >= 0 ? tail.slice(0, qIdx) : tail);
                    let qs = qIdx >= 0 ? tail.slice(qIdx) : "";
                    const method = String(data.method || "GET").toUpperCase();
                    let headers = {};
                    let body;

                    if (Array.isArray(data.fields)) {
                        if (method === "GET") {
                            const params = new URLSearchParams(qs.startsWith("?") ? qs.slice(1) : "");
                            for (const f of data.fields) {
                                if (!f.isFile) params.append(f.name, f.value);
                            }
                            const encoded = params.toString();
                            qs = encoded ? "?" + encoded : "";
                        } else if (String(data.enctype || "").includes("multipart/form-data")) {
                            const fd = new FormData();
                            for (const f of data.fields) {
                                if (f.isFile) {
                                    fd.append(f.name, new File([f.bytes], f.fileName, { type: f.type || "application/octet-stream" }));
                                } else {
                                    fd.append(f.name, f.value);
                                }
                            }
                            const req = new Request("https://local.invalid/", { method: "POST", body: fd });
                            headers["content-type"] = req.headers.get("content-type");
                            body = new Uint8Array(await req.arrayBuffer());
                        } else {
                            const params = new URLSearchParams();
                            for (const f of data.fields) {
                                if (!f.isFile) params.append(f.name, f.value);
                            }
                            headers["content-type"] = "application/x-www-form-urlencoded";
                            body = new TextEncoder().encode(params.toString());
                        }
                    }

                    try {
                        await executeRequest(targetRel, qs, method, headers, body);
                    } catch (err) {
                        const isDbErr = err && (err.name === "ErrnoError" || /mysql|errno|pdo/i.test(err.message || ""));
                        setNotice(
                            "Không thể thực thi labth/" + targetRel,
                            isDbErr
                                ? "Bài lab này có kết nối MySQL (trình duyệt tĩnh chưa chạy MySQL Server), hiển thị mã nguồn để tham khảo."
                                : "Lỗi PHP WebAssembly: " + (err && err.message ? err.message : String(err)),
                            true
                        );
                        switchPreviewTab(config.hasHtmlMarkup ? "render" : "source");
                    }
                });

                await executeRequest(config.entryRelPath);
            } catch (error) {
                const isDbErr = error && (error.name === "ErrnoError" || /mysql|errno/i.test(error.message || ""));
                if (loadingBoxEl) {
                    loadingBoxEl.textContent = isDbErr
                        ? "Bài lab này yêu cầu MySQL Server (không chạy trực tiếp trong trình duyệt tĩnh). Hãy xem tab Mã nguồn PHP" + (config.hasHtmlMarkup ? " hoặc Giao diện HTML." : ".")
                        : "Không thể chạy PHP WebAssembly trên trình duyệt (" + (error && error.message ? error.message : String(error)) + ").";
                }
                setNotice(
                    isDbErr ? "Lab cần MySQL: labth/" + config.entryRelPath : "Chuyển sang chế độ xem mã nguồn: labth/" + config.entryRelPath,
                    isDbErr
                        ? "Bài lab này có kết nối MySQL (trình duyệt tĩnh chưa chạy MySQL Server), hiển thị mã nguồn" + (config.hasHtmlMarkup ? " và giao diện HTML tĩnh." : " để tham khảo.")
                        : "Không nạp được PHP 8.3 WebAssembly từ CDN; đang hiển thị mã nguồn" + (config.hasHtmlMarkup ? " và giao diện HTML tĩnh." : "."),
                    true
                );
                switchPreviewTab(config.hasHtmlMarkup ? "render" : "source");
            }
        }

        runBrowserPhp();
    </script>` : ""}
</body>
</html>`;
    }

    function writePreviewTabHtml(tab, html) {
        tab.document.open();
        tab.document.write(html);
        tab.document.close();
    }

    async function openLabPreviewTab(rawUrl, relPath, ext) {
        const previewWin = window.open("", "_blank");
        if (!previewWin) {
            alert("Trình duyệt đang chặn cửa sổ mới. Hãy cho phép pop-up để mở bài lab.");
            return;
        }

        writePreviewTabHtml(
            previewWin,
            `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>${escapeHtml(relPath)}</title><style>body{font-family:system-ui,sans-serif;padding:40px 20px;text-align:center;color:#111;}</style></head><body>Đang mở <strong>labth/${escapeHtml(relPath)}</strong> trong trình duyệt...</body></html>`
        );

        if (window.location.protocol === "file:") {
            writePreviewTabHtml(
                previewWin,
                `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>${escapeHtml(relPath)}</title><style>body{font-family:system-ui,sans-serif;max-width:760px;margin:48px auto;padding:0 20px;line-height:1.6;color:#111;}.box{background:#f5f5f5;border:1px solid #ddd;border-radius:14px;padding:20px;}</style></head><body><div class="box"><h2>Không thể tải trực tiếp qua file://</h2><p>File <strong>labth/${escapeHtml(relPath)}</strong> là file <code>.${escapeHtml(ext)}</code> nên đã chặn hành động tự tải xuống.</p><p>Hãy mở trang qua <strong>Render</strong>, <strong>VS Code Live Server</strong>, hoặc chạy <code>npm start</code>.</p></div></body></html>`
            );
            previewWin.opener = null;
            return;
        }

        try {
            const response = await fetch(rawUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const source = await response.text();
            let preloadedFiles = null;
            if (ext === "php") {
                const resolvedUrl = new URL(rawUrl, window.location.href).href;
                const labRootUrl = computeLabRootUrl(resolvedUrl, relPath);
                preloadedFiles = await preloadPhpLabFiles(relPath, source, labRootUrl);
            }
            writePreviewTabHtml(previewWin, buildLabPreviewHtml(relPath, rawUrl, source, ext, preloadedFiles));
        } catch (error) {
            writePreviewTabHtml(
                previewWin,
                `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>${escapeHtml(relPath)}</title><style>body{font-family:system-ui,sans-serif;max-width:760px;margin:48px auto;padding:0 20px;line-height:1.6;color:#111;}.box{background:#f5f5f5;border:1px solid #ddd;border-radius:14px;padding:20px;}</style></head><body><div class="box"><h2>Không thể mở bài lab</h2><p>Không đọc được nội dung của <strong>labth/${escapeHtml(relPath)}</strong> (${escapeHtml(error.message)}).</p></div></body></html>`
            );
        }
        previewWin.opener = null;
    }

    async function probeLabsEndpoint(baseUrl) {
        const controller = typeof AbortController === "function" ? new AbortController() : null;
        const timeoutMs = baseUrl ? 1200 : 5000;
        const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
        try {
            const response = await fetch(`${baseUrl}/api/labs`, {
                headers: { Accept: "application/json" },
                signal: controller ? controller.signal : undefined
            });
            if (!response.ok) {
                return null;
            }
            const contentType = String(response.headers.get("content-type") || "").toLowerCase();
            if (!contentType.includes("application/json")) {
                return null;
            }
            const data = await response.json().catch(() => null);
            if (data && data.serverMode === "express" && Array.isArray(data.groups)) {
                return data;
            }
            return null;
        } finally {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }

    function getLabEndpointCandidates() {
        if (window.location.protocol === "file:") {
            return ["http://localhost:5000", "http://localhost:5001"];
        }
        const candidates = [""];
        const host = window.location.hostname;
        if (host === "localhost" || host === "127.0.0.1") {
            for (const base of ["http://localhost:5000", "http://localhost:5001"]) {
                if (base !== window.location.origin) {
                    candidates.push(base);
                }
            }
        }
        return candidates;
    }

    async function loadLabs(force = false) {
        if (labsLoaded && !force) {
            render();
            return;
        }

        const candidates = getLabEndpointCandidates();

        let found = false;
        for (const baseUrl of candidates) {
            try {
                const data = await probeLabsEndpoint(baseUrl);
                if (data) {
                    labServerActive = true;
                    labServerBase = baseUrl;
                    groups = data.groups;
                    phpAvailable = Boolean(data.phpAvailable);
                    labsLoaded = true;
                    found = true;
                    break;
                }
            } catch (error) {
                // Try next candidate
            }
        }

        if (!found) {
            labServerActive = false;
            labServerBase = "";
            groups = LAB_GROUPS;
            phpAvailable = false;
            labsLoaded = true;
        }

        render();
    }

    function render() {
        const totalAll = groups.reduce((sum, group) => sum + group.items.length, 0);

        if (statusEl) {
            if (labServerActive) {
                statusEl.textContent = phpAvailable ? "PHP Ready" : "Node Preview";
                statusEl.classList.toggle("is-fallback", !phpAvailable);
            } else if (window.location.protocol === "file:") {
                statusEl.textContent = "Browser Preview";
                statusEl.classList.add("is-fallback");
            } else {
                statusEl.textContent = "PHP Browser";
                statusEl.classList.remove("is-fallback");
            }
        }

        filtersEl.innerHTML = [
            `<button class="filter-chip ${activeFilter === "all" ? "active" : ""}" type="button" data-lab-filter="all">Tất cả (${totalAll})</button>`,
            ...groups.map((group) => `
                <button class="filter-chip ${activeFilter === group.id ? "active" : ""}" type="button" data-lab-filter="${escapeHtml(group.id)}">
                    ${escapeHtml(group.title)} (${group.items.length})
                </button>
            `)
        ].join("");

        const q = searchQuery.trim().toLowerCase();
        const visibleGroups = groups
            .filter((group) => activeFilter === "all" || group.id === activeFilter)
            .map((group) => ({
                ...group,
                items: group.items.filter((item) => !q || item.name.toLowerCase().includes(q) || item.path.toLowerCase().includes(q) || group.title.toLowerCase().includes(q))
            }))
            .filter((group) => group.items.length > 0);

        const count = visibleGroups.reduce((sum, group) => sum + group.items.length, 0);
        if (countEl) {
            countEl.textContent = `${count} bài lab`;
        }

        if (!visibleGroups.length) {
            contentEl.innerHTML = `<div class="empty-state"><p>Không tìm thấy bài lab phù hợp.</p></div>`;
            return;
        }

        contentEl.innerHTML = visibleGroups.map((group) => `
            <section class="lab-group">
                <div class="lab-group-header">
                    <h4>${escapeHtml(group.title)}</h4>
                    <span class="lab-group-count">${group.items.length} file</span>
                </div>
                <div class="lab-grid">
                    ${group.items.map((item) => {
                        const ext = String(item.ext || "").toLowerCase();
                        const rawUrl = buildLabHref(item.path);
                        const canOpenDirectly = labServerActive || DIRECT_BROWSER_LAB_EXTS.has(ext);
                        const hrefAttr = canOpenDirectly
                            ? escapeHtml(rawUrl)
                            : `#lab-view-${encodeURIComponent(item.path)}`;
                        const linkAttrs = canOpenDirectly
                            ? `target="_blank" rel="noopener noreferrer"`
                            : `data-lab-preview="1" data-lab-url="${escapeHtml(rawUrl)}" data-lab-path="${escapeHtml(item.path)}" data-lab-ext="${escapeHtml(ext || "file")}"`;

                        return `
                        <a class="lab-card" href="${hrefAttr}" ${linkAttrs}>
                            <div class="lab-card-info">
                                <span class="lab-card-name">${escapeHtml(item.name)}</span>
                                <span class="lab-card-path">labth/${escapeHtml(item.path)}</span>
                            </div>
                            <span class="lab-card-meta">
                                <span class="lab-ext-tag">${escapeHtml(item.ext || "file")}</span>
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </span>
                        </a>
                    `;
                    }).join("")}
                </div>
            </section>
        `).join("");
    }

    function open() {
        overlay.classList.add("is-visible");
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("panel-open");
        render();
        loadLabs();
    }

    function close() {
        overlay.classList.remove("is-visible");
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("panel-open");
    }

    document.addEventListener("click", (event) => {
        if (event.target.closest("[data-open-labs]")) {
            event.preventDefault();
            open();
        }
        if (event.target.closest("[data-close-labs]") || event.target.closest("[data-labs-overlay]")) {
            close();
        }
        const filterBtn = event.target.closest("[data-lab-filter]");
        if (filterBtn) {
            activeFilter = filterBtn.dataset.labFilter;
            render();
        }
        const previewCard = event.target.closest("[data-lab-preview]");
        if (previewCard) {
            event.preventDefault();
            openLabPreviewTab(
                previewCard.dataset.labUrl || "",
                previewCard.dataset.labPath || "",
                previewCard.dataset.labExt || "file"
            );
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            close();
        }
    });

    if (searchEl) {
        searchEl.addEventListener("input", () => {
            searchQuery = searchEl.value;
            render();
        });
    }

    loadLabs();

    if (window.location.hash === "#labthweb") {
        open();
    }
})();
