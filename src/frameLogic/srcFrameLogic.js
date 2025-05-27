import { srcShowImageInUi } from "./srcShowFrameInUi.js";
import { srcColorParkingItems } from "./srcColorParkingItems.js";
import { srcWebSocketSendingLogic } from "../srcWebSocketSendingLogic.js";

/**
 * @type {Object.<string, Array<string>>}
 */
export let thisFrameArrayToSendToEsp32 = {
  parkingItem: [],
  cancelloItem: [],
};

export function updateThisFrameArrayValueToSendToEsp32AtIndex(itemName,index,value) {
  thisFrameArrayToSendToEsp32[itemName][index] = value;
}

/**
 *
 * @param {WebSocket} ws
 * @param {CanvasRenderingContext2D} ctx
 */
function srcFrameLogic(ws, ctx) {
  thisFrameArrayToSendToEsp32 = {
    parkingItem: [],
    cancelloItem: [],
  };
  srcShowImageInUi(ctx);
  srcColorParkingItems(ctx);
  srcWebSocketSendingLogic(ws);
}

export default srcFrameLogic;
