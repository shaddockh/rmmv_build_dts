"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const dtsMembers_1 = require("./dtsMembers");
class DtsGenerator {
    constructor(analyzer, fixer) {
        this._analyzer = analyzer;
        this._fixer = fixer;
    }
    generate(filename) {
        let dts = new dtsMembers_1.NamespaceList();
        this._analyzer.scriptMembers.forEach(member => {
            const ns = dts.getNamespace(member.namespace || "global", true);
            const nsMember = dtsMembers_1.DtsMemberFactory.fromMemberType(member);
            ns.addMember(nsMember);
        });
        const results = [];
        const namespaceList = dts.getNamespaceList();
        namespaceList.sort((a, b) => {
            if (a.isGlobal) {
                return -1;
            }
            if (b.isGlobal) {
                return 1;
            }
            // only bubble global functions to the top.
            // leave everything else in place
            return 0;
        });
        namespaceList.forEach(ns => {
            console.log("Applying fixes for " + ns.name);
            this._fixer.applyFixes(ns);
        });
        namespaceList.forEach(ns => {
            console.log("Generating " + ns.name);
            results.push(ns.buildOutput());
        });
        const output = results.join("\n");
        if (filename) {
            const destFd = fs.openSync(filename, "w");
            fs.appendFileSync(destFd, output);
            fs.closeSync(destFd);
        }
        return results.join("\n");
    }
    save(filename) { }
}
exports.default = DtsGenerator;
