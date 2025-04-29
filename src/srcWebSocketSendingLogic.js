function srcWebSocketSendingLogic(ws) {
  const isWebSocketConnected = ws.readyState === WebSocket.OPEN;
  if (!isWebSocketConnected) return;
}

export { srcWebSocketSendingLogic };