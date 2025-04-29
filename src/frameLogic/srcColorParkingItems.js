import { parkingItems } from "../srcDomCostants.js";
import { srcAnalyzeParkingSlot } from "./srcAnalyzeParkingSlot.js";
import { parkingViewElement } from "../srcDomCostants.js";

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 */
function srcColorParkingItems(ctx) {
  if (!ctx) throw new Error("ctx is not defined");
  if (!parkingItems) throw new Error("parkingItems is not defined");
  if (!parkingViewElement) throw new Error("parkingViewElement is not defined");

  const parkingViewElementStyles = parkingViewElement.getBoundingClientRect();

  parkingItems.forEach((thisParkingItem) => {
    const isOccupied = srcAnalyzeParkingSlot(thisParkingItem, parkingViewElementStyles);
    thisParkingItem.setAttribute(
      "style",
      `--slotColor: ${isOccupied ? "red" : "green"}`,
    );
  });

  //       thisFrameArrayToSendToEsp32[thisParkingItemIndex] = isOccupiedBoolean
  //         ? "1"
  //         : "0";
  //
  //     });
}

export { srcColorParkingItems };
