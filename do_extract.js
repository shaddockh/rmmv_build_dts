"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const DtsGenerator_1 = require("./src/DtsGenerator");
const Fixes_1 = require("./src/Fixes");
const ScriptAnalyzer_1 = require("./src/ScriptAnalyzer");
const path = require("path");
function loadAndExtract(currentFilename, fixesFilename, outDir) {
    console.log("Processing File: " + currentFilename);
    const source = fs.readFileSync(currentFilename, "utf8");
    const analyzer = ScriptAnalyzer_1.default.Default(source);
    analyzer.analyze();
    const fixer = new Fixes_1.FixHandler();
    fixer.loadFixes(fixesFilename);
    const dtsGenerator = new DtsGenerator_1.default(analyzer, fixer);
    const outName = outDir +
        "/" +
        currentFilename
            .split("/")
            .pop()
            .replace(".js", ".d.ts");
    dtsGenerator.generate(outName);
}
console.log("RMMV Build DTS");
console.log("Usage: do_extract configfilename");
const args = process.argv.slice(2);
const configName = args[0] || null;
if (!configName) {
    console.error("A configuration file located under ./config must be provided.");
}
else {
    const config = require("./config/" + configName);
    config.files.forEach((f) => loadAndExtract(path.join(config.rootDir, f), config.fixes, config.outDir));
}
