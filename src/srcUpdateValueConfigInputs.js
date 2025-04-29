import { REFERENCE_COLOR_BLACK, updateReferenceColorBlack } from "./srcConfigCostants.js";
import { REFERENCE_COLOR_WHITE, updateReferenceColorWhite } from "./srcConfigCostants.js";
import { DELTA_TOLLERANZA_COLORI, updateDeltaTolleranzaColori } from "./srcConfigCostants.js";

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
    }

  },
  white: {
    input: document.getElementById("whiteColorInput"),
    text: document.getElementById("whiteColorInputText"),
    values: {
      default: REFERENCE_COLOR_WHITE,
      update: updateReferenceColorWhite,
    }
  },
};

/**
 * @type {{input: HTMLInputElement, text: HTMLSpanElement, values: {default: number, update: function}}}
 */
export const inputConfigTolleranza = {
  input: document.getElementById("inputConfigTolleranza"),
  text: document.getElementById("inputConfigTolleranzaText"),
  values: {
    default: DELTA_TOLLERANZA_COLORI,
    update: updateDeltaTolleranzaColori,
  },
};


function srcUpdateValueConfigInputs() {
  srcUpdateColorInputsDinamically();
  srcUpdateTolleranzaInputsDinamically();
}

function srcUpdateColorInputsDinamically() {
  const allColorInputObjects = Object.values(domColorInputs);

  allColorInputObjects.forEach((colorInputObject, colorInputIndex) => {
    const { input, text } = colorInputObject;
    if (!input) throw new Error("input is not defined");
    if (!text) throw new Error("text is not defined");

    input.value = rgbToHex(colorInputObject.values.default);
    const [defaultR, defaultG, defaultB] = colorInputObject.values.default;
    text.innerText = `${defaultR}, ${defaultG}, ${defaultB}`;

    input.addEventListener("input", () => {
      const thisInputValue = input.value;
      const [R, G, B] = hexToRgb(thisInputValue);
      text.innerText = `${R}, ${G}, ${B}`;
      colorInputObject.values.update([R, G, B]);
    });
  });
}

function srcUpdateTolleranzaInputsDinamically() {
  const { input, text } = inputConfigTolleranza;
  if (!input) throw new Error("input is not defined");
  if (!text) throw new Error("text is not defined");

  input.addEventListener("input", () => {
    const thisInputValue = input.value;
    text.innerText = `${thisInputValue}`;
    inputConfigTolleranza.values.update(Number(thisInputValue));
  });
}

function rgbToHex(rgb) {
  const hex = rgb
    .map((color) => {
      const hexColor = color.toString(16).padStart(2, "0");
      return hexColor;
    })
    .join("");
  return `#${hex}`;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

export { srcUpdateValueConfigInputs };
