/**
 *

 * @param {Element} thisParkingItem
 * @param {DOMRect} parkingViewElementStyles
 */
function srcGetThisParkingItemPositionData(thisParkingItem, parkingViewElementStyles) {
  const thisParkingItemStyles = thisParkingItem.getBoundingClientRect();

  return {
    x: thisParkingItemStyles.x - parkingViewElementStyles.x,
    y: thisParkingItemStyles.y - parkingViewElementStyles.y,
    w: thisParkingItemStyles.width,
    h: thisParkingItemStyles.height,
  };
}

export { srcGetThisParkingItemPositionData };
