import { srcVideoLogic } from "./src/srcVideoLogic.js";
import { srcCreateCtx } from "./src/srcCreateCtx.js";
import { parkingViewElement, videoElement } from "./src/srcDomCostants.js";
import { srcFullScreenBtn } from "./src/srcFullScreenBtn.js";
import { srcActivateVideoCamera } from "./src/srcActivateCamera.js";
import { srcDontTurnOffTheSite } from "./src/srcDontTurnOffTheSite.js";
import { srcCreateWebSocketClient } from "./src/srcCreateWebSocketClient.js";
import { srcUpdateValueConfigInputs } from "./src/srcUpdateValueConfigInputs.js";
import { srcResizeVideoCanvas } from "./src/srcResizeVideoCanvas.js";

const ws = srcCreateWebSocketClient();
const ctx = srcCreateCtx();

let sizeConfig = {
  parkingZoom: 0.75,
  gapSlots: 10,
  slotWidth: 35,
  slotHeight: 60,
  slotPadding: 16,
  slotSpessoreBordo: 4,
  slotRadius: 6,
  parkingViewWidth: 297,
  parkingViewHeight: 210,
  distanceSlotCancello: 20,
  gapCancelli: 30,
  cancelloWidth: 70,
  cancelloHeight: 20,
};

srcFullScreenBtn();
srcDontTurnOffTheSite();
srcActivateVideoCamera();
srcUpdateValueConfigInputs();

const sizeInputsContainer = document.querySelector("#sizeInputsContainer");

Object.entries(sizeConfig).forEach(([key, value]) => {
  const thisInput = document.createElement("input");
  const thisLabel = document.createElement("label");
  const thisDiv = document.createElement("div");
  const thisKey = `sizeConfig-${key}`;
  thisDiv.className = "sizeInputDiv";
  thisInput.type = "range";
  thisInput.min = `${0}`;
  thisInput.max = `${value * 4}`;
  thisInput.value = `${value}`;
  thisInput.id = thisKey;
  thisLabel.htmlFor = thisKey;
  thisLabel.textContent = `${key}: ${value}`;
  if(key === "parkingZoom") {
    thisInput.step = "0.01";
  }

  thisDiv?.appendChild(thisLabel);
  thisDiv?.appendChild(thisInput);
  sizeInputsContainer?.appendChild(thisDiv);

  updateCssVariables();

  thisInput.addEventListener("input", (event) => {
    sizeConfig[key] = parseFloat(event.target.value);
    thisInput.value = sizeConfig[key];
    thisLabel.textContent = `${key}: ${sizeConfig[key]}`;
    
    updateCssVariables();
  });

  function updateCssVariables() {
    if (key === "parkingZoom") {
      parkingViewElement?.style.setProperty(
        `--${thisKey}`,
        `${sizeConfig[key]}`,
      );
    } else {
      parkingViewElement?.style.setProperty(
        `--${thisKey}`,
        `calc(${sizeConfig[key]}px * var(--sizeConfig-parkingZoom))`,
      );
    }

    // if (key === "parkingViewWidth" || key === "parkingViewHeight" || key === "parkingZoom") {
    srcResizeVideoCanvas();
    srcActivateVideoCamera();
    // }
  }
});


videoElement.addEventListener("playing", () => {
  if (!ctx) throw new Error("ctx is not defined");

  srcVideoLogic(ws, ctx);
});
