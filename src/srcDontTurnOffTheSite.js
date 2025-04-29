function srcDontTurnOffTheSite() {
  if (!("wakeLock" in navigator)) return;

  navigator.wakeLock.request("screen").catch((err) => {
    alert(`refresha la pagina: Wake Lock request failed: ${err.name}, ${err.message}`);
  });
}

export { srcDontTurnOffTheSite };
