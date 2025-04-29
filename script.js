import srcVideoLogic from "./src/srcVideoLogic.js";
import { videoElement } from "./src/srcDomCostants.js";
import { srcFullScreenBtn } from "./src/srcFullScreenBtn.js";
import { srcActivateVideoCamera } from "./src/srcActivateCamera.js";
import { srcDontTurnOffTheSite } from "./src/srcDontTurnOffTheSite.js";
import { srcCreateWebSocketClient } from "./src/srcCreateWebSocketClient.js";

const ws = srcCreateWebSocketClient();

srcFullScreenBtn();
srcDontTurnOffTheSite();
srcActivateVideoCamera();

videoElement.addEventListener("playing", () => {
  srcVideoLogic(ws);
});

// const parkingViewElementStyles = parkingViewElement.getBoundingClientRect();
// const parkingItems = document.querySelectorAll(".parkingItem");

