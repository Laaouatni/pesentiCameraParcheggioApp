const ws = new WebSocket('wss://pesentiws-43f6274c0f11.herokuapp.com/');

ws.addEventListener("close", () => {
  window.location.reload();
});

const canvasElement = document.getElementById("canvasElement");
const videoElement = document.getElementById("videoElement");

const parkingViewElement = document.getElementById("parkingViewElement");
const parkingViewElementStyles = parkingViewElement.getBoundingClientRect();
const parkingItems = document.querySelectorAll(".parkingItem");

const FPS = 30;

const CONFIGURAZIONE = {
  tolleranzaColori: {
    GENERALE: 30,
    get colori() { return this.GENERALE },
    get bianco() { return 255 - this.GENERALE },
    get nero() { return this.GENERALE }
  },
  MIN_COLORED_RATIO: 8 / 100
}

const ctx = canvasElement.getContext("2d", {
  alpha: false,
  // desynchronized: true,
  willReadFrequently: true,
});

navigator.mediaDevices
  .getUserMedia({
    video: {
      facingMode: "environment",
      aspectRatio: parkingViewElement.clientWidth / parkingViewElement.clientHeight,
    },
  }).then(async (stream) => {
    videoElement.srcObject = stream;
  });

videoElement.addEventListener("playing", () => {
  canvasElement.width = parkingViewElement.clientWidth;
  canvasElement.height = parkingViewElement.clientHeight;

  let previousFrameArrayToSendToEsp32String = "";

  setInterval(() => {
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    let thisFrameArrayToSendToEsp32 = [];

    parkingItems.forEach((thisParkingItem, thisParkingItemIndex) => {
      const isOccupiedBoolean = analyzeParkingSlot(thisParkingItem);
      thisParkingItem.setAttribute("style", `--slotColor: ${isOccupiedBoolean ? "red" : "green"}`);
      thisFrameArrayToSendToEsp32[thisParkingItemIndex] = isOccupiedBoolean ? "1" : "0";

      function analyzeParkingSlot(thisParkingItem) {
        let isOccupied = false;
        let thisColoredRatio = 0;
        let coloredPixelsCount = 0;

        const thisParkingItemStyles = thisParkingItem.getBoundingClientRect();
        const thisParkingItemPositionData = {
          x: thisParkingItemStyles.x - parkingViewElementStyles.x,
          y: thisParkingItemStyles.y - parkingViewElementStyles.y,
          w: thisParkingItemStyles.width,
          h: thisParkingItemStyles.height
        }
        const thisParkingItemData = ctx.getImageData(thisParkingItemPositionData.x, thisParkingItemPositionData.y, thisParkingItemPositionData.w, thisParkingItemPositionData.h).data;

        let totalPixels = thisParkingItemData.length / 4;
        for (let i = 0; i < thisParkingItemData.length; i += 4) {
          const thisRgbObject = {
            r: thisParkingItemData[i],
            g: thisParkingItemData[i + 1],
            b: thisParkingItemData[i + 2]
          };
          const thisRgbArray = [thisRgbObject.r, thisRgbObject.g, thisRgbObject.b];

          const maxDiff = Math.max(
            Math.abs(thisRgbArray[0] - thisRgbArray[1]),
            Math.abs(thisRgbArray[1] - thisRgbArray[2]),
            Math.abs(thisRgbArray[2] - thisRgbArray[0])
          );

          const isGrigio = maxDiff < CONFIGURAZIONE.tolleranzaColori.colori;
          const isBianco = thisRgbArray.every(thisColorValue => thisColorValue > CONFIGURAZIONE.tolleranzaColori.bianco);
          const isNero = thisRgbArray.every(thisColorValue => thisColorValue < CONFIGURAZIONE.tolleranzaColori.nero);

          const canIgnoreColor = isGrigio || isBianco || isNero;
          if (canIgnoreColor) continue;
          thisColoredRatio = coloredPixelsCount / totalPixels;
          isOccupied = thisColoredRatio > CONFIGURAZIONE.MIN_COLORED_RATIO;
          if (isOccupied) break;

          coloredPixelsCount++;
        };
        return isOccupied;
      };
    });

    const isWSconnected = ws.readyState === WebSocket.OPEN;
    (() => {
      if (!isWSconnected) return;
      const thisFrameArrayToSendToEsp32String = thisFrameArrayToSendToEsp32.join(",");
      const canSend = thisFrameArrayToSendToEsp32String != previousFrameArrayToSendToEsp32String;
      if (!canSend) return;
      ws.send(thisFrameArrayToSendToEsp32String);
      previousFrameArrayToSendToEsp32String = thisFrameArrayToSendToEsp32String;
    })();
  }, 1000 / FPS);
});



// videoElement?.addEventListener("pause", () => {
//   clearInterval(frameLogicInterval);
// });

// .then(async (stream) => {
//   const videoTrack = stream.getVideoTracks()[0];
//   if (!window.MediaStreamTrackProcessor) {
//     document.body.textContent =
//       "Aggiorna il browser o utilizza un altro browser. `window.MediaStreamTrackProcessor` non è disponibile. per dettagli vedi: https://caniuse.com/?search=mediastreamtrackprocessor";
//     return;
//   }
//   const processor = new MediaStreamTrackProcessor({ track: videoTrack });
//   const reader = processor.readable.getReader();

//   canvasElement.width = parkingViewElement.clientWidth;
//   canvasElement.height = parkingViewElement.clientHeight;

//   let previousFrameArrayToSendToEsp32String = "";

//   drawThisFrame();

//   async function drawThisFrame() {
//     const { value: frame, done } = await reader.read();
//     if (done) return;
//     ctx.drawImage(frame, 0, 0, canvasElement.width, canvasElement.height);
//     frame.close();
//     let thisFrameArrayToSendToEsp32 = [];

//     parkingItems.forEach((thisParkingItem, thisParkingItemIndex) => {
//       const { isOccupiedBoolean, isOccupiedConfidencePercentage } = analyzeParkingSlot(thisParkingItem);

//       thisParkingItem.setAttribute("style", `--slotColor: ${isOccupiedBoolean ? "red" : "green"}`);
//       thisParkingItem.textContent = `${isOccupiedConfidencePercentage}%`
//       thisFrameArrayToSendToEsp32[thisParkingItemIndex] = isOccupiedBoolean ? "1" : "0";

//       function analyzeParkingSlot(thisParkingItem) {
//         let isOccupied = false;
//         let thisColoredRatio = 0;
//         let coloredPixelsCount = 0;

//         const thisParkingItemStyles = thisParkingItem.getBoundingClientRect();
//         const thisParkingItemPositionData = {
//           x: thisParkingItemStyles.x - parkingViewElementStyles.x,
//           y: thisParkingItemStyles.y - parkingViewElementStyles.y,
//           w: thisParkingItemStyles.width,
//           h: thisParkingItemStyles.height
//         }
//         const thisParkingItemData = ctx.getImageData(thisParkingItemPositionData.x, thisParkingItemPositionData.y, thisParkingItemPositionData.w, thisParkingItemPositionData.h).data;

//         let totalPixels = thisParkingItemData.length / 4;
//         for (let i = 0; i < thisParkingItemData.length; i += 4) {
//           const thisRgbObject = {
//             r: thisParkingItemData[i],
//             g: thisParkingItemData[i + 1],
//             b: thisParkingItemData[i + 2]
//           };
//           const thisRgbArray = [thisRgbObject.r, thisRgbObject.g, thisRgbObject.b];

//           const maxDiff = Math.max(
//             Math.abs(thisRgbArray[0] - thisRgbArray[1]),
//             Math.abs(thisRgbArray[1] - thisRgbArray[2]),
//             Math.abs(thisRgbArray[2] - thisRgbArray[0])
//           );

//           const isGrigio = maxDiff < CONFIGURAZIONE.tolleranzaColori.colori;
//           const isBianco = thisRgbArray.every(thisColorValue => thisColorValue > CONFIGURAZIONE.tolleranzaColori.bianco);
//           const isNero = thisRgbArray.every(thisColorValue => thisColorValue < CONFIGURAZIONE.tolleranzaColori.nero);

//           const canIgnoreColor = isGrigio || isBianco || isNero;
//           if (canIgnoreColor) continue;
//           thisColoredRatio = coloredPixelsCount / totalPixels;
//           isOccupied = thisColoredRatio > CONFIGURAZIONE.MIN_COLORED_RATIO;
//           if (isOccupied) break;

//           coloredPixelsCount++;
//         };
//         const isOccupiedBoolean = isOccupied;
//         const isOccupiedConfidencePercentage = (((thisColoredRatio) / CONFIGURAZIONE.MIN_COLORED_RATIO) * 100).toFixed(2);
//         return {
//           isOccupiedBoolean,
//           isOccupiedConfidencePercentage: isOccupiedConfidencePercentage > 100 ? 100 : isOccupiedConfidencePercentage,
//         }
//       }
//     });

//

//     drawThisFrame();
//   }
// });
