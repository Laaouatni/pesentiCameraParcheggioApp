import { REFERENCE_COLOR_BLACK } from "./srcConfigCostants.js";
import { REFERENCE_COLOR_WHITE } from "./srcConfigCostants.js";

/**
 * @type {Record<string, {input: HTMLInputElement, text: HTMLSpanElement}>}
 */
export const domColorInputs = {
  black: {
    input: document.getElementById("blackColorInput"),
    text: document.getElementById("blackColorInputText"),
  },
  white: {
    input: document.getElementById("whiteColorInput"),
    text: document.getElementById("whiteColorInputText"),
  },
};

/**
 * @type {{input: HTMLInputElement, text: HTMLSpanElement}}
 */
export const inputConfigTolleranza = {
  input: document.getElementById("inputConfigTolleranza"),
  text: document.getElementById("inputConfigTolleranzaText"),
};


function srcUpdateValueConfigInputs() {
  srcUpdateColorInputsDinamically();
  srcUpdateTolleranzaInputsDinamically();
  
  const { input, text } = inputConfigTolleranza;
  if (!input) throw new Error("input is not defined");
  if (!text) throw new Error("text is not defined");

  text.innerText = `${input.value}`;
  const thisInputValue = input.value;
}

function srcUpdateColorInputsDinamically() {
  const allColorInputObjects = Object.values(domColorInputs);

  allColorInputObjects.forEach((colorInputObject, colorInputIndex) => {
    const { input, text } = colorInputObject;
    if (!input) throw new Error("input is not defined");
    if (!text) throw new Error("text is not defined");


    
    // if(colorInputIndex === 0) {
    //   input.value = `#${REFERENCE_COLOR_BLACK.toString(16).padStart(2, "0")}${REFERENCE_COLOR_BLACK.toString(16).padStart(2, "0")}${REFERENCE_COLOR_BLACK.toString(16).padStart(2, "0")}`;
    // }
    // if (colorInputIndex === 1) {
    //   input.value = `#${REFERENCE_COLOR_WHITE.toString(16).padStart(2, "0")}${REFERENCE_COLOR_WHITE.toString(16).padStart(2, "0")}${REFERENCE_COLOR_WHITE.toString(16).padStart(2, "0")}`;
    // }

    input.addEventListener("input", () => {
      const thisInputValue = input.value;
      const R = parseInt(thisInputValue.slice(1, 3), 16);
      const G = parseInt(thisInputValue.slice(3, 5), 16);
      const B = parseInt(thisInputValue.slice(5, 7), 16);
      text.innerText = `rgb(${R}, ${G}, ${B})`;
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
  });
}

export { srcUpdateValueConfigInputs };
