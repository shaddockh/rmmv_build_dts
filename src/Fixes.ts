import { NamespaceDeclaration, NamespaceMember } from "./dtsMembers";
export const enum FixAction {
    CommentOut = "comment-out",
    RemoveClassExtends = "remove-extends",
    SetOptionalParam = "set-optional-param",
    SetParamType = "set-param-type",
    ConvertToInterface = "convert-to-interface",
    Rename = "rename",
    StaticClass = "static-class",
    StaticMethod = "static-method",
    SetMemberType = "set-member-type",
    ApplyConstructorCommentToClass = "apply-constructor-comment-to-class",
    CopyParamsToConstructor = "copy-params-to-constructor"
}

export interface Fix {
    className: string;
    memberName?: string;
    comment?: string;
    action: FixAction;
    paramName?: string;
    type?: string;
    replacementName?: string;

    batch?: any[];
}

export class FixHandler {
    fixes: Fix[];

    private getFixComment(existingComment: string, fixComment: string) {
        if (existingComment) {
            if (fixComment) {
                existingComment += "\n//" + fixComment;
            }
        } else {
            if (fixComment) {
                existingComment += "//" + fixComment;
            }
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

            case FixAction.Rename:
                console.log("Renaming: " + decl.name + " to " + fix.replacementName);
                decl.name = fix.replacementName;
                decl.comment = this.getFixComment(decl.comment, fix.comment);
                break;
        }
    }

    private applyMemberFixes(fix: Fix, member: NamespaceMember, decl: NamespaceDeclaration): any {
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
                        }

                        // In addition, if one item is optional, then the remaining items need to be optional too
                        forceSetOptional = true;
                    }

                    if (forceSetOptional) {
                        member.comment = this.getFixComment(member.comment, fix.comment);
                    }
                }
                break;

            case FixAction.Rename:
                console.log("Renaming member: " + member.name + " to " + fix.replacementName);
                member.name = fix.replacementName;
                member.comment = this.getFixComment(member.comment, fix.comment);
                break;

            case FixAction.StaticMethod:
                console.log("Changing method to static: " + member.name);
                member.isStatic = true;
                member.comment = this.getFixComment(member.comment, fix.comment);
                break;

            case FixAction.SetParamType:
                let isSet = false;
                for (let i = 0; i < member.params.length; i++) {
                    if (fix.paramName == "*" || member.params[i] == fix.paramName) {
                        if (member.params[i].indexOf(":") == -1) {
                            console.log("Setting param type: " + member.name + " " + member.params[i] + ":" + fix.type);

                            isSet = true;
                            member.params[i] += ": " + fix.type;
                        }
                    }
                }

                if (isSet) {
                    member.comment = this.getFixComment(member.comment, fix.comment);
                }
                break;

            case FixAction.SetMemberType:
                console.log("Setting member type to: " + member.name + " - " + fix.type);
                member.comment = this.getFixComment(member.comment, fix.comment);
                member.type = fix.type;
                break;

            case FixAction.ApplyConstructorCommentToClass:
                if (!decl.comment) {
                    console.log("Moving constructor comment to class: " + decl.name);
                    decl.comment = member.comment;
                    member.comment = null;
                }
                break;

            case FixAction.CopyParamsToConstructor:
                let index = decl.members.findIndex(m => m.isConstructor);
                if (index > -1) {
                    console.log("Copying params to constructor from : " + decl.name);
                    decl.members[index].params = member.params.slice(0);
                }
                break;
        }
    }

    loadFixes(jsonFilename: string) {
        this.fixes = require(jsonFilename);

        // Now scan through and expand the batches if we have any
        let batches = this.fixes.filter(f => (f.batch ? true : false));

        // Remove the batches from the fix list
        this.fixes = this.fixes.filter(f => (f.batch ? false : true));

        batches.forEach(b => {
            b.batch.forEach(e => {
                const newFix = Object.assign({}, b);
                delete newFix.batch;

                for (let prop in e) {
                    newFix[prop] = e[prop];
                }

                this.fixes.push(newFix);
            });
        });
    }

    applyFixes(decl: NamespaceDeclaration) {
        this.fixes.forEach(fix => {
            if (decl.name != fix.className && fix.className != "*") {
                return;
            }

            if (fix.memberName) {
                decl.members.forEach(member => {
                    if (fix.memberName == "*" || member.name == fix.memberName) {
                        this.applyMemberFixes(fix, member, decl);
                    }
                });
            } else {
                this.applyNamespaceFixes(fix, decl);
            }
        });
    }
}
