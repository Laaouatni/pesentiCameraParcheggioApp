/**
 *
 * @param {CanvasRenderingContext2D} ctx
 */
function srcColorParkingItems(ctx) {
  //     parkingItems.forEach((thisParkingItem, thisParkingItemIndex) => {
  //       const isOccupiedBoolean = analyzeParkingSlot(thisParkingItem);
  //       thisParkingItem.setAttribute(
  //         "style",
  //         `--slotColor: ${isOccupiedBoolean ? "red" : "green"}`,
  //       );
  //       thisFrameArrayToSendToEsp32[thisParkingItemIndex] = isOccupiedBoolean
  //         ? "1"
  //         : "0";
  //       function analyzeParkingSlot(thisParkingItem) {
  //         let isOccupied = false;
  //         let thisColoredRatio = 0;
  //         let coloredPixelsCount = 0;
  //         const thisParkingItemStyles = thisParkingItem.getBoundingClientRect();
  //         const thisParkingItemPositionData = {
  //           x: thisParkingItemStyles.x - parkingViewElementStyles.x,
  //           y: thisParkingItemStyles.y - parkingViewElementStyles.y,
  //           w: thisParkingItemStyles.width,
  //           h: thisParkingItemStyles.height,
  //         };
  //         const thisParkingItemData = ctx.getImageData(
  //           thisParkingItemPositionData.x,
  //           thisParkingItemPositionData.y,
  //           thisParkingItemPositionData.w,
  //           thisParkingItemPositionData.h,
  //         ).data;
  //         let totalPixels = thisParkingItemData.length / 4;
  //         for (let i = 0; i < thisParkingItemData.length; i += 4) {
  //           const thisRgbObject = {
  //             r: thisParkingItemData[i],
  //             g: thisParkingItemData[i + 1],
  //             b: thisParkingItemData[i + 2],
  //           };
  //           const thisRgbArray = [
  //             thisRgbObject.r,
  //             thisRgbObject.g,
  //             thisRgbObject.b,
  //           ];
  //           const maxDiff = Math.max(
  //             Math.abs(thisRgbArray[0] - thisRgbArray[1]),
  //             Math.abs(thisRgbArray[1] - thisRgbArray[2]),
  //             Math.abs(thisRgbArray[2] - thisRgbArray[0]),
  //           );
  //           const isGrigio = maxDiff < CONFIGURAZIONE.tolleranzaColori.colori;
  //           const isBianco = thisRgbArray.every(
  //             (thisColorValue) =>
  //               thisColorValue > CONFIGURAZIONE.tolleranzaColori.bianco,
  //           );
  //           const isNero = thisRgbArray.every(
  //             (thisColorValue) =>
  //               thisColorValue < CONFIGURAZIONE.tolleranzaColori.nero,
  //           );
  //           const canIgnoreColor = isGrigio || isBianco || isNero;
  //           if (canIgnoreColor) continue;
  //           thisColoredRatio = coloredPixelsCount / totalPixels;
  //           isOccupied = thisColoredRatio > CONFIGURAZIONE.MIN_COLORED_RATIO;
  //           if (isOccupied) break;
  //           coloredPixelsCount++;
  //         }
  //         return isOccupied;
  //       }
  //     });
}

export { srcColorParkingItems };
