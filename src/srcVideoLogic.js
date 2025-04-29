import { FPS } from "./srcConfigCostants";
import { canvasElement, parkingViewElement } from "./srcDomCostants";
import srcFrameLogic from "./srcFrameLogic";

function srcVideoLogic() {
  if (!parkingViewElement) throw new Error("parkingViewElement is not defined");

  canvasElement.width = parkingViewElement.clientWidth;
  canvasElement.height = parkingViewElement.clientHeight;

  setInterval(() => {
    srcFrameLogic();
  }, 1000 / FPS)
}

export default srcVideoLogic;
