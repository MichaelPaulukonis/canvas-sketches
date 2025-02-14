// based on (translatef from) https://github.com/constraint-systems/mosaic

const timestamp = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  const secs = String(d.getSeconds()).padStart(2, '0')
  const millis = String(d.getMilliseconds()).padStart(3, '0')
  return `${year}${month}${day}.${hour}${min}${secs}.${millis}`
}

function generateFilename (prefix) {
  return `${prefix || 'sketch'}-${timestamp()}.png`
}

const sketch = p => {
  let tileSource
  let layoutSource
  let tileLayer
  let layoutLayer
  let scaledTileLayer, scaledLayoutLayer
  const cellSize = 16
  // const lookups = {
  //   blocks: [],
  //   layout: []
  // }

  const sourceData = {
    lookups: [],
    cols: 0,
    rows: 0
  }
  const images = {
    tiles: { ...sourceData },
    layout: { ...sourceData }
  }

  p.preload = () => {
    tileSource = p.loadImage('images/ad.apple.pie.pillsbury.jpg')
    layoutSource = p.loadImage('images/alice.love.full.png')
    // layoutSource = p.loadImage("images/ad.apple.pie.pillsbury.jpg");
    // tileSource = p.loadImage("images/alice.love.full.png");
  }

  const processImage = (image, targetLayer, displayLayer) => {
    return new Promise(resolve => {
      const cols = Math.round(image.width / cellSize)
      const rows = Math.round(image.height / cellSize)
      const width = cols * cellSize
      const height = rows * cellSize
      // width/height only used for UI display
      const localLs = []
      // this needs to be discarded when we are done, or the canvas stays around forever
      const smallCtx = p.createGraphics(cols * 2, rows * 2)
      smallCtx.image(image, 0, 0, smallCtx.width, smallCtx.height)

      const cells = Array(cols * rows)
        .fill(0)
        .map((_, i) => i)
      const batchSize = 16
      const drawCell = () => {
        for (let b = 0; b < batchSize; b++) {
          const i = cells.shift()
          if (i !== undefined) {
            const c = i % cols
            const r = Math.floor(i / cols)
            const data = smallCtx.drawingContext.getImageData(
              c * 2,
              r * 2,
              2,
              2
            ).data
            let quad = []
            for (let j = 0; j < 4 * 4; j += 4) {
              const pixel = [data[j], data[j + 1], data[j + 2]]
              quad.push(pixel)
            }
            localLs.push(quad)
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
            )
            displayLayer.image(targetLayer, 0, 0, displayLayer.width, displayLayer.height);

            if (cells.length === 0) {
              console.log('set src')
              resolve({
                cols,
                rows,
                lookups: localLs
              })
            }
          }
          if (b === batchSize - 1) {
            setTimeout(() => {
              drawCell()
            }, 0)
          }
        }
      }
      drawCell()
    })
  }

  const processMosaic = layer => {
    console.log('Gonna do the mosaic now!')

    const cells = Array(images.layout.cols * images.layout.rows)
      .fill(0)
      .map((_, i) => i)

    const batchSize = 8
    const drawCell = () => {
      for (let b = 0; b < batchSize; b++) {
        const i = cells.shift()
        if (i !== undefined) {
          const c = i % images.layout.cols
          const r = Math.floor(i / images.layout.cols)

          let min = Infinity
          let minIndex = -1
          const layoutLookup = images.layout.lookups[i]
          for (let j = 0; j < images.tiles.cols * images.tiles.rows; j++) {
            const blockLookup = images.tiles.lookups[j]
            let fullSum = 0
            for (let k = 0; k < 4; k++) {
              const lookupPixel = blockLookup[k]
              const pixel = layoutLookup[k]
              const diff = pixel.map((v, l) => Math.abs(v - lookupPixel[l]))
              const sum = diff.reduce((a, b) => a + b, 0)
              fullSum += sum
            }
            if (fullSum < min) {
              min = fullSum
              minIndex = j
            }
          }

          const sc = minIndex % images.tiles.cols
          const sr = Math.floor(minIndex / images.tiles.cols)
          layer.image(
            tileSource,
            c * cellSize,
            r * cellSize,
            cellSize,
            cellSize,
            sc * cellSize,
            sr * cellSize,
            cellSize,
            cellSize
          )
          if (cells.length === 0) {
            console.log('done')
          }
        }
        if (b === batchSize - 1) {
          setTimeout(() => {
            drawCell()
          }, 0)
        }
      }
    }
    drawCell()
  }

  p.setup = () => {
    p.createCanvas(layoutSource.width, layoutSource.height)
    p.pixelDensity(1)
    tileLayer = p.createGraphics(tileSource.width, tileSource.height)
    // tileLayer.show()
    layoutLayer = p.createGraphics(layoutSource.width, layoutSource.height)
    // layoutLayer.show()
    // Create scaled graphics elements
    const scaleFactor = 0.25 // Adjust this factor as needed
    scaledTileLayer = p.createGraphics(
      tileSource.width * scaleFactor,
      tileSource.height * scaleFactor
    )
    scaledTileLayer.show()
    scaledLayoutLayer = p.createGraphics(
      layoutSource.width * scaleFactor,
      layoutSource.height * scaleFactor
    )
    scaledLayoutLayer.show()

    p.noLoop()
  }

  p.draw = () => {
    p.background(220)
    Promise.all([
      processImage(tileSource, tileLayer, scaledTileLayer),
      processImage(layoutSource, layoutLayer, scaledLayoutLayer)
    ]).then(([blockSd, layoutSd]) => {
      images.tiles = blockSd
      images.layout = layoutSd
      processMosaic(p)
    })
  }

  p.keyPressed = () => {
    if (p.key === 'S') {
      p.save(generateFilename('mosaic-tiles'))
    }
  }
}

new p5(sketch)
