import {
  DELTA_TOLLERANZA_COLORI,
  MIN_COLORED_RATIO,
  REFERENCE_COLOR_BLACK,
  REFERENCE_COLOR_WHITE,
} from "../srcConfigCostants.js";
import { srcGetThisParkingItemPositionData } from "./srcGetThisParkingItemPositionData.js";

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Element} thisParkingItem
 * @param {DOMRect} parkingViewElementStyles
 * @return {boolean}
 */
function srcAnalyzeParkingSlot(ctx, thisParkingItem, parkingViewElementStyles) {
  if (!thisParkingItem) throw new Error("thisParkingItem is not defined");

  if (!(REFERENCE_COLOR_BLACK.every((_,i) => REFERENCE_COLOR_BLACK[i] == [0, 0, 0][i]))) {
    console.log("REFERENCE_COLOR_BLACK", REFERENCE_COLOR_BLACK);
  }
  // if (REFERENCE_COLOR_WHITE != [255, 255, 255]) {
  //   console.log("REFERENCE_COLOR_WHITE", REFERENCE_COLOR_WHITE);
  // }


  let isOccupied = false;
  let coloredPixelsCount = 0;

  const thisParkingItemPositionData = srcGetThisParkingItemPositionData(
    thisParkingItem,
    parkingViewElementStyles,
  );

  const thisParkingItemData = ctx.getImageData(
    thisParkingItemPositionData.x,
    thisParkingItemPositionData.y,
    thisParkingItemPositionData.w,
    thisParkingItemPositionData.h,
  ).data;

  const totalPixels = thisParkingItemData.length / 4;
  const minColoredPixelsNeeded = totalPixels * MIN_COLORED_RATIO;

  for (let i = 0; i < thisParkingItemData.length; i += 4) {
    const thisR = thisParkingItemData[i];
    const thisG = thisParkingItemData[i + 1];
    const thisB = thisParkingItemData[i + 2];

    const thisRgbArray = [thisR, thisG, thisB];

    const maxDiff = Math.max(
      Math.abs(thisRgbArray[0] - thisRgbArray[1]),
      Math.abs(thisRgbArray[1] - thisRgbArray[2]),
      Math.abs(thisRgbArray[2] - thisRgbArray[0]),
    );

    const isGrigio = maxDiff < DELTA_TOLLERANZA_COLORI;
    const isBianco = thisRgbArray.every((_, thisColorIndex) => {
      return (
        thisRgbArray[thisColorIndex] >=
        REFERENCE_COLOR_WHITE[thisColorIndex] - DELTA_TOLLERANZA_COLORI
      );
    });
    const isNero = thisRgbArray.every((_, thisColorIndex) => {
      return (
        thisRgbArray[thisColorIndex] <=
        REFERENCE_COLOR_BLACK[thisColorIndex] + DELTA_TOLLERANZA_COLORI
      );
    });

    const canIgnoreColor = isGrigio || isBianco || isNero;
    if (canIgnoreColor) continue;

    isOccupied = coloredPixelsCount > minColoredPixelsNeeded;
    if (isOccupied) break;

    coloredPixelsCount++;
  }
  return isOccupied;
}

export { srcAnalyzeParkingSlot };
