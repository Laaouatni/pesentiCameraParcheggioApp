import { parkingViewElement } from "./srcDomCostants.js";
import { videoElement } from "./srcDomCostants.js";

function srcActivateVideoCamera() {
  if (!parkingViewElement) throw new Error("parkingViewElement is not defined");
  
  navigator.mediaDevices
  .getUserMedia({
    video: {
      facingMode: "environment",
      aspectRatio:
      parkingViewElement.clientWidth / parkingViewElement.clientHeight,
    },
  })
  .then(async (stream) => {
      if (!videoElement) throw new Error("videoElement is not defined");
      videoElement.srcObject = stream;
    });
}

export { srcActivateVideoCamera };
