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

    function buildLabHref(relPath) {
        const encoded = String(relPath || "")
            .split("/")
            .map((segment) => encodeURIComponent(segment))
            .join("/");
        return labServerActive ? `${labServerBase}/labth/${encoded}` : `labth/${encoded}`;
    }

    function buildLabPreviewHtml(relPath, rawUrl, source, ext) {
        const resolvedUrl = new URL(rawUrl, window.location.href).href;
        const baseDir = new URL(".", resolvedUrl).href;
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
        <strong>labth/${escapeHtml(relPath)}</strong>
        <span class="badge">Browser Preview</span>
    </div>
    <div class="notice">
        <strong>Mở trực tiếp trên trình duyệt: labth/${escapeHtml(relPath)}</strong>
        <span>Trang hiện đang chạy ở chế độ tĩnh (chưa kết nối máy chủ PHP). Để thực thi PHP trực tiếp, hãy chạy backend Node/Docker (Render) hoặc XAMPP/MAMP.</span>
    </div>
    ${hasHtmlMarkup ? `
    <div class="tabs">
        <button class="tab-btn active" type="button" data-tab="source">Mã nguồn ${escapeHtml(ext.toUpperCase())}</button>
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
                `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>${escapeHtml(relPath)}</title><style>body{font-family:system-ui,sans-serif;max-width:760px;margin:48px auto;padding:0 20px;line-height:1.6;color:#111;}.box{background:#f5f5f5;border:1px solid #ddd;border-radius:14px;padding:20px;}</style></head><body><div class="box"><h2>Không thể tải trực tiếp qua file://</h2><p>File <strong>labth/${escapeHtml(relPath)}</strong> là file <code>.${escapeHtml(ext)}</code> nên đã chặn hành động tự tải xuống.</p><p>Để mở bài lab trực tiếp trên trình duyệt, hãy mở qua <strong>Render</strong>, <strong>VS Code Live Server</strong>, hoặc chạy backend (<code>cd backend &amp;&amp; npm start</code>).</p></div></body></html>`
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
            writePreviewTabHtml(previewWin, buildLabPreviewHtml(relPath, rawUrl, source, ext));
        } catch (error) {
            writePreviewTabHtml(
                previewWin,
                `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>${escapeHtml(relPath)}</title><style>body{font-family:system-ui,sans-serif;max-width:760px;margin:48px auto;padding:0 20px;line-height:1.6;color:#111;}.box{background:#f5f5f5;border:1px solid #ddd;border-radius:14px;padding:20px;}</style></head><body><div class="box"><h2>Không thể mở bài lab</h2><p>Không đọc được nội dung của <strong>labth/${escapeHtml(relPath)}</strong> (${escapeHtml(error.message)}).</p></div></body></html>`
            );
        }
        previewWin.opener = null;
    }

    async function probeLabsEndpoint(baseUrl) {
        const response = await fetch(`${baseUrl}/api/labs`, {
            headers: { Accept: "application/json" }
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
    }

    async function loadLabs(force = false) {
        if (labsLoaded && !force) {
            render();
            return;
        }

        const candidates = window.location.protocol === "file:"
            ? ["http://localhost:5000", "http://localhost:5001"]
            : [""];

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
            } else {
                statusEl.textContent = "Browser Preview";
                statusEl.classList.add("is-fallback");
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
