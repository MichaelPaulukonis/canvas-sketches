// based on (translatef from) https://github.com/constraint-systems/mosaic

const timestamp = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hour = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const secs = String(d.getSeconds()).padStart(2, "0");
  const millis = String(d.getMilliseconds()).padStart(3, "0");
  return `${year}${month}${day}.${hour}${min}${secs}.${millis}`;
};

function generateFilename(prefix) {
  return `${prefix || "sketch"}-${timestamp()}.png`;
}

const sketch = (p) => {
  let tileLayer;
  let layoutLayer;
  let scaledTileLayer, scaledLayoutLayer;
  const cellSize = 16;
  const modal = {
    processing: false,
  };
  const scaleFactor = 0.25; // Adjust this factor as needed

  const sourceData = {
    lookups: [],
    cols: 0,
    rows: 0,
    image: null,
  };
  const images = {
    tiles: { ...sourceData },
    layout: { ...sourceData },
  };

  p.preload = () => {
    images.tiles.image = p.loadImage("images/ad.apple.pie.pillsbury.jpg");
    images.layout.image = p.loadImage("images/alice.love.full.png");
    // images.layout.image = p.loadImage("images/ad.apple.pie.pillsbury.jpg");
    // images.tiles.image = p.loadImage("images/alice.love.full.png");
  };

  const processImage = (image, targetLayer, displayLayer) => {
    modal.processing = true;
    return new Promise((resolve) => {
      const cols = Math.round(image.width / cellSize);
      const rows = Math.round(image.height / cellSize);
      const width = cols * cellSize;
      const height = rows * cellSize;
      // width/height only used for UI display
      const localLs = [];
      // this needs to be discarded when we are done, or the canvas stays around forever
      const smallCtx = p.createGraphics(cols * 2, rows * 2);
      smallCtx.image(image, 0, 0, smallCtx.width, smallCtx.height);

      const cells = Array(cols * rows)
        .fill(0)
        .map((_, i) => i);
      const batchSize = 16;
      const drawCell = () => {
        for (let b = 0; b < batchSize; b++) {
          const i = cells.shift();
          if (i !== undefined) {
            const c = i % cols;
            const r = Math.floor(i / cols);
            const data = smallCtx.drawingContext.getImageData(
              c * 2,
              r * 2,
              2,
              2
            ).data;
            let quad = [];
            for (let j = 0; j < 4 * 4; j += 4) {
              const pixel = [data[j], data[j + 1], data[j + 2]];
              quad.push(pixel);
            }
            localLs.push(quad);
            targetLayer.image(
              image,
              c * cellSize,
              r * cellSize,
              cellSize,
              cellSize,
              c * cellSize,
              r * cellSize,
              cellSize,
              cellSize
            );
            displayLayer.image(
              targetLayer,
              0,
              0,
              displayLayer.width,
              displayLayer.height
            );

            if (cells.length === 0) {
              console.log("set src");
              modal.processing = false;
              resolve({
                cols,
                rows,
                lookups: localLs,
                image,
              });
            }
          }
          if (b === batchSize - 1) {
            setTimeout(() => {
              drawCell();
            }, 0);
          }
        }
      };
      drawCell();
    });
  };

  const processMosaic = (layer) => {
    console.log("Gonna do the mosaic now!");
    layer.background(255);

    const cells = Array(images.layout.cols * images.layout.rows)
      .fill(0)
      .map((_, i) => i);
    const batchSize = 8;
    const drawCell = () => {
      if (modal.processing) return;
      for (let b = 0; b < batchSize; b++) {
        const i = cells.shift();
        if (i !== undefined) {
          const c = i % images.layout.cols;
          const r = Math.floor(i / images.layout.cols);

          let min = Infinity;
          let minIndex = -1;
          const layoutLookup = images.layout.lookups[i];
          for (let j = 0; j < images.tiles.cols * images.tiles.rows; j++) {
            const blockLookup = images.tiles.lookups[j];
            let fullSum = 0;
            for (let k = 0; k < 4; k++) {
              const lookupPixel = blockLookup[k];
              const pixel = layoutLookup[k];
              const diff = pixel.map((v, l) => Math.abs(v - lookupPixel[l]));
              const sum = diff.reduce((a, b) => a + b, 0);
              fullSum += sum;
            }
            if (fullSum < min) {
              min = fullSum;
              minIndex = j;
            }
          }

          const sc = minIndex % images.tiles.cols;
          const sr = Math.floor(minIndex / images.tiles.cols);
          layer.image(
            images.tiles.image,
            c * cellSize,
            r * cellSize,
            cellSize,
            cellSize,
            sc * cellSize,
            sr * cellSize,
            cellSize,
            cellSize
          );
          if (cells.length === 0) {
            console.log("done");
          }
        }
        if (b === batchSize - 1) {
          setTimeout(() => {
            drawCell();
          }, 0);
        }
      }
    };
    drawCell();
  };

  p.setup = () => {
    const mainCanvas = document.getElementById("main-canvas");
    p.createCanvas(
      images.layout.image.width,
      images.layout.image.height,
      mainCanvas
    );
    p.pixelDensity(1);
    p.noLoop();

    tileLayer = p.createGraphics(
      images.tiles.image.width,
      images.tiles.image.height
    );

    layoutLayer = p.createGraphics(
      images.layout.image.width,
      images.layout.image.height
    );

    const scaledTileCanvas = document.getElementById("tile-layer");
    scaledTileLayer = p.createGraphics(
      images.tiles.image.width * scaleFactor,
      images.tiles.image.height * scaleFactor,
      scaledTileCanvas
    );
    scaledTileLayer.drop((file) =>
      handleFile(file, tileLayer, scaledTileLayer, images.tiles)
    );

    scaledTileLayer.show();

    const scaledLayoutCanvas = document.getElementById("layout-layer");
    scaledLayoutLayer = p.createGraphics(
      images.layout.image.width * scaleFactor,
      images.layout.image.height * scaleFactor,
      scaledLayoutCanvas
    );
    scaledLayoutLayer.drop((file) =>
      handleFile(file, layoutLayer, scaledLayoutLayer, images.layout, true)
    );
    scaledLayoutLayer.show();

    p.background(220);
    Promise.all([
      processImage(images.tiles.image, tileLayer, scaledTileLayer),
      processImage(images.layout.image, layoutLayer, scaledLayoutLayer),
    ]).then(([blockSd, layoutSd]) => {
      images.tiles = blockSd;
      images.layout = layoutSd;
      processMosaic(p);
    });
  };

  p.keyPressed = () => {
    if (p.key === "S") {
      p.save(generateFilename("mosaic-tiles"));
    }
  };

  function handleFile(file, targetLayer, scaledLayer, sourceData, resizeCanvas = false) {
    if (file.type === "image") {
      modal.processing = true;
      p.loadImage(file.data, (loadedImg) => {
        targetLayer.resizeCanvas(loadedImg.width, loadedImg.height);
        scaledLayer.resizeCanvas(
          loadedImg.width * scaleFactor,
          loadedImg.height * scaleFactor
        );
        if (resizeCanvas) p.resizeCanvas(loadedImg.width, loadedImg.height);
        processImage(loadedImg, targetLayer, scaledLayer).then((data) => {
          sourceData.lookups = data.lookups;
          sourceData.cols = data.cols;
          sourceData.rows = data.rows;
          sourceData.image = loadedImg;
          modal.processing = false;

          debugger;

          processMosaic(p);
        });
      });
    }
  }
};

new p5(sketch);
