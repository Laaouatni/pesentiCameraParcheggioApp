import { FPS } from "./srcConfigCostants.js";
import srcFrameLogic from "./frameLogic/srcFrameLogic.js";
import { srcResizeVideoCanvas } from "./srcResizeVideoCanvas.js";

export let previousFrameArrayStringToSendToEsp32 = "";
export function updatePreviousFrameArrayStringToSendToEsp32(newValue) {
  previousFrameArrayStringToSendToEsp32 = newValue;
}

/**
 *
 * @param {WebSocket} ws
 * @param {CanvasRenderingContext2D} ctx
 */
function srcVideoLogic(ws, ctx) {
  previousFrameArrayStringToSendToEsp32 = "";
  srcResizeVideoCanvas();

  setInterval(() => {
    srcFrameLogic(ws, ctx);
  }, 1000 / FPS);
}

export { srcVideoLogic };
