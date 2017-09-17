"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
// import * as functionExtractor from "function-extractor";
const readline = require("readline");
const custom_function_extractor_1 = require("./custom_function_extractor");
const Fixes_1 = require("./Fixes");
const NamespaceDeclaration_1 = require("./NamespaceDeclaration");
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
    const source = fs.readFileSync(currentFilename, "utf8");
    let functions = custom_function_extractor_1.parse(source);
    loadSourceFile(currentFilename)
        .then(lines => {
        extract(currentFilename, lines, functions);
    })
        .catch(e => {
        console.log("Error detected:");
        console.log(e);
    });
}
function extract(currentFilename, lines, functions) {
    const outName = "generated/" +
        currentFilename
            .split("/")
            .pop()
            .replace(".js", ".d.ts");
    const destFd = fs.openSync(outName, "w");
    let dts = new NamespaceDeclaration_1.NamespaceList();
    let lastnamespace = "";
    let currentNamespace;
    for (let i = 0; i < functions.length; i++) {
        let func = functions[i];
        if (func.namespace == undefined) {
            // We might be a constructor, so just skip it
            if (functions.length > i + 1) {
                if (func.name == functions[i + 1].namespace) {
                    let ns = dts.getNamespace(functions[i + 1].namespace);
                    let comment = getFormalComment(func.loc.line - 1, lines);
                    if (comment) {
                        ns.comment = comment;
                    }
                    // Let's see if we extend anything
                    ns.extendsObject = checkExtendsObject(ns.name, func.loc.line - 1, lines);
                    continue;
                }
            }
        }
        if (func.namespace == undefined) {
            if (func.name == "get" || func.name == "set") {
                let propDefinition = getGetterSetterProperty(func.loc.line - 1, lines);
                if (propDefinition) {
                    // we only care about the getter
                    if (func.name == "get") {
                        let ns = dts.getNamespace(propDefinition.namespace);
                        let member = new NamespaceDeclaration_1.NamespaceMember();
                        member.name = propDefinition.property;
                        member.isProp = true;
                        member.isStatic = propDefinition.isStatic;
                        member.comment = getFormalComment(func.loc.line - 2, lines);
                        ns.members.push(member);
                    }
                    continue;
                }
            }
            // Don't know what this is .. log it
            fs.appendFileSync(destFd, "// Unknown object could be in namespace: " +
                lastnamespace +
                " at line: " +
                func.loc.line +
                " in file: " +
                currentFilename +
                "\n");
            fs.appendFileSync(destFd, "// " + lines[func.loc.line - 1] + "\n");
        }
        else {
            lastnamespace = func.namespace;
            let ns = dts.getNamespace(func.namespace);
            let member = new NamespaceDeclaration_1.NamespaceMember();
            member.params = func.params.map(p => {
                return p.name;
            });
            member.comment = getFormalComment(func.loc.line - 1, lines);
            member.name = func.name;
            member.isStatic = !func.isPrototype;
            ns.members.push(member);
        }
    }
    const fixer = new Fixes_1.FixHandler();
    fixer.loadFixes("./PostScanFixes.json");
    dts.getNamespaceList().forEach(ns => {
        fixer.applyFixes(ns);
        fs.appendFileSync(destFd, ns.buildOutput());
    });
    fs.closeSync(destFd);
}
function checkExtendsObject(objectName, lineNumber, lines) {
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.trim() == "") {
            continue;
        }
        if (line.indexOf(objectName + ".prototype = Object.create(") > -1) {
            let l = line
                .substring(line.indexOf("("))
                .replace("(", "")
                .replace(")", "")
                .replace(".prototype", "")
                .replace(";", "");
            return l;
        }
    }
    return null;
}
function getGetterSetterProperty(lineNumber, lines) {
    let regex = /Object\.defineProperty\(([\w\.]+)[, ']+(\w+)/g;
    var count = 0;
    for (let i = lineNumber - 1; i > 0; i--) {
        count++;
        let line = lines[i].trim();
        let matches = regex.exec(line);
        if (matches) {
            return {
                namespace: matches[1].replace(".prototype", ""),
                property: matches[2],
                isStatic: matches[1].indexOf(".prototype") == -1
            };
        }
        //HACK: if we have looked up more than 5 lines
        // and haven't found the definition, then exit
        if (count > 5) {
            break;
        }
    }
    return null;
    //Object.defineProperty(ConfigManager, 'bgmVolume', {
}
function getFormalComment(lineNumber, lines) {
    let comment = [];
    let longComment = false;
    let skiplines = [/Object\.defineProperty\(([\w\.]+)[, ']+(\w+)/g];
    // walk up
    for (let i = lineNumber - 1; i > 0; i--) {
        let line = lines[i].trim();
        if (line.trim() == "") {
            continue;
        }
        let shouldSkip = false;
        skiplines.forEach(l => {
            if (l.test(line)) {
                shouldSkip = true;
            }
        });
        if (shouldSkip) {
            continue;
        }
        if (line.startsWith("//")) {
            comment.unshift(line);
            continue;
        }
        if (line.endsWith("*/")) {
            comment.unshift(line);
            longComment = true;
            continue;
        }
        if (line.startsWith("/*")) {
            comment.unshift(line);
            break;
        }
        if (!longComment) {
            break;
        }
        else {
            comment.unshift(line);
        }
    }
    if (comment.length) {
        return comment.join("\n");
    }
    return null;
}
let base = "./v1.4.2_c";
base = "./v1.5.1";
loadAndExtract(base + "/rpg_core.js");
loadAndExtract(base + "/rpg_managers.js");
loadAndExtract(base + "/rpg_objects.js");
loadAndExtract(base + "/rpg_scenes.js");
loadAndExtract(base + "/rpg_sprites.js");
loadAndExtract(base + "/rpg_windows.js");
