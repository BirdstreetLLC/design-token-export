// import figma types
enum VariableResolvedDataEnum {
  STRING = 'STRING',
  COLOR = 'COLOR',
  BOOLEAN = 'BOOLEAN',
  FLOAT = 'FLOAT',
}

function rgbToHex({ r, g, b, a } = { r: 0, g: 0, b: 0, a: 1 }) {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)];
  if (a !== 1) {
    hex.push(toHex(a));
  }
  return `#${hex.join("")}`;
}

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

