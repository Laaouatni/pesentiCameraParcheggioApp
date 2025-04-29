import { parkingItems } from "../srcDomCostants.js";
import { srcAnalyzeParkingSlot } from "./srcAnalyzeParkingSlot.js";

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 */
function srcColorParkingItems(ctx) {
  if (!ctx) throw new Error("ctx is not defined");
  if (!parkingItems) throw new Error("parkingItems is not defined");

  parkingItems.forEach((thisParkingItem) => {
    const isOccupied = srcAnalyzeParkingSlot(thisParkingItem);
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
