import { srcActivateVideoCamera } from "./src/srcActivateCamera.js";
import { srcDontTurnOffTheSite } from "./src/srcDontTurnOffTheSite.js";
import { srcFullScreenBtn } from "./src/srcFullScreenBtn.js";
import { videoElement } from "./src/srcDomCostants.js";
import srcVideoLogic from "./src/srcVideoLogic.js";

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
// const CONFIGURAZIONE = {
//   tolleranzaColori: {
//     GENERALE: 30,
//     get colori() {
//       return this.GENERALE;
//     },
//     get bianco() {
//       return 255 - this.GENERALE;
//     },
//     get nero() {
//       return this.GENERALE;
//     },
//   },
//   MIN_COLORED_RATIO: 8 / 100,
// };
