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
  if (!ctx) throw new Error("ctx is not defined");
  
  srcVideoLogic(ws, ctx);
});

