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
  let tileLayer
  let layoutLayer
  let scaledTileLayer, scaledLayoutLayer
  let targetLayer
  let cellSize = 16
  const modal = {
    processing: false
  }

  const sourceData = {
    lookups: [],
    cols: 0,
    rows: 0,
    image: null
  }
  const sources = {
    tiles: { ...sourceData },
    layout: { ...sourceData }
  }

  const getResizeDimensions = ({ width, height }, maxDim = 600) => {
    // Calculate dimensions maintaining aspect ratio
    let w = width
    let h = height

    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = (maxDim * h) / w
        w = maxDim
      } else {
        w = (maxDim * w) / h
        h = maxDim
      }
    }

    return { width: w, height: h }
  }

  p.preload = () => {
    sources.tiles.image = p.loadImage('images/ad.apple.pie.pillsbury.jpg')
    sources.layout.image = p.loadImage('images/alice.love.full.png')
  }

  // I tried changing the size of the smallCtx
  // but it made no difference
  // scale up the layer itself, instead?
  // that seems pointless, since we're analyzing the SMALL context anyway ugh
  // what if we drop cellSize instead???
  // (seems sus)
  // mmmmmmmmmmm but when we use a larger layoutLayer
  // we also have a larger mosaicLayer
  const imageToTiles = (image, targetLayer, displayLayer) => {
    modal.processing = true
    displayLayer.background(210)
    targetLayer.background(210)
    return new Promise(resolve => {
      const cols = Math.round(image.width / cellSize)
      const rows = Math.round(image.height / cellSize)
      const localLs = []
      const smallCtx = p.createGraphics(cols * 2, rows * 2)
      smallCtx.image(image, 0, 0, smallCtx.width, smallCtx.height)
      console.log(`smallContext: ${smallCtx.width} x ${smallCtx.height}`)

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
            displayLayer.image(
              targetLayer,
              0,
              0,
              displayLayer.width,
              displayLayer.height
            )
            displayLayer.fill(50, 150)
            displayLayer.rect(5, displayLayer.height - 30, 100, 20, 5)
            p.textAlign(p.LEFT, p.TOP)
            displayLayer.fill(255)
            displayLayer.textSize(16)
            displayLayer.text(
              `${image.width} x ${image.height}`,
              10,
              displayLayer.height - 15
            )

            if (cells.length === 0) {
              modal.processing = false
              smallCtx.remove()
              resolve({
                cols,
                rows,
                lookups: localLs,
                image
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

  const buildMosaic = (targetLayer, displayLayer) => {
    displayLayer.background(210)
    targetLayer.background(210)

    const cells = Array(sources.layout.cols * sources.layout.rows)
      .fill(0)
      .map((_, i) => i)
    const batchSize = 8
    const drawCell = () => {
      if (modal.processing) return
      for (let b = 0; b < batchSize; b++) {
        const i = cells.shift()
        if (i !== undefined) {
          const c = i % sources.layout.cols
          const r = Math.floor(i / sources.layout.cols)

          let min = Infinity
          let minIndex = -1
          const layoutLookup = sources.layout.lookups[i]
          for (let j = 0; j < sources.tiles.cols * sources.tiles.rows; j++) {
            const blockLookup = sources.tiles.lookups[j]
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

          const sc = minIndex % sources.tiles.cols
          const sr = Math.floor(minIndex / sources.tiles.cols)
          targetLayer.image(
            sources.tiles.image,
            c * cellSize,
            r * cellSize,
            cellSize,
            cellSize,
            sc * cellSize,
            sr * cellSize,
            cellSize,
            cellSize
          )

          displayLayer.image(
            targetLayer,
            0,
            0,
            displayLayer.width,
            displayLayer.height
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
    const mainCanvas = document.getElementById('main-canvas')
    const { width, height } = getResizeDimensions(sources.layout.image)
    p.createCanvas(width, height, mainCanvas)
    const slider = p.createSlider(5, 50, cellSize, 1)
    slider.position(10, p.height - 30)
    slider.style('width', '200px')
    slider.attribute('title', 'Cell Size')
    slider.input(() => {
      if (modal.processing) {
        slider.value(cellSize)
        return
      }
      cellSize = slider.value()
      processEverything()
    })

    targetLayer = p.createGraphics(
      sources.layout.image.width,
      sources.layout.image.height
    )
    p.pixelDensity(1)
    p.noLoop()

    tileLayer = p.createGraphics(
      sources.tiles.image.width,
      sources.tiles.image.height
    )

    layoutLayer = p.createGraphics(
      sources.layout.image.width,
      sources.layout.image.height
    )

    const scaledTileCanvas = document.getElementById('tile-layer')
    let { width: newWidth, height: newHeight } = getResizeDimensions(
      sources.tiles.image,
      400
    )

    scaledTileLayer = p.createGraphics(newWidth, newHeight, scaledTileCanvas)
    scaledTileLayer.drop(file =>
      handleFile(file, tileLayer, scaledTileLayer, sources.tiles)
    )

    scaledTileLayer.show()
    scaledTileLayer.noStroke()

    const scaledLayoutCanvas = document.getElementById('layout-layer')
    let { width: newLayoutWidth, height: newLayoutHeight } =
      getResizeDimensions(sources.layout.image, 400)
    scaledLayoutLayer = p.createGraphics(
      newLayoutWidth,
      newLayoutHeight,
      scaledLayoutCanvas
    )
    scaledLayoutLayer.drop(file =>
      handleFile(file, layoutLayer, scaledLayoutLayer, sources.layout, true)
    )
    scaledLayoutLayer.show()
    scaledLayoutLayer.noStroke()

    p.background(220)
    processEverything()
  }

  const processEverything = () => {
    Promise.all([
      imageToTiles(sources.tiles.image, tileLayer, scaledTileLayer),
      imageToTiles(sources.layout.image, layoutLayer, scaledLayoutLayer)
    ]).then(([blockSd, layoutSd]) => {
      sources.tiles = blockSd
      sources.layout = layoutSd
      buildMosaic(targetLayer, p)
    })
  }

  p.keyPressed = () => {
    if (p.key === 'S') {
      targetLayer.save(generateFilename('mosaic-tiles'))
    }
  }

  function handleFile (
    file,
    destinationLayer,
    scaledLayer,
    sourceData,
    resizeCanvas = false
  ) {
    if (file.type === 'image') {
      modal.processing = true
      p.loadImage(file.data, loadedImg => {
        destinationLayer.resizeCanvas(loadedImg.width, loadedImg.height)
        const { width: newWidth, height: newHeight } = getResizeDimensions(
          loadedImg,
          300
        )
        scaledLayer.resizeCanvas(newWidth, newHeight)
        if (resizeCanvas) {
          targetLayer.resizeCanvas(loadedImg.width, loadedImg.height)
          const { width: newW, height: newH } = getResizeDimensions(
            loadedImg,
            600
          )
          p.resizeCanvas(newW, newH)
        }
        imageToTiles(loadedImg, destinationLayer, scaledLayer).then(data => {
          sourceData.lookups = data.lookups
          sourceData.cols = data.cols
          sourceData.rows = data.rows
          sourceData.image = loadedImg
          modal.processing = false
          buildMosaic(targetLayer, p)
        })
      })
    }
  }
}

new p5(sketch)
