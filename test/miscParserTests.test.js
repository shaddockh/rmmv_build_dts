"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const esprima = require("esprima");
describe("Parser Tests", function () {
    it.skip("should parse comments", function () {
        const script = `
            /** function declaration */
            function C() {}
            C.prototype = Object.create(A.prototype);

            // prototype
            C.prototype.x = function() {};
            B.prototype.method = function() {};
        `;
        const ast = esprima.parseScript(script, { comment: true, loc: true });
        console.log(JSON.stringify(ast, null, 2));
        //TODO: when we find a function or property, then
        // we need to look at the comments
        // and grab the comment that ends at the line above it
    });
});
