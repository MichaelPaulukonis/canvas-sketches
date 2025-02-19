// based on (translated from) https://github.com/constraint-systems/mosaic
// NOTES:
/**
 - https://estebanhufstedler.com/2020/06/08/rearrange-a-picture-into-another/
 - https://estebanhufstedler.com/2020/06/09/photomosaics-with-repetition/

**/

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
  const modal = {
    processing: false,
    showGrid: false
  }

  const sourceData = {
    lookups: [],
    cols: 0,
    rows: 0,
    image: null,
    cellSize: 32,
    ratio: 1
  }
  const sources = {
    tiles: { ...sourceData },
    layout: { ...sourceData }
  }

  const getResizeDimensions = ({ width, height }, maxDim = 600) => {
    // Calculate dimensions maintaining aspect ratio
    let w = width
    let h = height
    let ratio = 1
    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = (maxDim * h) / w
        w = maxDim
      } else {
        w = (maxDim * w) / h
        h = maxDim
      }
    }
    ratio = w / width

    return { width: w, height: h, ratio }
  }

  p.preload = () => {
    sources.tiles.image = p.loadImage('images/ad.apple.pie.pillsbury.jpg')
    sources.layout.image = p.loadImage('images/mona_square.jpeg')
  }

  const processImage = (image, targetLayer, displayLayer, cellSize, ratio) => {
    modal.processing = true
    displayLayer.background(210)
    targetLayer.background(210)
    return new Promise(resolve => {
      const cols = Math.floor(image.width / cellSize)
      const rows = Math.floor(image.height / cellSize)
      const localLs = []
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

            // annotate layer
            annotateLayer(
              displayLayer,
              targetLayer,
              cols,
              rows,
              cellSize,
              ratio
            )

            if (cells.length === 0) {
              modal.processing = false
              smallCtx.remove()
              resolve({
                cols,
                rows,
                lookups: localLs,
                image,
                cellSize,
                ratio
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
    const newWidth = sources.layout.cols * sources.layout.cellSize
    const newHeight = sources.layout.rows * sources.layout.cellSize
    targetLayer.resizeCanvas(newWidth, newHeight)
    const { width: newW, height: newH } = getResizeDimensions(
      { width: newWidth, height: newHeight },
      600
    )
    displayLayer.resizeCanvas(newW, newH)

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

          const tc = minIndex % sources.tiles.cols
          const tr = Math.floor(minIndex / sources.tiles.cols)
          targetLayer.image(
            sources.tiles.image,
            c * sources.layout.cellSize,
            r * sources.layout.cellSize,
            sources.layout.cellSize,
            sources.layout.cellSize,
            tc * sources.tiles.cellSize,
            tr * sources.tiles.cellSize,
            sources.tiles.cellSize,
            sources.tiles.cellSize
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

  function setupUI () {
    // Create UI container
    const uiContainer = p.createDiv('')
    uiContainer.style('position', 'absolute')
    uiContainer.style('right', '10px')
    uiContainer.style('top', '10px')
    uiContainer.style('background', 'rgba(255,255,255,0.8)')
    uiContainer.style('padding', '10px')
    uiContainer.style('border-radius', '5px')

    p.createDiv('Tiles cell size:').parent(uiContainer)
    const tileCellSlider = p.createSlider(5, 200, sources.tiles.cellSize, 1)
    tileCellSlider.parent(uiContainer)
    tileCellSlider.input(() => {
      if (modal.processing) {
        tileCellSlider.value(sources.tiles.cellSize)
        return
      }
      sources.tiles.cellSize = tileCellSlider.value()
      console.log('tileCellSize', sources.tiles.cellSize)
      processImage(
        sources.tiles.image,
        tileLayer,
        scaledTileLayer,
        sources.tiles.cellSize,
        sources.tiles.ratio
      ).then(blockSd => {
        sources.tiles = blockSd
        buildMosaic(targetLayer, p)
      })
    })

    p.createDiv('Layout cell size:').parent(uiContainer)
    const layoutCellSlider = p.createSlider(5, 200, sources.layout.cellSize, 1)
    layoutCellSlider.parent(uiContainer)
    layoutCellSlider.input(() => {
      if (modal.processing) {
        layoutCellSlider.value(sources.layout.cellSize)
        return
      }
      sources.layout.cellSize = layoutCellSlider.value()
      console.log('layoutCellSize', sources.layout.cellSize)
      if (lockCellSizes.checked()) {
        tileCellSlider.value(sources.layout.cellSize)
        sources.tiles.cellSize = sources.layout.cellSize
        processEverything()
      } else {
        processImage(
          sources.layout.image,
          layoutLayer,
          scaledLayoutLayer,
          sources.layout.cellSize,
          sources.layout.ratio
        ).then(layoutSd => {
          sources.layout = layoutSd
          buildMosaic(targetLayer, p)
        })
      }
    })

    p.createDiv('Lock cell sizes').parent(uiContainer)
    const lockCellSizes = p.createCheckbox('', false)
    lockCellSizes.parent(uiContainer)
    lockCellSizes.changed(() => {
      if (lockCellSizes.checked()) {
        tileCellSlider.value(sources.layout.cellSize)
        sources.tiles.cellSize = sources.layout.cellSize
        tileCellSlider.attribute('disabled', '')
      } else {
        tileCellSlider.removeAttribute('disabled')
      }
    })
  }

  p.setup = () => {
    const mainCanvas = document.getElementById('main-canvas')
    const { width, height } = getResizeDimensions(sources.layout.image)
    p.createCanvas(width, height, mainCanvas)
    setupUI()

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
    let {
      width: newWidth,
      height: newHeight,
      ratio
    } = getResizeDimensions(sources.tiles.image, 400)
    sources.tiles.ratio = ratio

    scaledTileLayer = p.createGraphics(newWidth, newHeight, scaledTileCanvas)
    scaledTileLayer.drop(file =>
      handleFile(
        file,
        tileLayer,
        scaledTileLayer,
        sources.tiles,
        sources.tiles.cellSize
      )
    )

    scaledTileLayer.show()
    scaledTileLayer.noStroke()

    const scaledLayoutCanvas = document.getElementById('layout-layer')
    let {
      width: newLayoutWidth,
      height: newLayoutHeight,
      ratio: ratioL
    } = getResizeDimensions(sources.layout.image, 400)
    sources.layout.ratio = ratioL
    scaledLayoutLayer = p.createGraphics(
      newLayoutWidth,
      newLayoutHeight,
      scaledLayoutCanvas
    )
    scaledLayoutLayer.drop(file =>
      handleFile(
        file,
        layoutLayer,
        scaledLayoutLayer,
        sources.layout,
        sources.layout.cellSize,
        true
      )
    )
    scaledLayoutLayer.show()
    scaledLayoutLayer.noStroke()

    p.background(220)
    processEverything()
  }

  const processEverything = () => {
    Promise.all([
      processImage(
        sources.tiles.image,
        tileLayer,
        scaledTileLayer,
        sources.tiles.cellSize,
        sources.tiles.ratio
      ),
      processImage(
        sources.layout.image,
        layoutLayer,
        scaledLayoutLayer,
        sources.layout.cellSize,
        sources.layout.ratio
      )
    ]).then(([blockSd, layoutSd]) => {
      sources.tiles = blockSd
      sources.layout = layoutSd
      buildMosaic(targetLayer, p)
    })
  }

  p.keyPressed = () => {
    if (p.key === 'g') {
      modal.showGrid = !modal.showGrid
      if (modal.showGrid) {
        annotateLayer(scaledTileLayer, tileLayer, sources.tiles.cols, sources.tiles.rows, sources.tiles.cellSize, sources.tiles.ratio)
        annotateLayer(scaledLayoutLayer, layoutLayer, sources.layout.cols, sources.layout.rows, sources.layout.cellSize, sources.layout.ratio)
      } else {
        scaledTileLayer.image(
          tileLayer,
          0,
          0,
          scaledTileLayer.width,
          scaledTileLayer.height
        )
        scaledLayoutLayer.image(
          layoutLayer,
          0,
          0,
          scaledLayoutLayer.width,
          scaledLayoutLayer.height
        )
      }
    } else if (p.key === 'S') {
      targetLayer.save(generateFilename('mosaic-tiles'))
    }
  }

  function drawGrid (displayLayer, sourceLayer, sourceData) {
    displayLayer.image(
      sourceLayer,
      0,
      0,
      displayLayer.width,
      displayLayer.height
    )
    displayLayer.stroke(0)
    displayLayer.strokeWeight(1)
    for (let i = 1; i <= sourceData.cols; i++) {
      displayLayer.line(
        i * sourceData.cellSize * sourceData.ratio,
        0,
        i * sourceData.cellSize * sourceData.ratio,
        sourceData.rows * sourceData.cellSize * sourceData.ratio
      )
    }
    for (let i = 1; i <= sourceData.rows; i++) {
      displayLayer.line(
        0,
        i * sourceData.cellSize * sourceData.ratio,
        sourceData.cols * sourceData.cellSize * sourceData.ratio,
        i * sourceData.cellSize * sourceData.ratio
      )
    }
    displayLayer.noStroke()
  }

  function annotateLayer (
    displayLayer,
    targetLayer,
    cols,
    rows,
    cellSize,
    ratio
  ) {
    displayLayer.image(
      targetLayer,
      0,
      0,
      displayLayer.width,
      displayLayer.height
    )

    if (modal.showGrid) {
      drawGrid(displayLayer, targetLayer, {
        cols,
        rows,
        cellSize,
        ratio
      })
    }

    const uiText = [
      `Size: ${targetLayer.width} x ${targetLayer.height}`,
      `Cols: ${cols}`,
      `Rows: ${rows}`,
      `Cell size: ${cellSize}`
    ]
    const boxWidth = 200
    const boxHeight = uiText.length * 20 + 20

    displayLayer.fill(50, 150)
    displayLayer.rect(5, displayLayer.height - boxHeight - 5, boxWidth, boxHeight, 5)
    displayLayer.fill(255)
    displayLayer.textSize(16)
    displayLayer.textAlign(displayLayer.LEFT, displayLayer.TOP)
    uiText.forEach((text, index) => {
      displayLayer.text(text, 10, displayLayer.height - boxHeight + 10 + index * 20)
    })
  }

  function handleFile (
    file,
    destinationLayer,
    scaledLayer,
    sourceData,
    cellSize,
    resizeCanvas = false
  ) {
    if (file.type === 'image') {
      modal.processing = true
      p.loadImage(file.data, loadedImg => {
        // const newLoadedSize = getResizeDimensions(loadedImg, 3000)
        // loadedImg.resize(newLoadedSize.width, newLoadedSize.height)
        destinationLayer.resizeCanvas(loadedImg.width, loadedImg.height)
        const {
          width: newWidth,
          height: newHeight,
          ratio
        } = getResizeDimensions(loadedImg, 300)
        scaledLayer.resizeCanvas(newWidth, newHeight)
        if (resizeCanvas) {
          targetLayer.resizeCanvas(loadedImg.width, loadedImg.height)
          const { width: newW, height: newH } = getResizeDimensions(
            loadedImg,
            600
          )
          p.resizeCanvas(newW, newH)
        }
        processImage(
          loadedImg,
          destinationLayer,
          scaledLayer,
          cellSize,
          ratio
        ).then(data => {
          sourceData.ratio = data.ratio
          sourceData.image = loadedImg
          sourceData.rows = data.rows
          sourceData.cols = data.cols
          sourceData.lookups = data.lookups
          sourceData.cellSize = data.cellSize
          modal.processing = false
          buildMosaic(targetLayer, p)
        })
      })
    }
  }
}

new p5(sketch)
