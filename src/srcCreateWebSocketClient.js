function srcCreateWebSocketClient() {
  const ws = new WebSocket("wss://pesentiws-43f6274c0f11.herokuapp.com/");

  ws.addEventListener("close", () => {
    window.location.reload();
  });

  return ws;
}

export { srcCreateWebSocketClient };
