import { srcShowImageInUi } from "./srcShowFrameInUi.js";
import { srcColorParkingItems } from "./srcColorParkingItems.js";
import { srcWebSocketSendingLogic } from "../srcWebSocketSendingLogic.js";

/**
 * @type {string[]}
 */
export let thisFrameArrayToSendToEsp32 = [];

export function updateThisFrameArrayValueToSendToEsp32AtIndex(index,value) {
  thisFrameArrayToSendToEsp32[index] = value;
}

/**
 *
 * @param {WebSocket} ws
 * @param {CanvasRenderingContext2D} ctx
 */
function srcFrameLogic(ws, ctx) {
  thisFrameArrayToSendToEsp32 = [];
  srcShowImageInUi(ctx);
  srcColorParkingItems(ctx);
  srcWebSocketSendingLogic(ws);
}

export default srcFrameLogic;
