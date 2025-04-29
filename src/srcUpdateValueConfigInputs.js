import { domColorInputs } from "./srcDomCostants.js";
import { inputConfigTolleranza } from "./srcDomCostants.js";

function srcUpdateValueConfigInputs() {
  const allColorInputObjects = Object.values(domColorInputs);

  allColorInputObjects.forEach((colorInputObject) => {
    const { input, text } = colorInputObject;
    if (!input) throw new Error("input is not defined");
    if (!text) throw new Error("text is not defined");

    input.addEventListener("input", () => {
      const thisInputValue = input.value;
      const R = parseInt(thisInputValue.slice(1, 3), 16);
      const G = parseInt(thisInputValue.slice(3, 5), 16);
      const B = parseInt(thisInputValue.slice(5, 7), 16);
      text.innerText = `rgb(${R}, ${G}, ${B})`;
    });
  });

  
}

export { srcUpdateValueConfigInputs };
