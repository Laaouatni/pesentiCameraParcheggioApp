import { srcUpdateColorInputsDinamically } from "./srcUpdateColorInputsDinamically.js";
import { srcUpdateTolleranzaInputsDinamically } from "./srcUpdateTolleranzaInputsDinamically.js";

function srcUpdateValueConfigInputs() {
  srcUpdateColorInputsDinamically();
  srcUpdateTolleranzaInputsDinamically();
}

export { srcUpdateValueConfigInputs };
