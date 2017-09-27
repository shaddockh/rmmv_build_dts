import * as esprima from "esprima";
import * as esquery from "esquery";

export interface Extractor {
    extract(ast: esprima.Program): MemberType[];
}

class ExtractUtils {
    static getValueTypeFromNode(node) {
        let valueType = esquery(node, "NewExpression > Identifier");
        if (valueType.length) {
            return valueType[0].name;
        }

        valueType = esquery(node, "Literal");
        if (valueType.length) {
            if (valueType[0].value !== null) {
                return typeof valueType[0].value;
            }
        }

        valueType = esquery(node, "ArrayExpression");
        if (valueType.length) {
            return "array";
        }

        valueType = esquery(node, "ObjectExpression");
        if (valueType.length) {
            return "object";
        }

        return null;
    }
}

export class GlobalObjectClassMethodExtractor implements Extractor {
    extract(ast: esprima.Program) {
        const results = [] as MemberType[];
        // Get object functions
        let matches = esquery(ast, "Program > ExpressionStatement > !AssignmentExpression > FunctionExpression");
        //Program > ExpressionStatement > AssignmentExpression:has(FunctionExpression)
        // console.log(JSON.stringify(matches, null, 2));
        matches.forEach(node => {
            const funcName = esquery(node.left, "MemberExpression Identifier");
            let func: MemberType = {
                name: funcName[funcName.length - 1].name,
                namespace: funcName[0].name,
                type: "Method",
                parameters: [],
                valueType: null
            };

            if (funcName[1].name != "prototype") {
                func.type = "StaticMethod";
            }

            let params = node.right.params;
            func.parameters = params.map(p => p.name);
            results.push(func);
        });
        return results;
    }
}

export class GlobalVariableExtractor implements Extractor {
    extract(ast: esprima.Program) {
        const results = [] as MemberType[];

        let matches = esquery(ast, "Program > VariableDeclaration");
        matches.forEach(node => {
            node.declarations.forEach(d => {
                // we have a VariableDeclaration coming in
                let variable: MemberType = {
                    name: d.id.name,
                    type: "GlobalVar",
                    namespace: null,
                    parameters: null,
                    valueType: null
                };

                variable.valueType = ExtractUtils.getValueTypeFromNode(d);

                results.push(variable);
                //console.log(variable);
            });
        });
        return results;
    }
}

export class GlobalFunctionExtractor implements Extractor {
    extract(ast: esprima.Program) {
        const results = [] as MemberType[];

        let classFunctionList = null;
        let constructors = null;

        let matches = esquery(ast, "Program > FunctionDeclaration");
        matches.forEach(node => {
            let func: MemberType = {
                name: node.id.name,
                type: "GlobalFunction",
                namespace: null,
                parameters: [],
                valueType: null
            };

            // do some caching
            if (!classFunctionList) {
                //lets build up any prototypes in this file
                let classFunctionMatches = esquery(
                    ast,
                    `Program > ExpressionStatement > !AssignmentExpression > FunctionExpression`
                );

                classFunctionList = {};
                classFunctionMatches.forEach(p => {
                    if (p.left && p.left.object) {
                        // difference between prototype method and static method
                        if (p.left.object.object && p.left.object.object.name) {
                            classFunctionList[p.left.object.object.name] = true;
                        } else {
                            classFunctionList[p.left.object.name] = true;
                        }
                    }
                });

                constructors = {};

                let constructorMatches = esquery(
                    ast,
                    `Program > ExpressionStatement > !AssignmentExpression > CallExpression:has([object.name="Object"][property.name="create"])  `
                );

                constructorMatches.forEach(c => {
                    let ids = esquery(c, `CallExpression .arguments`);
                    constructors[c.left.object.name] = ids[0].object.name;
                });
            }

            // we have a FunctionDeclaration coming in
            node.params.forEach(p => {
                func.parameters.push(p.name);
            });

            if (classFunctionList[func.name]) {
                if (constructors[func.name]) {
                    func.valueType = constructors[func.name];
                }

                func.type = "Method";
                func.namespace = func.name;
                func.name = "constructor";
            }

            results.push(func);
        });
        return results;
    }
}

export class GlobalObjectClassPropertyExtractor implements Extractor {
    extract(ast: esprima.Program) {
        const results = [] as MemberType[];
        // Get object functions
        let matches = esquery(
            ast,
            "Program > ExpressionStatement > AssignmentExpression:has( Literal, NewExpression, ArrayExpression, ObjectExpression)"
        );

        //Program > ExpressionStatement > AssignmentExpression:has(FunctionExpression)
        // console.log(JSON.stringify(matches, null, 2));
        matches.forEach(node => {
            // TODO: is there a way to query this with the query langauge?
            if (node.right.type != "FunctionExpression") {
                const memberName = esquery(node, "MemberExpression Identifier");
                let member: MemberType = {
                    name: memberName[memberName.length - 1].name,
                    namespace: memberName[0].name,
                    type: "Property",
                    parameters: [],
                    valueType: null
                };

                if (memberName[1].name != "prototype") {
                    member.type = "StaticProperty";
                }

                member.valueType = ExtractUtils.getValueTypeFromNode(node);
                //console.log(member);
                results.push(member);
            }
        });
        return results;
    }
}

export class ObjectDefinePropertyExtractor implements Extractor {
    extract(ast: esprima.Program) {
        const results = [] as MemberType[];
        // Get object functions
        let matches = esquery(
            ast,
            `Program > ExpressionStatement > [callee.object.name="Object"][callee.property.name="defineProperty"] `
        );

        matches.forEach(node => {
            let member: MemberType;

            let argument0 = node.arguments[0];
            if (argument0.object && argument0.property && argument0.property.name == "prototype") {
                member = {
                    namespace: argument0.object.name,
                    name: node.arguments[1].value,
                    type: "Property",
                    parameters: [],
                    valueType: null
                };
                results.push(member);
            } else if (argument0.name) {
                member = {
                    namespace: argument0.name,
                    name: node.arguments[1].value,
                    type: "StaticProperty",
                    parameters: [],
                    valueType: null
                };
                results.push(member);
            }
        });

        return results;
    }
}

export class ObjectDefinePropertiesExtractor implements Extractor {
    extract(ast: esprima.Program) {
        const results = [] as MemberType[];
        // Get object functions
        let matches = esquery(
            ast,
            `Program > ExpressionStatement > [callee.object.name="Object"][callee.property.name="defineProperties"] `
        );

        matches.forEach(node => {
            let argument0 = node.arguments[0];
            let namespace = null;
            let isStatic = false;

            if (argument0.object && argument0.property.name == "prototype") {
                namespace = argument0.object.name;
                isStatic = false;
            } else if (argument0.name) {
                namespace = argument0.name;
                isStatic = true;
            }

            let objExp = esquery(node, "CallExpression > ObjectExpression");
            objExp[0].properties.forEach(p => {
                let member: MemberType = {
                    namespace: namespace,
                    name: p.key.name,
                    type: isStatic ? "StaticProperty" : "Property",
                    parameters: [],
                    valueType: null
                };
                results.push(member);
            });
        });

        return results;
    }
}
export function getDefaultExtractors() {
    return [
        new GlobalObjectClassMethodExtractor(),
        new GlobalVariableExtractor(),
        new GlobalFunctionExtractor(),
        new GlobalObjectClassPropertyExtractor(),
        new ObjectDefinePropertyExtractor(),
        new ObjectDefinePropertiesExtractor()
    ];
}
