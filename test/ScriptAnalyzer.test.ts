import { expect } from "chai";
import ScriptAnalyzer from "../src/ScriptAnalyzer";

describe("ScriptAnalyzer", function() {
    it("should instantiate", function() {
        new ScriptAnalyzer("var x = 23;");
    });

    it("should load default extractors", function() {
        const analyzer = new ScriptAnalyzer("var x = 23;");
        analyzer.registerDefaultExtractors();
        expect(analyzer._extractors.length).to.be.greaterThan(0);
    });

    it("should analyze simple expression", function() {
        const analyzer = ScriptAnalyzer.Default(`
            function Foo() {};
            Foo.prototype.prop = 3;
        `);

        analyzer.analyze();

        expect(analyzer.scriptMembers).to.have.lengthOf(2);
    });
});
