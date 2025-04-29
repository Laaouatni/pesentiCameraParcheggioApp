import { canvasElement } from "./srcDomCostants.js";

if (!canvasElement) throw new Error("canvasElement is not defined");

const ctx = canvasElement.getContext("2d", {
  alpha: false,
  willReadFrequently: true,
});

export { ctx };
