import * as fs from "fs";

import DtsGenerator from "./src/DtsGenerator";
import { FixHandler } from "./src/Fixes";
import ScriptAnalyzer from "./src/ScriptAnalyzer";

interface ConfigFile {
    rootDir: string;
    outDir: string;
    fixes: string;
    files: string[];
}

function loadAndExtract(currentFilename: string, fixesFilename: string, outDir: string) {
    console.log("Processing File: " + currentFilename);
    const source = fs.readFileSync(currentFilename, "utf8");
    const analyzer = ScriptAnalyzer.Default(source);
    analyzer.analyze();

    const fixer = new FixHandler();
    fixer.loadFixes(fixesFilename);

    const dtsGenerator = new DtsGenerator(analyzer, fixer);
    const outName =
        outDir +
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
} else {
    const config = require("./config/" + configName) as ConfigFile;
    config.files.forEach((f) =>
        loadAndExtract(config.rootDir + "/" + f, config.fixes, config.outDir)
    );
}
