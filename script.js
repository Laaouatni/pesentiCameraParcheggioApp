import srcVideoLogic from "./src/srcVideoLogic.js";
import { videoElement } from "./src/srcDomCostants.js";
import { srcFullScreenBtn } from "./src/srcFullScreenBtn.js";
import { srcActivateVideoCamera } from "./src/srcActivateCamera.js";
import { srcDontTurnOffTheSite } from "./src/srcDontTurnOffTheSite.js";
import { srcCreateWebSocketClient } from "./src/srcCreateWebSocketClient.js";
import { srcCreateCtx } from "./src/srcCreateCtx.js";

const ws = srcCreateWebSocketClient();
const ctx = srcCreateCtx();

srcFullScreenBtn();
srcDontTurnOffTheSite();
srcActivateVideoCamera();

videoElement.addEventListener("playing", () => {
  srcVideoLogic(ws, ctx);
});

// const parkingViewElementStyles = parkingViewElement.getBoundingClientRect();
// const parkingItems = document.querySelectorAll(".parkingItem");

