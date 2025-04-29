/**
 * @type {HTMLVideoElement}
 */
export const videoElement = document.getElementById("videoElement");
/**
 * @type {HTMLCanvasElement}
 */
export const canvasElement = document.getElementById("canvasElement");
/**
 * @type {HTMLButtonElement}
 */
export const btnRoutaSchermo = document.getElementById("btnRoutaSchermo");

export const parkingItems = document.querySelectorAll(".parkingItem");
export const parkingViewElement = document.getElementById("parkingViewElement");

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
