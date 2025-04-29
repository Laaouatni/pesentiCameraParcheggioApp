import { FPS } from "./srcConfigCostants.js";
import srcFrameLogic from "./frameLogic/srcFrameLogic.js";
import { srcResizeVideoCanvas } from "./srcResizeVideoCanvas.js";

/**
 *
 * @param {WebSocket} ws
 * @param {CanvasRenderingContext2D} ctx
 */
function srcVideoLogic(ws, ctx) {
  srcResizeVideoCanvas();

  //   let previousFrameArrayToSendToEsp32String = "";

  setInterval(() => {
    srcFrameLogic(ws, ctx);
  }, 1000 / FPS);
}

export default srcVideoLogic;
