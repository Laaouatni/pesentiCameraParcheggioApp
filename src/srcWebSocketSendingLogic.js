import { thisFrameArrayToSendToEsp32 } from "./frameLogic/srcFrameLogic.js";
import {
  previousFrameArrayStringToSendToEsp32,
  updatePreviousFrameArrayStringToSendToEsp32,
} from "./srcVideoLogic.js";

function srcWebSocketSendingLogic(ws) {
  const isWebSocketConnected = ws.readyState === WebSocket.OPEN;
  if (!isWebSocketConnected) return;

  console.log(thisFrameArrayToSendToEsp32);

  const thisFrameArrayToSendToEsp32String =
    `slotsCameraInput:${thisFrameArrayToSendToEsp32["parkingItem"].join(",")}`;
  const canSend =
    thisFrameArrayToSendToEsp32String != previousFrameArrayStringToSendToEsp32;

  if (!canSend) return;

  ws.send(thisFrameArrayToSendToEsp32String);
  updatePreviousFrameArrayStringToSendToEsp32(thisFrameArrayToSendToEsp32String);
}

export { srcWebSocketSendingLogic };
