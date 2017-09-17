export class NamespaceDeclaration {
    extendsObject: any;
    comment: string;
    members: NamespaceMember[] = [];
    name: string;

    classOrInterface = "class";

    buildOutput() {
        // first build out the interface, then the class
        let output = [];

        if (this.comment) {
            output.push(this.comment);
        }

        if (this.extendsObject) {
            output.push(`declare ${this.classOrInterface} ${this.name} extends ${this.extendsObject} {`);
        } else {
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

export class NamespaceMember {
    comment: string;
    name: string;
    params: string[] = [];
    isStatic = false;
    isProp = false;
    buildOutput(indent: string) {
        let output = [];
        if (this.comment) {
            output.push("");
            output.push(this.comment);
        }

        if (this.isProp) {
            output.push(indent + (this.isStatic ? "static " : "") + this.name + ";");
        } else {
            output.push(indent + (this.isStatic ? "static " : "") + this.name + "(" + this.params.join(", ") + ");");
        }

        return output.join("\n");
    }
}

export class NamespaceList {
    private internal = {};

    getNamespaceList() {
        let result: NamespaceDeclaration[] = [];
        for (let ns in this.internal) {
            result.push(this.internal[ns]);
        }

        return result;
    }

    getNamespace(name: string, autocreate = true): NamespaceDeclaration {
        let match = this.internal[name];
        if (!match && autocreate) {
            match = new NamespaceDeclaration();
            match.name = name;
            this.internal[name] = match;
        }

        return match;
    }
}
