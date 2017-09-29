class RenderUtils {
    static formatComment(indent: string, commentBlock: string): string {
        let splits = commentBlock.split("\n");
        if (splits.length == 1) {
            return indent + "/* " + splits[0] + " */";
        } else {
            splits[0] = "/*" + splits[0];
            splits.push("*/");

            return splits.map(s => indent + s).join("\n");
        }
    }
}
export class NamespaceDeclaration {
    extendsObject: any;
    comment: string;
    members: NamespaceMember[] = [];
    name: string;

    classOrInterface = "class";

    addMember(member: NamespaceMember) {
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
                } else {
                    if (a.name.startsWith("_") && !b.name.startsWith("_")) {
                        return -1;
                    } else if (!a.name.startsWith("_") && b.name.startsWith("_")) {
                        return 1;
                    }

                    return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
                }
            } else {
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
            } else {
                output.push(`declare ${this.classOrInterface} ${this.name} {`);
            }
        }

        this.members.forEach(member => {
            if (this.classOrInterface == "interface" && member.isStatic) {
                member.isStatic = false;
            }

            if (!this.isGlobal) {
                output.push(member.buildOutput("    "));
            } else {
                output.push(member.buildOutput(""));
            }
        });

        if (!this.isGlobal) {
            output.push("}");
        }

        return output.join("\n");
    }
}

export class NamespaceMember {
    comment: string;
    type: string;
    name: string;
    params: string[] = [];
    isStatic = false;
    isProp = false;
    isGlobal = false;
    get isConstructor() {
        return this.isProp == false && this.name == "constructor";
    }
    buildOutput(indent: string) {
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
            } else {
                memberLine += ": " + this.type;
            }
        }

        memberLine += ";";

        output.push(memberLine);

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

export class DtsMemberFactory {
    static fromMemberType(member: MemberType): NamespaceMember {
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
