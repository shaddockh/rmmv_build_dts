"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const readline = require("readline");
const DtsGenerator_1 = require("./src/DtsGenerator");
const Fixes_1 = require("./src/Fixes");
const ScriptAnalyzer_1 = require("./src/ScriptAnalyzer");
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
function loadAndExtract(currentFilename) {
    console.log("Processing File: " + currentFilename);
    const source = fs.readFileSync(currentFilename, "utf8");
    const analyzer = ScriptAnalyzer_1.default.Default(source);
    analyzer.analyze();
    const fixer = new Fixes_1.FixHandler();
    fixer.loadFixes("./PostScanFixes.json");
    const dtsGenerator = new DtsGenerator_1.default(analyzer, fixer);
    const outName = "dist/" +
        currentFilename
            .split("/")
            .pop()
            .replace(".js", ".d.ts");
    dtsGenerator.generate(outName);
}
let base = "./v1.4.2_c";
base = "./v1.5.1";
loadAndExtract(base + "/rpg_core.js");
loadAndExtract(base + "/rpg_managers.js");
loadAndExtract(base + "/rpg_objects.js");
loadAndExtract(base + "/rpg_scenes.js");
loadAndExtract(base + "/rpg_sprites.js");
loadAndExtract(base + "/rpg_windows.js");
