import srcVideoLogic from "./src/srcVideoLogic.js";
import { videoElement } from "./src/srcDomCostants.js";
import { srcFullScreenBtn } from "./src/srcFullScreenBtn.js";
import { srcActivateVideoCamera } from "./src/srcActivateCamera.js";
import { srcDontTurnOffTheSite } from "./src/srcDontTurnOffTheSite.js";

const ws = new WebSocket("wss://pesentiws-43f6274c0f11.herokuapp.com/");

ws.addEventListener("close", () => {
  window.location.reload();
});

srcFullScreenBtn();
srcDontTurnOffTheSite();
srcActivateVideoCamera();

videoElement.addEventListener("playing", () => {
  srcVideoLogic();
});

// const parkingViewElementStyles = parkingViewElement.getBoundingClientRect();
// const parkingItems = document.querySelectorAll(".parkingItem");

