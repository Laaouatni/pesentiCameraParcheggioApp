import { srcShowImageInUi } from "./srcShowFrameInUi.js";
import { srcColorParkingItems } from "./srcColorParkingItems.js";

/**
 *
 * @param {WebSocket} ws
 * @param {CanvasRenderingContext2D} ctx
 */
function srcFrameLogic(ws, ctx) {
  srcShowImageInUi(ctx);
  srcColorParkingItems(ctx);

  // let thisFrameArrayToSendToEsp32 = [];

  //     const isWSconnected = ws.readyState === WebSocket.OPEN;
  //     (() => {
  //       if (!isWSconnected) return;
  //       const thisFrameArrayToSendToEsp32String =
  //         thisFrameArrayToSendToEsp32.join(",");
  //       const canSend =
  //         thisFrameArrayToSendToEsp32String !=
  //         previousFrameArrayToSendToEsp32String;
  //       if (!canSend) return;
  //       ws.send(thisFrameArrayToSendToEsp32String);
  //       previousFrameArrayToSendToEsp32String = thisFrameArrayToSendToEsp32String;
  //     })();
}

export default srcFrameLogic;
