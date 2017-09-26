import { expect } from "chai";
import * as esprima from "esprima";
import * as extractors from "./../memberExtractors";
import * as esquery from "esquery";

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

describe("GlobalFunctionExtractor", function() {
    it("should extract top level functions", function() {
        const ast = esprima.parseScript(bigScript, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalFunctionExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(2);
        expect(results[0].namespace).to.be.null;
    });

    it("should identify top level functions that are actually constructors", function() {
        const script = `
            function C() {}
            C.prototype.x = function() {};
            B.prototype.method = function() {};
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalFunctionExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].namespace).to.equal("C");
        expect(results[0].name).to.equal("constructor");
    });

    it("should identify top level functions that are subclass constructors", function() {
        const script = `
            function C() {}
            C.prototype = Object.create(A.prototype);
            C.prototype.x = function() {};
            B.prototype.method = function() {};
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalFunctionExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].namespace).to.equal("C");
        expect(results[0].valueType).to.equal("A");
    });

    it("should not grab inner calls when looking for constructor", function() {
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

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalFunctionExtractor();

        const results = extractor.extract(ast);
        /*
        expect(results).to.have.lengthOf(1);
        expect(results[0].namespace).to.equal("C");
        expect(results[0].valueType).to.equal("A");
        */
    });
});

describe("GlobalVariableExtractor", function() {
    it("should extract top level globals", function() {
        const ast = esprima.parseScript(bigScript, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalVariableExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(2);
        expect(results[0].name).to.equal("myglobal");
        expect(results[0].type).to.equal("GlobalVar");
        expect(results[0].valueType).to.equal("boolean");
        expect(results[0].namespace).to.be.null;
    });

    it("should set valuetype to null if assigned null", function() {
        const script = `
            var foo = null;
        `;
        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalVariableExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].valueType).to.be.null;
    });

    it("should extract variables with an object literal", function() {
        const script = `
            /** This is a comment for the bleh method */
            var bleh = {};
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalVariableExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].name).to.equal("bleh");
        expect(results[0].type).to.equal("GlobalVar");
        expect(results[0].valueType).to.equal("object");
    });

    it("should extract variables with an array type", function() {
        const script = `
            var bleh = [];
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalVariableExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].name).to.equal("bleh");
        expect(results[0].type).to.equal("GlobalVar");
        expect(results[0].valueType).to.equal("array");
    });
});

describe("GlobalObjectClassMethodExtractor", function() {
    const script = `
    /** This is a class */
    function A() { }
    /** This is a comment for the bleh method */
    A.prototype.bleh = function(a, b, c) { };
    A.staticFunc = function() {};
`;

    it("should extract prototype class methods", function() {
        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassMethodExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(2);
        expect(results[0].name).to.equal("bleh");
        expect(results[0].type).to.equal("Method");
        expect(results[0].namespace).to.equal("A");
    });

    it("should extract static class methods", function() {
        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassMethodExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(2);
        expect(results[1].name).to.equal("staticFunc");
        expect(results[1].type).to.equal("StaticMethod");
        expect(results[1].namespace).to.equal("A");
    });

    it("should not extract Object.* class methods", function() {
        const script = `
            Object.defineProperty(A, 'myProp', {
                get: function() {

                },
                set: function(value) {

                },
                configurable: true
            });
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassMethodExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(0);
    });

    it("should not grab inner variable name to use as function name", function() {
        const script = `
            A.loadScript = function(name) {
                var propa = "f";
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                script._url = url;
            };
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassMethodExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].name).to.equal("loadScript");
    });
});

describe("GlobalObjectClassPropertyExtractor", function() {
    const script = `
    /** This is a class */
    function A() { }
    /** This is a comment for the bleh method */
    A.prototype.bleh = "foo";
    A.staticProp = 0;
`;

    it("should extract prototype class properties", function() {
        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(2);
        expect(results[0].name).to.equal("bleh");
        expect(results[0].type).to.equal("Property");
        expect(results[0].valueType).to.equal("string");
        expect(results[0].namespace).to.equal("A");
    });

    it("should extract static class properties", function() {
        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(2);
        expect(results[1].name).to.equal("staticProp");
        expect(results[1].type).to.equal("StaticProperty");
        expect(results[1].valueType).to.equal("number");
        expect(results[1].namespace).to.equal("A");
    });

    it("should extract properties with a new object", function() {
        const script = `
            /** This is a class */
            function A() { }
            /** This is a comment for the bleh method */
            A.prototype.bleh = new Foo();
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].name).to.equal("bleh");
        expect(results[0].type).to.equal("Property");
        expect(results[0].valueType).to.equal("Foo");
        expect(results[0].namespace).to.equal("A");
    });

    it("should extract properties with an object literal", function() {
        const script = `
            /** This is a class */
            function A() { }
            /** This is a comment for the bleh method */
            A.prototype.bleh = {};
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].name).to.equal("bleh");
        expect(results[0].type).to.equal("Property");
        expect(results[0].valueType).to.be.equal("object");
        expect(results[0].namespace).to.equal("A");
    });

    it("should extract properties with an array type", function() {
        const script = `
            /** This is a class */
            function A() { }
            /** This is a comment for the bleh method */
            A.prototype.bleh = [];
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].name).to.equal("bleh");
        expect(results[0].type).to.equal("Property");
        expect(results[0].valueType).to.equal("array");
        expect(results[0].namespace).to.equal("A");
    });

    it("should set valuetype to null if assigned null", function() {
        const script = `
            A.prototype.foo = null;
        `;
        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].valueType).to.be.null;
    });

    it("should not grab inner variables from inside function", function() {
        const script = `
            A.loadScript = function(name) {
                if (this._a || !g.doit()) {
                    this.start();
                }
            };
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(0);
    });
    it("should not grab inner variables from inside function 2", function() {
        const script = `
            A.Select = function() {
                this.change(this._Index + 1, 'foo');
            };
        `;

        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.GlobalObjectClassPropertyExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(0);
    });
});

describe("ObjectDefinePropertyExtractor", function() {
    it("should extract static property ", function() {
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
        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.ObjectDefinePropertyExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].namespace).to.equal("A");
        expect(results[0].type).to.equal("StaticProperty");
    });

    it("should extract prototype property ", function() {
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
        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.ObjectDefinePropertyExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(1);
        expect(results[0].namespace).to.equal("A");
        expect(results[0].type).to.equal("Property");
    });
});

describe("ObjectDefinePropertiesExtractor", function() {
    it("should extract static properties ", function() {
        const script = `
        /* this is a property */
        Object.defineProperties(Foo, {
            x: { get: function() { return this._x; }, configurable: true },
            y: { get: function() { return this._y; }, configurable: true }
        });
        `;
        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.ObjectDefinePropertiesExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(2);
        expect(results[0].namespace).to.equal("Foo");
        expect(results[0].type).to.equal("StaticProperty");
        expect(results[0].name).to.equal("x");
        expect(results[1].name).to.equal("y");
    });

    it("should extract prototype properties ", function() {
        const script = `
        /* this is a property */
        Object.defineProperties(Foo.prototype, {
            x: { get: function() { return this._x; }, configurable: true },
            y: { get: function() { return this._y; }, configurable: true }
        });
        `;
        const ast = esprima.parseScript(script, { comment: true, range: true, tokens: true });
        const extractor = new extractors.ObjectDefinePropertiesExtractor();

        const results = extractor.extract(ast);
        expect(results).to.have.lengthOf(2);
        expect(results[0].namespace).to.equal("Foo");
        expect(results[0].type).to.equal("Property");
        expect(results[0].name).to.equal("x");
        expect(results[1].name).to.equal("y");
    });
});
