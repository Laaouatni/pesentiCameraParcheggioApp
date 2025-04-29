import {
  DELTA_TOLLERANZA_COLORI,
  updateDeltaTolleranzaColori,
} from "./srcConfigCostants.js";

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

function srcUpdateTolleranzaInputsDinamically() {
  const { input, text } = inputConfigTolleranza;
  if (!input) throw new Error("input is not defined");
  if (!text) throw new Error("text is not defined");

  input.value = String(inputConfigTolleranza.values.default);
  text.innerText = `${inputConfigTolleranza.values.default}`;

  input.addEventListener("input", () => {
    const thisInputValue = input.value;
    text.innerText = `${thisInputValue}`;
    inputConfigTolleranza.values.update(Number(thisInputValue));
  });
}

export { srcUpdateTolleranzaInputsDinamically };
