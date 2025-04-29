import { FPS } from "./srcConfigCostants.js";
import srcFrameLogic from "./srcFrameLogic.js";
import { srcResizeVideoCanvas } from "./srcResizeVideoCanvas.js";

function srcVideoLogic(ws) {
  srcResizeVideoCanvas();

  //   let previousFrameArrayToSendToEsp32String = "";


  setInterval(() => {
    srcFrameLogic(ws);
  }, 1000 / FPS)
}

export default srcVideoLogic;
