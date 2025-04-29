function srcDontTurnOffTheSite() {
  if (!("wakeLock" in navigator)) return;

  navigator.wakeLock.request("screen").catch((err) => {
    console.error(`Wake Lock request failed: ${err.name}, ${err.message}`);
    window.location.reload();
  });
}

export { srcDontTurnOffTheSite };
