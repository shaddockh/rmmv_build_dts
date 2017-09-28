"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DtsGenerator_1 = require("./DtsGenerator");
const ScriptAnalyzer_1 = require("./ScriptAnalyzer");
const fs = require("fs");
// import * as functionExtractor from "function-extractor";
const readline = require("readline");
const Fixes_1 = require("./Fixes");
function loadSourceFile(currentFilename) {
    return new Promise((resolve, failure) => {
        let lines = [];
        var lineReader = readline.createInterface({
            input: fs.createReadStream(currentFilename)
        });
        lineReader.on("line", line => {
            lines.push(line);
            //console.log('Line from file:', line);
            if (line.indexOf("= function(") > 0) {
                // console.log(line);
            }
        });
        lineReader.on("close", () => {
            resolve(lines);
        });
    });
}
function loadAndExtractNew(currentFilename) {
    console.log("Processing File: " + currentFilename);
    const source = fs.readFileSync(currentFilename, "utf8");
    const analyzer = ScriptAnalyzer_1.default.Default(source);
    analyzer.analyze();
    const fixer = new Fixes_1.FixHandler();
    fixer.loadFixes("./PostScanFixes.json");
    const dtsGenerator = new DtsGenerator_1.default(analyzer, fixer);
    const outName = "generated2/" +
        currentFilename
            .split("/")
            .pop()
            .replace(".js", ".d.ts");
    dtsGenerator.generate(outName);
}
let base = "./v1.4.2_c";
base = "./v1.5.1";
loadAndExtractNew(base + "/rpg_core.js");
loadAndExtractNew(base + "/rpg_managers.js");
loadAndExtractNew(base + "/rpg_objects.js");
loadAndExtractNew(base + "/rpg_scenes.js");
loadAndExtractNew(base + "/rpg_sprites.js");
loadAndExtractNew(base + "/rpg_windows.js");
