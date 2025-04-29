import { canvasElement } from "./srcDomCostants.js";

function srcCreateCtx() {
  if (!canvasElement) throw new Error("canvasElement is not defined");

  const ctx = canvasElement.getContext("2d", {
    alpha: false,
    willReadFrequently: true,
  });

  return ctx;
}

export { srcCreateCtx };
