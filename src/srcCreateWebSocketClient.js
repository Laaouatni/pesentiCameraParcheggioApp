function srcCreateWebSocketClient() {
  const URL = "pesentiws-43f6274c0f11.herokuapp.com/";
  const ws = new WebSocket(`wss://${URL}`);

  ws.addEventListener("close", () => {
    window.location.reload();
  });

  return ws;
}

export { srcCreateWebSocketClient };
