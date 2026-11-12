const fs = require("fs");
const path = require("path");

const backendModulesDir = path.join(__dirname, "backend", "node_modules");
if (!fs.existsSync(backendModulesDir)) {
    console.error("Backend dependencies are missing. Run `npm --prefix backend install` first.");
    process.exit(1);
}

require("./backend/server.js");
