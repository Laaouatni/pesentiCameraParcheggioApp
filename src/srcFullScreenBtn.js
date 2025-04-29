import { btnRoutaSchermo } from "./srcDomCostants.js";

function srcFullScreenBtn() {
  if (!btnRoutaSchermo) throw new Error("btnRoutaSchermo is not defined");

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
