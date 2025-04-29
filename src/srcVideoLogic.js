import { FPS } from "./srcConfigCostants.js";
import { canvasElement, parkingViewElement } from "./srcDomCostants.js";
import srcFrameLogic from "./srcFrameLogic.js";

function srcVideoLogic() {
  if (!parkingViewElement) throw new Error("parkingViewElement is not defined");

  canvasElement.width = parkingViewElement.clientWidth;
  canvasElement.height = parkingViewElement.clientHeight;

  setInterval(() => {
    srcFrameLogic();
  }, 1000 / FPS)
}

export default srcVideoLogic;
