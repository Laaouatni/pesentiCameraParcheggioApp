import { DELTA_TOLLERANZA_COLORI, MIN_COLORED_RATIO, REFERENCE_COLOR_BLACK, REFERENCE_COLOR_WHITE } from "../srcConfigCostants.js";
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

  let isOccupied = false;
  let thisColoredRatio = 0;
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

  for (let i = 0; i < thisParkingItemData.length; i += 4) {
    const thisRgbObject = {
      r: thisParkingItemData[i],
      g: thisParkingItemData[i + 1],
      b: thisParkingItemData[i + 2],
    };
    const thisRgbArray = [thisRgbObject.r, thisRgbObject.g, thisRgbObject.b];
    const maxDiff = Math.max(
      Math.abs(thisRgbArray[0] - thisRgbArray[1]),
      Math.abs(thisRgbArray[1] - thisRgbArray[2]),
      Math.abs(thisRgbArray[2] - thisRgbArray[0]),
    );
    const isGrigio = maxDiff < DELTA_TOLLERANZA_COLORI;
    const isBianco = thisRgbArray.every(
      (thisColorValue) =>
        thisColorValue > REFERENCE_COLOR_WHITE,
    );
    const isNero = thisRgbArray.every(
      (thisColorValue) => thisColorValue < REFERENCE_COLOR_BLACK,
    );
    const canIgnoreColor = isGrigio || isBianco || isNero;
    if (canIgnoreColor) continue;
    const totalPixels = thisParkingItemData.length / 4;
    thisColoredRatio = coloredPixelsCount / totalPixels;
    isOccupied = thisColoredRatio > MIN_COLORED_RATIO;
    if (isOccupied) break;
    coloredPixelsCount++;
  }
  return isOccupied;
}

export { srcAnalyzeParkingSlot };
