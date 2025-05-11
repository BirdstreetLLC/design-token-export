"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import figma types
var VariableResolvedDataEnum;
(function (VariableResolvedDataEnum) {
    VariableResolvedDataEnum["STRING"] = "STRING";
    VariableResolvedDataEnum["COLOR"] = "COLOR";
    VariableResolvedDataEnum["BOOLEAN"] = "BOOLEAN";
    VariableResolvedDataEnum["FLOAT"] = "FLOAT";
})(VariableResolvedDataEnum || (VariableResolvedDataEnum = {}));
function rgbToHex({ r, g, b, a } = { r: 0, g: 0, b: 0, a: 1 }) {
    const toHex = (value) => {
        const hex = Math.round(value * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    const hex = [toHex(r), toHex(g), toHex(b)];
    if (a !== 1) {
        hex.push(toHex(a));
    }
    return `#${hex.join("")}`;
}
const getLocalVariableCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    const variableJSON = {};
    const colorVariables = yield figma.variables.getLocalVariablesAsync(VariableResolvedDataEnum.COLOR);
    yield Promise.all(colorVariables.map((colorVariable) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, valuesByMode } = yield figma.variables.getVariableByIdAsync(colorVariable.id);
        const modeIds = Object.keys(valuesByMode);
        const value = valuesByMode[modeIds[0]];
        if (typeof value.r === "number") {
            variableJSON[name] = rgbToHex({ r: value.r, g: value.g, b: value.b, a: value.a });
        }
    })));
    console.log(variableJSON);
});
getLocalVariableCollections();
//  figma.closePlugin();
