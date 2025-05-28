import { canvasElement, parkingViewElement } from "./srcDomCostants.js";

function srcResizeVideoCanvas() {
  if (!canvasElement) throw new Error("canvasElement is not defined");
  if (!parkingViewElement) throw new Error("parkingViewElement is not defined");

  canvasElement.width = parkingViewElement.clientWidth;
  canvasElement.height = parkingViewElement.clientHeight;
}

export { srcResizeVideoCanvas };
