function srcFullScreenBtn() {
  const btnRoutaSchermo = document.getElementById("btnRoutaSchermo");

  btnRoutaSchermo.addEventListener("click", () => {
    document.documentElement.requestFullscreen();
    window.screen.orientation.lock("landscape");
    btnRoutaSchermo.setAttribute("hidden", "true");
  });

  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) return;
    btnRoutaSchermo.removeAttribute("hidden");
  });
}

export { srcFullScreenBtn };
