export const FPS = 30;
export const DELTA_TOLLERANZA_COLORI = 30;
export const MIN_COLORED_RATIO = 8 / 100;
export let REFERENCE_COLOR_BLACK = [0,0,0];
export let REFERENCE_COLOR_WHITE = [255,255,255];

export function updateReferenceColorBlack(newValue) {
  REFERENCE_COLOR_BLACK = newValue;
}
export function updateReferenceColorWhite(newValue) {
  REFERENCE_COLOR_WHITE = newValue;
}
