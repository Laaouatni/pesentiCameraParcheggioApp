import { thisFrameArrayToSendToEsp32 } from "./frameLogic/srcFrameLogic.js";
import {
  previousFrameArrayStringToSendToEsp32,
  updatePreviousFrameArrayStringToSendToEsp32,
} from "./srcVideoLogic.js";

function srcWebSocketSendingLogic(ws) {
  const isWebSocketConnected = ws.readyState === WebSocket.OPEN;
  if (!isWebSocketConnected) return;

  const thisFrameArrayToSendToEsp32String =
    thisFrameArrayToSendToEsp32.join(",");
  const canSend =
    thisFrameArrayToSendToEsp32String != previousFrameArrayStringToSendToEsp32;

  if (!canSend) return;


  const wsStringWithKey = Object.values({
    wsKey: "cameraInput",
    wsValue: thisFrameArrayToSendToEsp32String
  }).reduce((wsKey, wsValue) => {
    return `${wsKey}:${wsValue}`;
  });

  ws.send(wsStringWithKey);
  updatePreviousFrameArrayStringToSendToEsp32(wsStringWithKey);
}

export { srcWebSocketSendingLogic };
