"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memberExtractors = require("./memberExtractors");
const esprima = require("esprima");
class ScriptAnalyzer {
    constructor(script) {
        this._extractors = [];
        this.scriptMembers = [];
        this._ast = esprima.parseScript(script, { comment: true, loc: true, tokens: true });
    }
    registerExtractor(extractor) {
        this._extractors.push(extractor);
    }
    registerDefaultExtractors() {
        memberExtractors.getDefaultExtractors().forEach(e => this.registerExtractor(e));
    }
    analyze() {
        this._extractors.forEach(e => {
            this.scriptMembers = this.scriptMembers.concat(e.extract(this._ast));
        });
        //TODO: post analysis
    }
    static Default(script) {
        const analyzer = new ScriptAnalyzer(script);
        analyzer.registerDefaultExtractors();
        return analyzer;
    }
}
exports.default = ScriptAnalyzer;
