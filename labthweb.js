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
    const modal = document.getElementById("labs-modal");
    const overlay = document.querySelector("[data-labs-overlay]");
    const filtersEl = document.querySelector("[data-labs-filters]");
    const contentEl = document.querySelector("[data-labs-content]");
    const searchEl = document.querySelector("[data-labs-search]");
    const countEl = document.querySelector("[data-labs-count]");

    if (!modal || !overlay || !filtersEl || !contentEl) {
        return;
    }

    let activeFilter = "all";
    let searchQuery = "";

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function render() {
        const totalAll = LAB_GROUPS.reduce((sum, group) => sum + group.items.length, 0);
        filtersEl.innerHTML = [
            `<button class="filter-chip ${activeFilter === "all" ? "active" : ""}" type="button" data-lab-filter="all">Tất cả (${totalAll})</button>`,
            ...LAB_GROUPS.map((group) => `
                <button class="filter-chip ${activeFilter === group.id ? "active" : ""}" type="button" data-lab-filter="${escapeHtml(group.id)}">
                    ${escapeHtml(group.title)} (${group.items.length})
                </button>
            `)
        ].join("");

        const q = searchQuery.trim().toLowerCase();
        const visibleGroups = LAB_GROUPS
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
                    ${group.items.map((item) => `
                        <a class="lab-card" href="labth/${item.path.split("/").map(encodeURIComponent).join("/")}" target="_blank" rel="noopener noreferrer">
                            <div class="lab-card-info">
                                <span class="lab-card-name">${escapeHtml(item.name)}</span>
                                <span class="lab-card-path">labth/${escapeHtml(item.path)}</span>
                            </div>
                            <span class="lab-card-meta">
                                <span class="lab-ext-tag">${escapeHtml(item.ext)}</span>
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </span>
                        </a>
                    `).join("")}
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

    if (window.location.hash === "#labthweb") {
        open();
    }
})();
