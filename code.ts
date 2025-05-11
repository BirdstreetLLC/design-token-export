// import figma types
import { rgbToHex } from "./utils/rgbToHex";
import { VariableResolvedDataEnum } from "./types/types";

const getLocalVariableCollections = async () => {
    const variableJSON = {} as Record<string, string>;

    const colorVariables = await figma.variables.getLocalVariablesAsync(VariableResolvedDataEnum.COLOR);

    await Promise.all(
      colorVariables.map(async (colorVariable) => {
        const { name, valuesByMode } = await figma.variables.getVariableByIdAsync(colorVariable.id) as any;
        const modeIds = Object.keys(valuesByMode);
        const value = valuesByMode[modeIds[0]];
        if (typeof value.r === "number") {
          variableJSON[name] = rgbToHex({ r: value.r, g: value.g, b: value.b, a: value.a });
        }
      })
    );

    console.log(variableJSON);
}

getLocalVariableCollections();

figma.closePlugin();

