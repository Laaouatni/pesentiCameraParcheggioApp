import { srcRgbToHex } from "./srcRgbToHex.js";
import { srcHexToRgb } from "./srcHexToRgb.js";

import {
  REFERENCE_COLOR_BLACK,
  updateReferenceColorBlack,
  REFERENCE_COLOR_WHITE,
  updateReferenceColorWhite,
} from "./srcConfigCostants.js";

/**
 * @type {Record<string, {input: HTMLInputElement, text: HTMLSpanElement, values: {default: number[], update: function}}>}
 */
export const domColorInputs = {
  black: {
    input: document.getElementById("blackColorInput"),
    text: document.getElementById("blackColorInputText"),
    values: {
      default: REFERENCE_COLOR_BLACK,
      update: updateReferenceColorBlack,
    },
  },
  white: {
    input: document.getElementById("whiteColorInput"),
    text: document.getElementById("whiteColorInputText"),
    values: {
      default: REFERENCE_COLOR_WHITE,
      update: updateReferenceColorWhite,
    },
  },
};

function srcUpdateColorInputsDinamically() {
  const allColorInputObjects = Object.values(domColorInputs);

  allColorInputObjects.forEach((colorInputObject) => {
    const { input, text } = colorInputObject;
    if (!input) throw new Error("input is not defined");
    if (!text) throw new Error("text is not defined");

    input.value = srcRgbToHex(colorInputObject.values.default);
    const [defaultR, defaultG, defaultB] = colorInputObject.values.default;
    text.innerText = `${defaultR}, ${defaultG}, ${defaultB}`;

    input.addEventListener("input", () => {
      const thisInputValue = input.value;
      const [R, G, B] = srcHexToRgb(thisInputValue);
      text.innerText = `${R}, ${G}, ${B}`;
      colorInputObject.values.update([R, G, B]);
    });
  });
}

export { srcUpdateColorInputsDinamically };
