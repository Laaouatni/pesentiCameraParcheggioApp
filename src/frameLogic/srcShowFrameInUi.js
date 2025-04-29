import { canvasElement, videoElement } from "../srcDomCostants.js";

function srcShowImageInUi(ctx) {
  if (!canvasElement) throw new Error("canvasElement is not defined");
  if (!videoElement) throw new Error("videoElement is not defined");
  if (!ctx) throw new Error("ctx is not defined");

  ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
}

export { srcShowImageInUi };
