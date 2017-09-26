import { expect } from "chai";
import * as memberExtractors from "../memberExtractors";
import { DtsMemberFactory, NamespaceDeclaration } from "../dtsMembers";

describe("DtsMemberFactory", function() {
    it("should generate a static method from MemberType", function() {
        const mt: MemberType = {
            name: "static",
            type: "StaticMethod"
        };

        const result = DtsMemberFactory.fromMemberType(mt);
        expect(result.isStatic).to.be.true;
    });

    it("should generate a static property from MemberType", function() {
        const mt: MemberType = {
            name: "static",
            type: "StaticProperty"
        };

        const result = DtsMemberFactory.fromMemberType(mt);
        expect(result.isStatic).to.be.true;
    });

    it("should generate an instance property from MemberType", function() {
        const mt: MemberType = {
            name: "instance",
            type: "Property"
        };

        const result = DtsMemberFactory.fromMemberType(mt);
        expect(result.isStatic).to.be.false;
    });

    it("should generate an instance method from MemberType", function() {
        const mt: MemberType = {
            name: "instance",
            type: "Method"
        };

        const result = DtsMemberFactory.fromMemberType(mt);
        expect(result.isStatic).to.be.false;
    });
});

describe("NamespaceDeclaration", function() {
    it("should sort properly", function() {
        let nsd = new NamespaceDeclaration();

        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "method",
                type: "Method"
            })
        );
        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "_privateProp",
                type: "Property"
            })
        );
        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "prop",
                type: "Property"
            })
        );
        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "staticMethod",
                type: "StaticMethod"
            })
        );
        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "_staticProp",
                type: "StaticProperty"
            })
        );

        nsd.sort();
        const names = [];
        nsd.members.forEach(m => names.push(m.name));
        expect(names.join(",")).to.equal("_staticProp,_privateProp,prop,staticMethod,method");
    });
    it("should sort properly with duplicates", function() {
        let nsd = new NamespaceDeclaration();

        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "_staticProp",
                type: "StaticProperty"
            })
        );
        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "method",
                type: "Method"
            })
        );
        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "staticMethod",
                type: "StaticMethod"
            })
        );
        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "_prop",
                type: "Property"
            })
        );
        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "staticMethod",
                type: "StaticMethod"
            })
        );
        nsd.addMember(
            DtsMemberFactory.fromMemberType({
                name: "_staticProp",
                type: "StaticProperty"
            })
        );

        nsd.sort();
        const names = [];
        nsd.members.forEach(m => names.push(m.name));
        expect(names.join(",")).to.equal("_staticProp,_staticProp,_prop,staticMethod,staticMethod,method");
    });
});
