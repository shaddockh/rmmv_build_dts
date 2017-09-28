"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RenderUtils {
    static formatComment(indent, commentBlock) {
        let splits = commentBlock.split("\n");
        if (splits.length == 1) {
            return indent + "/* " + splits[0] + " */";
        }
        else {
            splits[0] = "/*" + splits[0];
            splits.push("*/");
            return splits.map(s => indent + s).join("\n");
        }
    }
}
class NamespaceDeclaration {
    constructor() {
        this.members = [];
        this.classOrInterface = "class";
    }
    addMember(member) {
        if (member.isConstructor) {
            this.extendsObject = member.type;
        }
        this.members.push(member);
    }
    get isGlobal() {
        return this.name == "global";
    }
    sort() {
        this.members.sort((a, b) => {
            // bubble constructor to the top
            if (a.isConstructor) {
                return -1;
            }
            if (b.isConstructor) {
                return 1;
            }
            if (a.isProp == b.isProp) {
                if (a.isStatic != b.isStatic) {
                    return a.isStatic ? -1 : 1;
                }
                else {
                    if (a.name.startsWith("_") && !b.name.startsWith("_")) {
                        return -1;
                    }
                    else if (!a.name.startsWith("_") && b.name.startsWith("_")) {
                        return 1;
                    }
                    return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
                }
            }
            else {
                return a.isProp ? -1 : 1;
            }
        });
    }
    buildOutput() {
        this.sort();
        // first build out the interface, then the class
        let output = [];
        if (this.comment) {
            output.push(RenderUtils.formatComment("", this.comment));
        }
        if (!this.isGlobal) {
            if (this.extendsObject) {
                output.push(`declare ${this.classOrInterface} ${this.name} extends ${this.extendsObject} {`);
            }
            else {
                output.push(`declare ${this.classOrInterface} ${this.name} {`);
            }
        }
        this.members.forEach(member => {
            if (this.classOrInterface == "interface" && member.isStatic) {
                member.isStatic = false;
            }
            if (!this.isGlobal) {
                output.push(member.buildOutput("    "));
            }
            else {
                output.push(member.buildOutput(""));
            }
        });
        if (!this.isGlobal) {
            output.push("}\n");
        }
        output.push("\n");
        return output.join("\n");
    }
}
exports.NamespaceDeclaration = NamespaceDeclaration;
class NamespaceMember {
    constructor() {
        this.params = [];
        this.isStatic = false;
        this.isProp = false;
        this.isGlobal = false;
    }
    get isConstructor() {
        return this.isProp == false && this.name == "constructor";
    }
    buildOutput(indent) {
        let output = [];
        if (this.comment) {
            output.push("");
            output.push(RenderUtils.formatComment(indent, this.comment));
        }
        let memberLine = "";
        if (this.isGlobal && this.isProp) {
            memberLine += "declare var ";
        }
        if (this.isGlobal && !this.isProp) {
            memberLine += "declare function ";
        }
        memberLine += indent + (this.isStatic ? "static " : "") + this.name;
        if (!this.isProp) {
            memberLine += "(" + this.params.join(", ") + ")";
        }
        if (this.type && !this.isConstructor) {
            if (this.type == "array") {
                memberLine += ": any[]";
            }
            else {
                memberLine += ": " + this.type;
            }
        }
        memberLine += ";";
        output.push(memberLine);
        return output.join("\n");
    }
}
exports.NamespaceMember = NamespaceMember;
class NamespaceList {
    constructor() {
        this.internal = {};
    }
    getNamespaceList() {
        let result = [];
        for (let ns in this.internal) {
            result.push(this.internal[ns]);
        }
        return result;
    }
    getNamespace(name, autocreate = true) {
        let match = this.internal[name];
        if (!match && autocreate) {
            match = new NamespaceDeclaration();
            match.name = name;
            this.internal[name] = match;
        }
        return match;
    }
}
exports.NamespaceList = NamespaceList;
class DtsMemberFactory {
    static fromMemberType(member) {
        const result = new NamespaceMember();
        result.type = member.valueType;
        result.params = member.parameters;
        result.comment = member.comment;
        result.name = member.name;
        result.isGlobal = member.type == "GlobalVar" || member.type == "GlobalFunction";
        switch (member.type) {
            case "GlobalVar":
            case "Property":
                result.isProp = true;
                result.isStatic = false;
                break;
            case "GlobalFunction":
            case "Method":
                result.isProp = false;
                result.isStatic = false;
                break;
            case "StaticMethod":
                result.isProp = false;
                result.isStatic = true;
                break;
            case "StaticProperty":
                result.isProp = true;
                result.isStatic = true;
                break;
            default:
                throw new Error("Unknown member type: " + member.type);
        }
        return result;
    }
}
exports.DtsMemberFactory = DtsMemberFactory;
