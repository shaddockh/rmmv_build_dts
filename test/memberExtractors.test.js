"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const esprima = require("esprima");
const extractors = require("./../src/memberExtractors");
const bigScript = `
/* my variable */
var myglobal = true;

var myother = new Number();

function myGlobalFunction(b,d) {
    var y =32;
    var inner = function(callback) {
        // foo

    };

    inner(function() { 
        // may callbac
    });
}

/** This is a class */
function A() {
    var x = 0;
    function B(){
        var y = 2;
    }
}

A.prototype.bleh = function(a, b, c) {
    var c = 2;
};

A.staticFunc = function() {

};
`;
describe("GlobalFunctionExtractor", function () {
    it("should extract top level functions", function () {
        const ast = esprima.parseScript(bigScript, { comment: true, loc: true });
        const extractor = new extractors.GlobalFunctionExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(2);
        chai_1.expect(results[0].namespace).to.be.null;
        chai_1.expect(results[1].namespace).to.be.equal("A");
    });
    it("should extract top level functions with comments", function () {
        const ast = esprima.parseScript(bigScript, { comment: true, loc: true });
        const extractor = new extractors.GlobalFunctionExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results[1].name).to.equal("constructor");
        chai_1.expect(results[1].comment).to.equal("* This is a class");
    });
    it("should identify top level functions that are actually constructors", function () {
        const script = `
            function C() {}
            C.prototype.x = function() {};
            B.prototype.method = function() {};
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalFunctionExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].namespace).to.equal("C");
        chai_1.expect(results[0].name).to.equal("constructor");
    });
    it("should identify top level functions that are subclass constructors", function () {
        const script = `
            function C() {}
            C.prototype = Object.create(A.prototype);
            C.prototype.x = function() {};
            B.prototype.method = function() {};
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalFunctionExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].namespace).to.equal("C");
        chai_1.expect(results[0].valueType).to.equal("A");
    });
    it("should identify top level functions that are subclasses of long parents", function () {
        const script = `
            function C() {}
            C.prototype = Object.create(A.B.C.prototype);
            C.prototype.x = function() {};
            B.prototype.method = function() {};
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalFunctionExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].namespace).to.equal("C");
        chai_1.expect(results[0].valueType).to.equal("A.B.C");
    });
    it("should not grab inner calls when looking for constructor", function () {
        const script = `
            function Foo() {};
            Foo.prototype.x = function() {};
            JsonEx._resetPrototype = function(value, prototype) {
                if (Object.setPrototypeOf !== undefined) {
                    Object.setPrototypeOf(value, prototype);
                } else if ('__proto__' in value) {
                    value.__proto__ = prototype;
                } else {
                    var newValue = Object.create(prototype);
                    for (var key in value) {
                        if (value.hasOwnProperty(key)) {
                            newValue[key] = value[key];
                        }
                    }
                    value = newValue;
                }
                return value;
            };
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalFunctionExtractor();
        const results = extractor.extract(ast);
        /*
        expect(results).to.have.lengthOf(1);
        expect(results[0].namespace).to.equal("C");
        expect(results[0].valueType).to.equal("A");
        */
    });
});
describe("GlobalVariableExtractor", function () {
    it("should extract top level globals", function () {
        const ast = esprima.parseScript(bigScript, { comment: true, loc: true });
        const extractor = new extractors.GlobalVariableExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(2);
        chai_1.expect(results[0].name).to.equal("myglobal");
        chai_1.expect(results[0].type).to.equal("GlobalVar");
        chai_1.expect(results[0].valueType).to.equal("boolean");
        chai_1.expect(results[0].namespace).to.be.null;
    });
    it("should set valuetype to null if assigned null", function () {
        const script = `
            var foo = null;
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalVariableExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].valueType).to.be.null;
    });
    it("should extract variables with an object literal", function () {
        const script = `
            /** This is a comment for the bleh method */
            var bleh = {};
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalVariableExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].name).to.equal("bleh");
        chai_1.expect(results[0].type).to.equal("GlobalVar");
        chai_1.expect(results[0].valueType).to.equal("object");
    });
    it("should extract variables with an array type", function () {
        const script = `
            var bleh = [];
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalVariableExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].name).to.equal("bleh");
        chai_1.expect(results[0].type).to.equal("GlobalVar");
        chai_1.expect(results[0].valueType).to.equal("array");
    });
});
describe("GlobalObjectClassMethodExtractor", function () {
    const script = `
    /** This is a class */
    function A() { }
    /** This is a comment for the bleh method */
    A.prototype.bleh = function(a, b, c) { };
    A.staticFunc = function() {};
`;
    it("should extract prototype class methods", function () {
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassMethodExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(2);
        chai_1.expect(results[0].name).to.equal("bleh");
        chai_1.expect(results[0].type).to.equal("Method");
        chai_1.expect(results[0].namespace).to.equal("A");
    });
    it("should extract static class methods", function () {
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassMethodExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(2);
        chai_1.expect(results[1].name).to.equal("staticFunc");
        chai_1.expect(results[1].type).to.equal("StaticMethod");
        chai_1.expect(results[1].namespace).to.equal("A");
    });
    it("should not extract Object.* class methods", function () {
        const script = `
            Object.defineProperty(A, 'myProp', {
                get: function() {

                },
                set: function(value) {

                },
                configurable: true
            });
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassMethodExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(0);
    });
    it("should not grab inner variable name to use as function name", function () {
        const script = `
            A.loadScript = function(name) {
                var propa = "f";
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                script._url = url;
            };
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassMethodExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].name).to.equal("loadScript");
    });
    it("should not grab inner function parameters", function () {
        const script = `
            Foo.meth = function() {
                this._arr.forEach(function(buffer) {
                    // do something
                }.bind(this));
            };
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassMethodExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].name).to.equal("meth");
        chai_1.expect(results[0].parameters).to.have.lengthOf(0);
    });
});
describe("GlobalObjectClassPropertyExtractor", function () {
    const script = `
    /** This is a class */
    function A() { }
    /** This is a comment for the bleh method */
    A.prototype.bleh = "foo";
    A.staticProp = 0;
`;
    it("should extract prototype class properties", function () {
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(2);
        chai_1.expect(results[0].name).to.equal("bleh");
        chai_1.expect(results[0].type).to.equal("Property");
        chai_1.expect(results[0].valueType).to.equal("string");
        chai_1.expect(results[0].namespace).to.equal("A");
    });
    it("should extract static class properties", function () {
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(2);
        chai_1.expect(results[1].name).to.equal("staticProp");
        chai_1.expect(results[1].type).to.equal("StaticProperty");
        chai_1.expect(results[1].valueType).to.equal("number");
        chai_1.expect(results[1].namespace).to.equal("A");
    });
    it("should extract properties with a new object", function () {
        const script = `
            /** This is a class */
            function A() { }
            /** This is a comment for the bleh method */
            A.prototype.bleh = new Foo();
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].name).to.equal("bleh");
        chai_1.expect(results[0].type).to.equal("Property");
        chai_1.expect(results[0].valueType).to.equal("Foo");
        chai_1.expect(results[0].namespace).to.equal("A");
    });
    it("should extract properties with an object literal", function () {
        const script = `
            /** This is a class */
            function A() { }
            /** This is a comment for the bleh method */
            A.prototype.bleh = {};
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].name).to.equal("bleh");
        chai_1.expect(results[0].type).to.equal("Property");
        chai_1.expect(results[0].valueType).to.be.equal("object");
        chai_1.expect(results[0].namespace).to.equal("A");
    });
    it("should extract properties with an array type", function () {
        const script = `
            /** This is a class */
            function A() { }
            /** This is a comment for the bleh method */
            A.prototype.bleh = [];
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].name).to.equal("bleh");
        chai_1.expect(results[0].type).to.equal("Property");
        chai_1.expect(results[0].valueType).to.equal("array");
        chai_1.expect(results[0].namespace).to.equal("A");
    });
    it("should set valuetype to null if assigned null", function () {
        const script = `
            A.prototype.foo = null;
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].valueType).to.be.null;
    });
    it("should not grab inner variables from inside function", function () {
        const script = `
            A.loadScript = function(name) {
                if (this._a || !g.doit()) {
                    this.start();
                }
            };
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(0);
    });
    it("should not grab inner variables from inside function 2", function () {
        const script = `
            A.Select = function() {
                this.change(this._Index + 1, 'foo');
            };
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(0);
    });
});
describe("ObjectDefinePropertyExtractor", function () {
    it("should extract static property ", function () {
        const script = `
        /* this is a property */
        Object.defineProperty(A, 'prop', {
            // comment
            get: function() {
                return 0;
            },
            set: function(value) {
            },
            configurable: true
        });
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.ObjectDefinePropertyExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].namespace).to.equal("A");
        chai_1.expect(results[0].type).to.equal("StaticProperty");
    });
    it("should extract prototype property ", function () {
        const script = `
        /* this is a property */
        Object.defineProperty(A.prototype, 'prop', {
            // comment
            get: function() {
                return 0;
            },
            set: function(value) {
            },
            configurable: true
        });
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.ObjectDefinePropertyExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(1);
        chai_1.expect(results[0].namespace).to.equal("A");
        chai_1.expect(results[0].type).to.equal("Property");
    });
});
describe("ObjectDefinePropertiesExtractor", function () {
    it("should extract static properties ", function () {
        const script = `
        /* this is a property */
        Object.defineProperties(Foo, {
            x: { get: function() { return this._x; }, configurable: true },
            y: { get: function() { return this._y; }, configurable: true }
        });
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.ObjectDefinePropertiesExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(2);
        chai_1.expect(results[0].namespace).to.equal("Foo");
        chai_1.expect(results[0].type).to.equal("StaticProperty");
        chai_1.expect(results[0].name).to.equal("x");
        chai_1.expect(results[1].name).to.equal("y");
    });
    it("should extract prototype properties ", function () {
        const script = `
        /* this is a property */
        Object.defineProperties(Foo.prototype, {
            x: { get: function() { return this._x; }, configurable: true },
            y: { get: function() { return this._y; }, configurable: true }
        });
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        const extractor = new extractors.ObjectDefinePropertiesExtractor();
        const results = extractor.extract(ast);
        chai_1.expect(results).to.have.lengthOf(2);
        chai_1.expect(results[0].namespace).to.equal("Foo");
        chai_1.expect(results[0].type).to.equal("Property");
        chai_1.expect(results[0].name).to.equal("x");
        chai_1.expect(results[1].name).to.equal("y");
    });
});
