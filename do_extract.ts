import DtsGenerator from "./DtsGenerator";
import ScriptAnalyzer from "./ScriptAnalyzer";
import * as fs from "fs";
// import * as functionExtractor from "function-extractor";
import * as readline from "readline";
import { parse } from "./custom_function_extractor";
import { FixHandler } from "./Fixes";
import { NamespaceDeclaration, NamespaceMember, NamespaceList } from "./dtsMembers";

function loadSourceFile(currentFilename) {
    return new Promise<string[]>((resolve, failure) => {
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

function loadAndExtractNew(currentFilename: string) {
    console.log("Processing File: " + currentFilename);
    const source = fs.readFileSync(currentFilename, "utf8");
    const analyzer = ScriptAnalyzer.Default(source);
    analyzer.analyze();

    const fixer = new FixHandler();
    fixer.loadFixes("./PostScanFixes.json");

    const dtsGenerator = new DtsGenerator(analyzer, fixer);
    const outName =
        "generated2/" +
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
