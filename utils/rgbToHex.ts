export const rgbToHex = ({ r, g, b, a } = { r: 0, g: 0, b: 0, a: 1 }) => {
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