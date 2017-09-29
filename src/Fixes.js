"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FixHandler {
    getFixComment(existingComment, fixComment) {
        if (existingComment) {
            if (fixComment) {
                existingComment += "\n//" + fixComment;
            }
        }
        else {
            if (fixComment) {
                existingComment += "//" + fixComment;
            }
        }
        return existingComment;
    }
    applyNamespaceFixes(fix, decl) {
        switch (fix.action) {
            case "remove-extends" /* RemoveClassExtends */:
                console.log("Removing parent class reference: " + decl.name);
                decl.extendsObject = null;
                decl.comment = this.getFixComment(decl.comment, fix.comment);
                break;
            case "convert-to-interface" /* ConvertToInterface */:
                console.log("Changing class to interface: " + decl.name);
                decl.classOrInterface = "interface";
                decl.comment = this.getFixComment(decl.comment, fix.comment);
                break;
            case "static-class" /* StaticClass */:
                console.log("Changing class to static: " + decl.name);
                decl.members.forEach(member => (member.isStatic = true));
                decl.comment = this.getFixComment(decl.comment, fix.comment);
                break;
        }
    }
    applyMemberFixes(fix, member, decl) {
        switch (fix.action) {
            case "comment-out" /* CommentOut */:
                console.log("Commenting out member: " + member.name);
                member.name = "//" + member.name;
                member.comment = this.getFixComment(member.comment, fix.comment);
                break;
            case "set-optional-param" /* SetOptionalParam */:
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
            case "rename-member" /* RenameMember */:
                console.log("Renaming member: " + member.name + " to " + fix.replacementName);
                member.name = fix.replacementName;
                member.comment = this.getFixComment(member.comment, fix.comment);
                break;
            case "static-method" /* StaticMethod */:
                console.log("Changing method to static: " + member.name);
                member.isStatic = true;
                member.comment = this.getFixComment(member.comment, fix.comment);
                break;
            case "set-param-type" /* SetParamType */:
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
            case "set-member-type" /* SetMemberType */:
                console.log("Setting member type to: " + member.name + " - " + fix.type);
                member.comment = this.getFixComment(member.comment, fix.comment);
                member.type = fix.type;
                break;
            case "apply-constructor-comment-to-class" /* ApplyConstructorCommentToClass */:
                if (!decl.comment) {
                    console.log("Moving constructor comment to class: " + decl.name);
                    decl.comment = member.comment;
                    member.comment = null;
                }
                break;
            case "copy-params-to-constructor" /* CopyParamsToConstructor */:
                let index = decl.members.findIndex(m => m.isConstructor);
                if (index > -1) {
                    console.log("Copying params to constructor from : " + decl.name);
                    decl.members[index].params = member.params.slice(0);
                }
                break;
        }
    }
    loadFixes(jsonFilename) {
        this.fixes = require(jsonFilename);
    }
    applyFixes(decl) {
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
            }
            else {
                this.applyNamespaceFixes(fix, decl);
            }
        });
    }
}
exports.FixHandler = FixHandler;
