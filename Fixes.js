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
            existingComment = "//" + fixComment;
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
    applyMemberFixes(fix, member) {
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
                            member.comment = this.getFixComment(member.comment, fix.comment);
                        }
                        // In addition, if one item is optional, then the remaining items need to be optional too
                        forceSetOptional = true;
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
                        this.applyMemberFixes(fix, member);
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
