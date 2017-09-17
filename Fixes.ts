import { NamespaceDeclaration, NamespaceMember } from "./NamespaceDeclaration";
export const enum FixAction {
    CommentOut = "comment-out",
    RemoveClassExtends = "remove-extends",
    SetOptionalParam = "set-optional-param",
    ConvertToInterface = "convert-to-interface",
    RenameMember = "rename-member",
    StaticClass = "static-class",
    StaticMethod = "static-method"
}

export interface Fix {
    className: string;
    memberName?: string;
    comment?: string;
    action: FixAction;
    paramName?: string;
    replacementName?: string;
}

export class FixHandler {
    fixes: Fix[];

    private getFixComment(existingComment: string, fixComment: string) {
        if (existingComment) {
            if (fixComment) {
                existingComment += "\n//" + fixComment;
            }
        } else {
            existingComment = "//" + fixComment;
        }

        return existingComment;
    }

    private applyNamespaceFixes(fix: Fix, decl: NamespaceDeclaration): any {
        switch (fix.action) {
            case FixAction.RemoveClassExtends:
                console.log("Removing parent class reference: " + decl.name);
                decl.extendsObject = null;
                decl.comment = this.getFixComment(decl.comment, fix.comment);
                break;

            case FixAction.ConvertToInterface:
                console.log("Changing class to interface: " + decl.name);
                decl.classOrInterface = "interface";
                decl.comment = this.getFixComment(decl.comment, fix.comment);
                break;

            case FixAction.StaticClass:
                console.log("Changing class to static: " + decl.name);
                decl.members.forEach(member => (member.isStatic = true));
                decl.comment = this.getFixComment(decl.comment, fix.comment);
                break;
        }
    }

    private applyMemberFixes(fix: Fix, member: NamespaceMember): any {
        switch (fix.action) {
            case FixAction.CommentOut:
                console.log("Commenting out member: " + member.name);
                member.name = "//" + member.name;
                member.comment = this.getFixComment(member.comment, fix.comment);
                break;

            case FixAction.SetOptionalParam:
                let forceSetOptional = false;
                for (let i = 0; i < member.params.length; i++) {
                    if (forceSetOptional || fix.paramName == "*" || member.params[i] == fix.paramName) {
                        if (!member.params[i].endsWith("?")) {
                            console.log("Setting optional param: " + member.name + " " + member.params[i]);
                            member.params[i] += "?";
                            member.comment = this.getFixComment(member.comment, fix.comment);
                        }

                        // In addition, if one item is optional, then the remaining items need to be optional too
                        forceSetOptional = true;
                    }
                }
                break;

            case FixAction.RenameMember:
                console.log("Renaming member: " + member.name + " to " + fix.replacementName);
                member.name = fix.replacementName;
                member.comment = this.getFixComment(member.comment, fix.comment);
                break;

            case FixAction.StaticMethod:
                console.log("Changing method to static: " + member.name);
                member.isStatic = true;
                member.comment = this.getFixComment(member.comment, fix.comment);
                break;
        }
    }

    loadFixes(jsonFilename: string) {
        this.fixes = require(jsonFilename);
    }
    applyFixes(decl: NamespaceDeclaration) {
        this.fixes.forEach(fix => {
            if (decl.name != fix.className && fix.className != "*") {
                return;
            }

            if (fix.memberName) {
                decl.members.forEach(member => {
                    if (fix.memberName == "*" || member.name == fix.memberName) {
                        this.applyMemberFixes(fix, member);
                    }
                });
            } else {
                this.applyNamespaceFixes(fix, decl);
            }
        });
    }
}