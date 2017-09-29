"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ScriptAnalyzer_1 = require("../src/ScriptAnalyzer");
describe("ScriptAnalyzer", function () {
    it("should instantiate", function () {
        new ScriptAnalyzer_1.default("var x = 23;");
    });
    it("should load default extractors", function () {
        const analyzer = new ScriptAnalyzer_1.default("var x = 23;");
        analyzer.registerDefaultExtractors();
        chai_1.expect(analyzer._extractors.length).to.be.greaterThan(0);
    });
    it("should analyze simple expression", function () {
        const analyzer = ScriptAnalyzer_1.default.Default(`
            function Foo() {};
            Foo.prototype.prop = 3;
        `);
        analyzer.analyze();
        chai_1.expect(analyzer.scriptMembers).to.have.lengthOf(2);
    });
});
