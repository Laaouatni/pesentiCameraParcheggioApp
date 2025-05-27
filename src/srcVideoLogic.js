import { FPS } from "./srcConfigCostants.js";
import srcFrameLogic from "./frameLogic/srcFrameLogic.js";
import { srcResizeVideoCanvas } from "./srcResizeVideoCanvas.js";

export let previousFrameArrayStringToSendToEsp32 = {
  parkingItem: "",
  cancelloItem: "",
};
export function updatePreviousFrameArrayStringToSendToEsp32(
  itemName,
  newValue,
) {
  previousFrameArrayStringToSendToEsp32[itemName] = newValue;
}

/**
 *
 * @param {WebSocket} ws
 * @param {CanvasRenderingContext2D} ctx
 */
function srcVideoLogic(ws, ctx) {
  previousFrameArrayStringToSendToEsp32 = {
    parkingItem: "",
    cancelloItem: "",
  };
  srcResizeVideoCanvas();

  setInterval(() => {
    srcFrameLogic(ws, ctx);
  }, 1000 / FPS);
}

export { srcVideoLogic };
