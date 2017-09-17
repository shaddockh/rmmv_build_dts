/* From function-extractor */

var util = require("util"),
    esprima = require("esprima");

function traverse(object, visitor, master?) {
    var parent;
    parent = master === "undefined" ? [] : master;
    if (visitor.call(null, object, parent) === false) {
        return;
    }
    return Object.keys(object).forEach(function(key) {
        var child, path;
        child = object[key];
        path = [object];
        path.push(parent);
        if (typeof child === "object" && child !== null) {
            return traverse(child, visitor, path);
        }
    });
}

function getFunctions(tree, code?) {
    var matched = false,
        list = [];

    traverse(tree, function(node, path) {
        var parent;
        var namespace: any;
        var prototyping: any;

        if (node.type === "FunctionDeclaration") {
            return list.push({
                name: node.id.name,
                params: node.params,
                range: node.range,
                blockStart: node.body.range[0],
                end: node.body.range[1],
                loc: node.loc.start
            });
        } else if (node.type === "FunctionExpression") {
            parent = path[0];
            if (parent.type === "AssignmentExpression") {
                if (typeof parent.left.range !== "undefined") {
                    if (parent.left.type === "MemberExpression") {
                        // for: foo.doSomething = function
                        if (parent.left.object.name !== undefined) {
                            var namespace = parent.left.object.name;

                            if (parent.left.property.name !== undefined) {
                                var memberName = parent.left.property.name;
                                matched = true;
                            } else if (parent.left.property && parent.left.property.type === "Literal") {
                                // for: foo["doSomething"] = function()
                                var namespace = parent.left.object.name;
                                var memberName = parent.left.property.value;
                                matched = true;
                            }
                        } else if (parent.left.object.type === "ThisExpression") {
                            // for: this.doSomething = function
                            namespace = "thiz";
                            if (parent.left.property.name !== undefined) {
                                var memberName = parent.left.property.name;
                                matched = true;
                            } else if (parent.left.property.type === "CallExpression") {
                                // for this[variable] = function()
                                // no op
                                matched = true;
                            }
                        } else if (
                            parent.left.object.object !== undefined &&
                            parent.left.object.object.type === "Identifier"
                        ) {
                            // for: Function.prototype.doSomething = function()
                            // var namespace = parent.left.object.object.type;
                            var namespace = parent.left.object.object.name;
                            var memberName = parent.left.property.name;
                            var isPrototype = true;
                            prototyping = "prototype";
                            matched = true;
                        } else if (
                            parent.left.type === "MemberExpression" &&
                            parent.left.object.type === "MemberExpression"
                        ) {
                            // for: this.htmlElement.onmouseover = function()
                            namespace = "thiz";
                            var memberName = parent.left.property.name;

                            var isPrototype = true;
                            prototyping = parent.left.object.property.name;
                            matched = true;
                        } else if (
                            parent.left.object !== undefined &&
                            parent.left.object.type === "ConditionalExpression"
                        ) {
                            // for: (boolType ? "name" : "name2").doSomething = function()
                            // no op
                            matched = true;
                        }
                    } else if (parent.left.type === "Identifier") {
                        var memberName = parent.left.name;
                        matched = true;
                    }

                    if (!matched) {
                        console.error("Never found a matching arrangement!");
                        console.error(util.inspect(parent.left, null, 5));
                    } else {
                        return list.push({
                            namespace: namespace,
                            name: memberName,
                            isPrototype: isPrototype,
                            prototyping: prototyping,
                            params: node.params,
                            range: node.range,
                            blockStart: node.body.range[0],
                            end: node.body.range[1],
                            loc: node.loc.start
                        });
                    }
                }
            } else if (parent.type === "VariableDeclarator") {
                return list.push({
                    name: parent.id.name,
                    params: node.params,
                    range: node.range,
                    blockStart: node.body.range[0],
                    end: node.body.range[1],
                    loc: node.loc.start
                });
            } else if (parent.type === "CallExpression") {
                return list.push({
                    name: parent.id ? parent.id.name : "[Anonymous]",
                    params: node.params,
                    range: node.range,
                    blockStart: node.body.range[0],
                    end: node.body.range[1],
                    loc: node.loc.start
                });
            } else if (typeof parent.length === "number") {
                return list.push({
                    name: parent.id ? parent.id.name : "[Anonymous]",
                    params: node.params,
                    range: node.range,
                    blockStart: node.body.range[0],
                    end: node.body.range[1],
                    loc: node.loc.start
                });
            } else if (typeof parent.key !== "undefined") {
                if (parent.key.type === "Identifier") {
                    if (parent.value === node && parent.key.name) {
                        return list.push({
                            name: parent.key.name,
                            params: node.params,
                            range: node.range,
                            blockStart: node.body.range[0],
                            end: node.body.range[1],
                            loc: node.loc.start
                        });
                    }
                }
            }
        }
    });

    return list;
}

export function parse(code, options?) {
    var tree = esprima.parse(code, {
        loc: true,
        range: true
    });

    var functions = getFunctions(tree);

    functions = functions.filter(function(fn) {
        return fn.name !== "[Anonymous]";
    });

    return functions;
}
