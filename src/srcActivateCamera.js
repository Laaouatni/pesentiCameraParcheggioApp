import { parkingViewElement } from "./srcDomCostants.js";
import { videoElement } from "./srcDomCostants.js";

function srcActivateVideoCamera() {
  if (!parkingViewElement) throw new Error("parkingViewElement is not defined");
  
  requestAnimationFrame(() => {
    const aspectRatio =
      parkingViewElement.clientWidth / parkingViewElement.clientHeight;
    const constraints = {
      video: {
        facingMode: "environment",
        ...(isFinite(aspectRatio) && aspectRatio > 0 ? { aspectRatio } : {}),
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(async (stream) => {
        if (!videoElement) throw new Error("videoElement is not defined");
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error("Failed to start camera:", error);
      });
  });
}

export { srcActivateVideoCamera };
