import { parkingViewElement } from "./srcDomCostants.js";
import { videoElement } from "./srcDomCostants.js";

function srcActivateVideoCamera() {
  if (!parkingViewElement) throw new Error("parkingViewElement is not defined");

  // Add a small delay to ensure DOM is fully stable
  setTimeout(() => {
    try {
      // Get dimensions and calculate aspect ratio
      const width = parkingViewElement.clientWidth;
      const height = parkingViewElement.clientHeight;
      const aspectRatio = width / height;

      // Ensure we have valid dimensions
      if (!width || !height || !isFinite(aspectRatio)) {
        console.error("Invalid dimensions:", { width, height, aspectRatio });
        return;
      }

      const constraints = {
        video: {
          facingMode: "environment",
          aspectRatio: {
            exact: aspectRatio,
          },
        },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (!videoElement) throw new Error("videoElement is not defined");
          videoElement.srcObject = stream;
        })
        .catch((error) => {
          console.error("Failed to start camera:", error.name, error.message);
          // Try again with basic constraints if first attempt fails
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              if (!videoElement) throw new Error("videoElement is not defined");
              videoElement.srcObject = stream;
            })
            .catch((fallbackError) => {
              console.error(
                "Camera fallback also failed:",
                fallbackError.name,
                fallbackError.message,
              );
            });
        });
    } catch (error) {
      console.error("Critical error during camera initialization:", error);
    }
  }, 100);
}

export { srcActivateVideoCamera };
