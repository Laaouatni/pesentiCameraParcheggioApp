import { thisFrameArrayToSendToEsp32 } from "./frameLogic/srcFrameLogic.js";
import {
  previousFrameArrayStringToSendToEsp32,
  updatePreviousFrameArrayStringToSendToEsp32,
} from "./srcVideoLogic.js";

function srcWebSocketSendingLogic(ws) {
  const isWebSocketConnected = ws.readyState === WebSocket.OPEN;
  if (!isWebSocketConnected) return;

  const keys = {
    slotsCameraInput: "parkingItem",
    cancelloCameraInput: "cancelloItem",
  };

  Object.entries(keys).forEach(([key, value]) => {
    const thisString = `${key}:${thisFrameArrayToSendToEsp32[value].join(",")}`;
    const canSend =
      thisString !== previousFrameArrayStringToSendToEsp32[value];
    if (!canSend) return;
    ws.send(thisString);
    updatePreviousFrameArrayStringToSendToEsp32(value, thisString);
  });
}

export { srcWebSocketSendingLogic };
