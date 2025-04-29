function srcRgbToHex(rgb) {
  const hex = rgb
    .map((color) => {
      const hexColor = color.toString(16).padStart(2, "0");
      return hexColor;
    })
    .join("");
  return `#${hex}`;
}

export { srcRgbToHex };