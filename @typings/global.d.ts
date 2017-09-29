declare interface MemberType {
    name: string;
    type: "GlobalVar" | "GlobalFunction" | "StaticProperty" | "StaticMethod" | "Property" | "Method" | "Constructor";
    namespace?: string;
    comment?: string;
    valueType?: string;
    parameters?: string[];
}
