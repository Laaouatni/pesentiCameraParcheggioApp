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

  const hideButton = document.querySelector("#hideButton");
  const configs = [
    document.querySelector("#riferimentiElement"),
    document.querySelector("#sizeInputsContainer"),
    document.querySelector("#tooleranzaElement"),
  ];

  if (!hideButton) throw new Error("hideButton is not defined");
  hideButton.addEventListener("click", () => {
    if (!configs) throw new Error("configs is not defined");
    configs.forEach((config) => {
      if (!config) throw new Error("config is not defined");
      if (config.hasAttribute("hidden")) {
        config.removeAttribute("hidden");
        hideButton.textContent = "Nascondi Config";
      } else {
        config.setAttribute("hidden", "true");
        hideButton.textContent = "Mostra Config";
      }
    });
  });
}

export { srcFullScreenBtn };
