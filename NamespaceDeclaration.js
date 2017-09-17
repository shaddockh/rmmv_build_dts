"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NamespaceDeclaration {
    constructor() {
        this.members = [];
        this.classOrInterface = "class";
    }
    buildOutput() {
        // first build out the interface, then the class
        let output = [];
        if (this.comment) {
            output.push(this.comment);
        }
        if (this.extendsObject) {
            output.push(`declare ${this.classOrInterface} ${this.name} extends ${this.extendsObject} {`);
        }
        else {
            output.push(`declare ${this.classOrInterface} ${this.name} {`);
        }
        this.members.forEach(member => {
            if (this.classOrInterface == "interface" && member.isStatic) {
                member.isStatic = false;
            }
            output.push(member.buildOutput("\t"));
        });
        output.push("}\n\n");
        return output.join("\n");
    }
}
exports.NamespaceDeclaration = NamespaceDeclaration;
class NamespaceMember {
    constructor() {
        this.params = [];
        this.isStatic = false;
        this.isProp = false;
    }
    buildOutput(indent) {
        let output = [];
        if (this.comment) {
            output.push("");
            output.push(this.comment);
        }
        if (this.isProp) {
            output.push(indent + (this.isStatic ? "static " : "") + this.name + ";");
        }
        else {
            output.push(indent + (this.isStatic ? "static " : "") + this.name + "(" + this.params.join(", ") + ");");
        }
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
