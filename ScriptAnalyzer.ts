import * as memberExtractors from "./memberExtractors";
import * as esprima from "esprima";

export default class ScriptAnalyzer {
    _extractors: memberExtractors.Extractor[] = [];
    _ast: esprima.Program;
    scriptMembers: MemberType[] = [];
    constructor(script: string) {
        this._ast = esprima.parseScript(script, { comment: true, loc: true, tokens: true });
    }

    registerExtractor(extractor: memberExtractors.Extractor) {
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

    static Default(script: string) {
        const analyzer = new ScriptAnalyzer(script);
        analyzer.registerDefaultExtractors();
        return analyzer;
    }
}
