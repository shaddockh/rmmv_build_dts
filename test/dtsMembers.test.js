"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const dtsMembers_1 = require("../src/dtsMembers");
describe("DtsMemberFactory", function () {
    it("should generate a static method from MemberType", function () {
        const mt = {
            name: "static",
            type: "StaticMethod"
        };
        const result = dtsMembers_1.DtsMemberFactory.fromMemberType(mt);
        chai_1.expect(result.isStatic).to.be.true;
    });
    it("should generate a static property from MemberType", function () {
        const mt = {
            name: "static",
            type: "StaticProperty"
        };
        const result = dtsMembers_1.DtsMemberFactory.fromMemberType(mt);
        chai_1.expect(result.isStatic).to.be.true;
    });
    it("should generate an instance property from MemberType", function () {
        const mt = {
            name: "instance",
            type: "Property"
        };
        const result = dtsMembers_1.DtsMemberFactory.fromMemberType(mt);
        chai_1.expect(result.isStatic).to.be.false;
    });
    it("should generate an instance method from MemberType", function () {
        const mt = {
            name: "instance",
            type: "Method"
        };
        const result = dtsMembers_1.DtsMemberFactory.fromMemberType(mt);
        chai_1.expect(result.isStatic).to.be.false;
    });
});
describe("NamespaceDeclaration", function () {
    it("should sort properly", function () {
        let nsd = new dtsMembers_1.NamespaceDeclaration();
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "method",
            type: "Method"
        }));
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "_privateProp",
            type: "Property"
        }));
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "prop",
            type: "Property"
        }));
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "staticMethod",
            type: "StaticMethod"
        }));
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "_staticProp",
            type: "StaticProperty"
        }));
        nsd.sort();
        const names = [];
        nsd.members.forEach(m => names.push(m.name));
        chai_1.expect(names.join(",")).to.equal("_staticProp,_privateProp,prop,staticMethod,method");
    });
    it("should sort properly with duplicates", function () {
        let nsd = new dtsMembers_1.NamespaceDeclaration();
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "_staticProp",
            type: "StaticProperty"
        }));
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "method",
            type: "Method"
        }));
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "staticMethod",
            type: "StaticMethod"
        }));
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "_prop",
            type: "Property"
        }));
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "staticMethod",
            type: "StaticMethod"
        }));
        nsd.addMember(dtsMembers_1.DtsMemberFactory.fromMemberType({
            name: "_staticProp",
            type: "StaticProperty"
        }));
        nsd.sort();
        const names = [];
        nsd.members.forEach(m => names.push(m.name));
        chai_1.expect(names.join(",")).to.equal("_staticProp,_staticProp,_prop,staticMethod,staticMethod,method");
    });
});
