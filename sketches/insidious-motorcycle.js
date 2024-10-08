// from https://github.com/mattdesl/canvas-sketch/issues/132#issuecomment-2093335634

// the name comes from an auto-generated default in editor.p5.org

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random');
import p5 from 'p5'
const { Pane } = require('tweakpane')

var img

const root = '../assets/insidious/'
let files = [
  'basquiat.warhol.00.jpeg',
  'basquiat.warhol.01.jpg',
  'basquiat.warhol.02.avif',
  'basquiat.warhol.03.jpg',
  'basquiat.warhol.04.webp',
  'basquiat.warhol.05.jpeg',

  'newspaper.00.webp',
  'newspaper.01.jpg',
  'newspaper.02.jpg',
  'newspaper.03.jpg',
  'newspaper.04.jpg',

  'mona-lisa-6195291.png',
  'polychrome.text.20240503.131611.png',
  'polychrome.text.20240509.142845.png',
  'hindle.texture.jpg'
].map(f => root + f)

const displayModes = {
  MIRRORED: 'mirrored',
  NORMAL_GRID: 'grid',
  INSET: 'inset',
  NOISE_INSET: 'noise_inset'
}

let observe

const FADE_DIRECTION = {
  IN: -1,
  OUT: 1,
  NONE: 0
}

let params = {
  displayMode: displayModes.NOISE_INSET,
  delay: false,
  fade: {
    frameLength: 20,
    currFrame: 0,
    direction: FADE_DIRECTION.NONE
  },
  changeSize: false,
  minSectionSize: 10,
  maxSectionSize: 0,
  sectionSize: 50,
  section: {
    size: 0,
    xSpeed: 0.001,
    ySpeed: 0.001,
    sizeSpeed: 0.0001
  },
  inset: {
    x: 0.001,
    y: 0.001,
    z: Math.random() * 1000,
    zSpeed: 0.001,
    factor: 1.0,
    scale: 1.0,
    scaleMin: 0.01,
    scaleMax: 1.0
  },
  zoom: 1.0,
  offset: 1.0,
  delayOffset: Math.random() * 1000,
  delayOffsetSpeed: 0.001,
  imageIdx: Math.floor(Math.random() * files.length),
  showObserver: false
}

const pane = new Pane()

function setupGUI (pane) {
  pane.addInput(params, 'displayMode', { options: displayModes })
  pane.addInput(params, 'zoom', { min: 0.01, max: 10, step: 0.01 })
  pane.addInput(params, 'showObserver').on('change', ({ value }) => {
    observe.canvas.style.display = value ? 'block' : 'none'
    observe.canvas.style.margin = '0 0 0 50px'
  })

  let insetFolder = pane.addFolder({ title: 'Inset' })
  insetFolder.addInput(params.inset, 'x', { min: -2, max: 2, step: 0.0001 })
  insetFolder.addInput(params.inset, 'y', { min: -2, max: 2, step: 0.0001 })
  insetFolder.addInput(params.inset, 'zSpeed', { min: -0.01, max: 0.01, step: 0.0001 })
  insetFolder.addMonitor(params.inset, 'z', { readonly: true })
  insetFolder.addMonitor(params.inset, 'scale', { readonly: true })
  // factor has the biggest impact on size of the inset/resultant square-size
  // but I need a better range
  // once it goes negative the FX are neat, but upside down
  insetFolder.addInput(params.inset, 'factor', { min: -1, max: 4, step: 0.01 })
  insetFolder.addInput(params.inset, 'scaleMin', { min: 0.01, max: 0.9, step: 0.01 })
  insetFolder.addInput(params.inset, 'scaleMax', { min: 0.01, max: 1.0, step: 0.01 })


  let fadeFolder = pane.addFolder({ title: 'fade' })
  fadeFolder.addInput(params.fade, 'frameLength', { min: 1, max: 200, step: 1 })
  fadeFolder.addButton({ title: 'Fade in' }).on('click', () => {
    params.fade.currFrame = params.fade.frameLength
    params.fade.direction = FADE_DIRECTION.IN
  })
  fadeFolder.addButton({ title: 'Fade out' }).on('click', () => {
    params.fade.currFrame = 0
    params.fade.direction = FADE_DIRECTION.OUT
  })

  let delayFolder = pane.addFolder({ title: 'Delay' })
  delayFolder.addInput(params, 'delay')
  delayFolder.addInput(params, 'offset', { min: 0.01, max: 2, step: 0.01 })
  delayFolder.addInput(params, 'delayOffsetSpeed', {
    min: -0.03,
    max: 0.03,
    step: 0.0001
  })
  // this is really a z-value for noise-making
  delayFolder.addMonitor(params, 'delayOffset', { readonly: true })

  let sizeFolder = pane.addFolder({ title: 'Section Size' })
  sizeFolder.addInput(params, 'changeSize')
  sizeFolder.addInput(params.section, 'sizeSpeed', {
    min: -0.03,
    max: 0.03,
    step: 0.0001
  })
  sizeFolder.addInput(params, 'minSectionSize', { min: 20, max: 400, step: 1 })
  sizeFolder.addInput(params, 'maxSectionSize', { min: 20, max: 800, step: 1 })
  sizeFolder.addInput(params.section, 'xSpeed', {
    title: 'width speed',
    min: -0.03,
    max: 0.03,
    step: 0.0001
  })
  sizeFolder.addInput(params.section, 'ySpeed', {
    title: 'height speed',
    min: -0.03,
    max: 0.03,
    step: 0.0001
  })

  sizeFolder.addMonitor(params, 'sectionSize', { readonly: true })
}

const preload = p5 => {
  img = p5.loadImage(files[params.imageIdx])
}

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  // Turn on a render loop
  animate: true,
  dimensions: [800, 800],
  prefix: 'insidious'
}

canvasSketch(({ p5, render, canvas }) => {
  setupGUI(pane)
  let section = null

  observe = p5.createGraphics(img.width / 4, img.height / 4)
  observe.noFill()

  let noiseOffset = p5.createVector(
    Math.random() * 1000,
    Math.random() * 1000 + 1000,
    Math.random() * 1000 + 2000
  )

  section = p5.createVector(
    Math.floor(img.width / 2),
    Math.floor(img.height / 2)
  )
  params.maxSectionSize = p5.width / 4 // Assuming width and height are equal, otherwise use min(width, height) / 4

  // Attach the drop event handler to the canvas element
  canvas.addEventListener('drop', event => {
    event.preventDefault()
    for (const item of event.dataTransfer.items) {
      if (item.kind === 'file') {
        let data = URL.createObjectURL(item.getAsFile())
        p5.loadImage(data, image => {
          img = image
          render()
        })
      }
    }
  })

  // Prevent the default behavior for dragover events
  canvas.addEventListener('dragover', event => {
    event.preventDefault()
  })

  p5.keyPressed = () => {
    // mode invariant
    if (p5.key === 'n' || p5.key === 'N') {
      const direction = p5.key === 'N' ? -1 : 1
      params.imageIdx = (params.imageIdx + direction) % files.length
      p5.loadImage(files[params.imageIdx], newImage => {
        img = newImage
        observe.resizeCanvas(img.width / 4, img.height / 4)
      })
    } else if (p5.key === 'r') {
      render()
    } else if (p5.key === 'm') {
      let modes = Object.values(displayModes)
      let currentModeIndex = modes.indexOf(params.displayMode)
      params.displayMode =
        currentModeIndex < modes.length - 1
          ? modes[currentModeIndex + 1]
          : modes[0]
    }
  }

  params.sectionSize = p5.width / 10

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, animate, width, height }) => {
    pane.refresh()

    p5.background(0)

    // // Use Perlin noise to smoothly vary the section size
    // do not use Math.round|floor|ceil - it leads to discontinuous jumps
    // it may only be a single pixel, but it is added across all grid elements
    // sub-pixel rendering seems to do the trick smoothly
    // w/ no noticable loss of speed
    if (params.changeSize) {
      params.sectionSize = p5.map(
        p5.noise(noiseOffset.z),
        0,
        1,
        params.minSectionSize,
        params.maxSectionSize
      )
    }

    section.x = p5.map(
      p5.noise(noiseOffset.x),
      0,
      1,
      0,
      img.width - params.sectionSize
    )
    section.y = p5.map(
      p5.noise(noiseOffset.y),
      0,
      1,
      0,
      img.height - params.sectionSize
    )

    if (params.showObserver) {
      observe.image(img, 0, 0, img.width / 4, img.height / 4)
      observe.rect(
        section.x / 4,
        section.y / 4,
        params.sectionSize / 4 / params.zoom,
        params.sectionSize / 4 / params.zoom
      )
    }

    if (params.fade.direction !== FADE_DIRECTION.NONE) {
      params.fade.currFrame += params.fade.direction

      if (
        params.fade.direction === FADE_DIRECTION.OUT &&
        params.fade.currFrame >= params.fade.frameLength
      ) {
        params.fade.direction = FADE_DIRECTION.NONE
      } else if (
        params.fade.direction === FADE_DIRECTION.IN &&
        params.fade.currFrame <= 0
      ) {
        params.fade.direction = FADE_DIRECTION.NONE
      }
    }

    switch (params.displayMode) {
      case displayModes.MIRRORED:
        mirrorGrid(width, params.sectionSize, height, p5, section)
        break
      case displayModes.NORMAL_GRID:
        justAGrid(
          width,
          height,
          params.sectionSize,
          p5,
          section,
          params.fade.frameLength,
          params.fade.currFrame
        )
        break
      case displayModes.INSET:
        justAGridWithInset(width, height, params.sectionSize, p5, section)
        break
      case displayModes.NOISE_INSET:
        gridWithNoiseInset(width, height, params.sectionSize, p5, section)
        break
    }

    // Increment noise offsets for the next frame
    noiseOffset.add(
      params.section.xSpeed,
      params.section.ySpeed,
      params.section.sizeSpeed
    )
  }

  function justAGrid (
    width,
    height,
    sectionSize,
    p5,
    section,
    fadeFrames = 0,
    currentFrame = 0
  ) {
    let offset = noiseOffset.copy()
    let slowOffset = noiseOffset.copy()

    for (let y = 0; y < height; y += sectionSize) {
      for (let x = 0; x < width; x += sectionSize) {
        const scaleFactor = p5.map(currentFrame, 0, fadeFrames, 1, 0)

        if (params.delay) {
          let offsetx =
            p5.noise(x * 0.001, y * 0.001, params.delayOffset) * params.offset
          let offsety =
            p5.noise(x * 0.001, y * 0.001, params.delayOffset + 1000) *
            params.offset
          section.x = p5.map(
            p5.noise(offset.x),
            0,
            1,
            0,
            (img.width - sectionSize) * offsetx
          )

          section.y = p5.map(
            p5.noise(offset.y),
            0,
            1,
            0,
            (img.height - sectionSize) * offsety
          )
        }
        p5.push()
        p5.translate(x + sectionSize / 2, y + sectionSize / 2)
        p5.scale(scaleFactor)

        p5.image(
          img,
          -sectionSize / 2,
          -sectionSize / 2,
          sectionSize,
          sectionSize,
          section.x,
          section.y,
          sectionSize / params.zoom,
          sectionSize / params.zoom
        )
        p5.pop()
        if (params.delay) {
          offset.add(0.01, 0.01, 0)
        }
      }
      if (params.delay) {
        slowOffset.add(0.01, 0.01, 0)
        offset = slowOffset.copy()
      }
    }
    params.delayOffset += params.delayOffsetSpeed
  }

  // TODO: dist from center matches the bok-cover idea
  // a function based on 2D perlin noise would something else
  // pass in the offset function?
  function justAGridWithInset (width, height, sectionSize, p5, section) {
    const centerX = width / 2
    const centerY = height / 2
    const maxDistance = p5.dist(0, 0, centerX, centerY)

    let offset = noiseOffset.copy()
    let slowOffset = noiseOffset.copy()

    for (let y = 0; y < height; y += sectionSize) {
      for (let x = 0; x < width; x += sectionSize) {
        const distanceFromCenter = p5.dist(
          x + sectionSize / 2,
          y + sectionSize / 2,
          centerX,
          centerY
        )
        const scaleFactor = p5.map(distanceFromCenter, 0, maxDistance, 1, 0)

        if (params.delay) {
          let offsetx =
            p5.noise(x * 0.001, y * 0.001, params.delayOffset) * params.offset
          let offsety =
            p5.noise(x * 0.001, y * 0.001, params.delayOffset + 1000) *
            params.offset
          section.x = p5.map(
            p5.noise(offset.x),
            0,
            1,
            0,
            (img.width - sectionSize) * offsetx
          )

          section.y = p5.map(
            p5.noise(offset.y),
            0,
            1,
            0,
            (img.height - sectionSize) * offsety
          )
        }
        p5.push()
        p5.translate(x + sectionSize / 2, y + sectionSize / 2)
        p5.scale(scaleFactor)

        p5.image(
          img,
          -sectionSize / 2,
          -sectionSize / 2,
          sectionSize,
          sectionSize,
          section.x,
          section.y,
          sectionSize / params.zoom,
          sectionSize / params.zoom
        )
        p5.pop()
        if (params.delay) {
          offset.add(0.01, 0.01, 0)
        }
      }
      if (params.delay) {
        slowOffset.add(0.01, 0.01, 0)
        offset = slowOffset.copy()
      }
    }
    params.delayOffset += params.delayOffsetSpeed
  }

  // TODO: implement fade
  // oh, wait. sigh.
  function gridWithNoiseInset (width, height, sectionSize, p5, section) {
    const centerX = width / 2
    const centerY = height / 2
    const maxDistance = p5.dist(0, 0, centerX, centerY)

    let offset = noiseOffset.copy()
    let slowOffset = noiseOffset.copy()

    let maxScale = 0
    let minScale = 1

    // TODO: calculate scaleFactors
    let scaleMatrix = {}
    for (let y = 0; y < height; y += sectionSize) {
      for (let x = 0; x < width; x += sectionSize) {
        // TODO: to get a more controllable range
        // generate all squares and their scaleFactors
        // THEM re-map them with min/max into the desired range
        const scaleFactor = p5.map(
          p5.noise(x * params.inset.x + 1000, y * params.inset.y + 1000, params.inset.z) *
            params.inset.factor,
          0,
          1, // maxDistance,
          1,
          0.1
        )
        scaleMatrix[`${y}-${x}`] = { scale: scaleFactor }
        // will go negative is the noise value is out of the source range
        params.inset.scale = scaleFactor
        maxScale = Math.max(maxScale, scaleFactor)
        minScale = Math.min(minScale, scaleFactor)
      }
    }

    Object.keys(scaleMatrix).forEach(key => {
      scaleMatrix[key].remap = p5.map(scaleMatrix[key].scale, minScale, maxScale, params.inset.scaleMax, params.inset.scaleMin)
    })
    // console.log(JSON.stringify(scaleMatrix))

    for (let y = 0; y < height; y += sectionSize) {
      for (let x = 0; x < width; x += sectionSize) {
        // const scaleFactor = p5.map(scaleMatrix[`${y}-${x}`].scale, minScale, maxScale, 1, 0.01)
        const scaleFactor = scaleMatrix[`${y}-${x}`].remap
        // // will go negative is the noise value is out of the source range
        params.inset.scale = scaleFactor

        if (params.delay) {
          let offsetx =
            p5.noise(x * 0.001, y * 0.001, params.delayOffset) * params.offset
          let offsety =
            p5.noise(x * 0.001, y * 0.001, params.delayOffset + 1000) *
            params.offset
          section.x = p5.map(
            p5.noise(offset.x),
            0,
            1,
            0,
            (img.width - sectionSize) * offsetx
          )

          section.y = p5.map(
            p5.noise(offset.y),
            0,
            1,
            0,
            (img.height - sectionSize) * offsety
          )
        }
        p5.push()
        p5.translate(x + sectionSize / 2, y + sectionSize / 2)
        p5.scale(scaleFactor)

        p5.image(
          img,
          -sectionSize / 2,
          -sectionSize / 2,
          sectionSize,
          sectionSize,
          section.x,
          section.y,
          sectionSize / params.zoom,
          sectionSize / params.zoom
        )
        p5.pop()
        if (params.delay) {
          offset.add(0.01, 0.01, 0)
        }
      }
      if (params.delay) {
        slowOffset.add(0.01, 0.01, 0)
        offset = slowOffset.copy()
      }
    }
    params.delayOffset += params.delayOffsetSpeed
    params.inset.z += params.inset.zSpeed
    // console.log(maxScale, minScale)
  }

  function mirrorGrid (width, sectionSize, height, p5, section) {
    let offset = noiseOffset.copy()
    let slowOffset = noiseOffset.copy()
    // internal to mirrorGrid ONLY
    const imagify = (x, y) => {
      p5.image(
        img,
        x,
        y,
        sectionSize,
        sectionSize,
        section.x,
        section.y,
        sectionSize / params.zoom,
        sectionSize / params.zoom
      )
    }

    for (let x = 0; x < width; x += sectionSize * 2) {
      // Multiply by 2 to cover half the canvas width per iteration
      for (let y = 0; y < height; y += sectionSize * 2) {
        if (params.delay) {
          let offsetx =
            p5.noise(x * 0.001, y * 0.001, params.delayOffset) * params.offset
          let offsety =
            p5.noise(x * 0.001, y * 0.001, params.delayOffset + 1000) *
            params.offset
          section.x = p5.map(
            p5.noise(offset.x),
            0,
            1,
            0,
            (img.width - sectionSize) * offsetx
          )
          section.y = p5.map(
            p5.noise(offset.y),
            0,
            1,
            0,
            (img.height - sectionSize) * offsety
          )
        }

        // Same for height
        // Top-left quadrant (normal)
        imagify(x, y)

        // Top-right quadrant (left-right flipped)
        p5.push()
        p5.translate(x + sectionSize * 2, y) // Move origin to the right edge of the current section
        p5.scale(-1, 1) // Flip horizontally
        imagify(0, 0)
        p5.pop()

        // Bottom-left quadrant (up-down flipped)
        p5.push()
        p5.translate(x, y + sectionSize * 2) // Move origin to the bottom edge of the current section
        p5.scale(1, -1) // Flip vertically
        imagify(0, 0)
        p5.pop()

        // Bottom-right quadrant (left-right and up-down flipped)
        p5.push()
        p5.translate(x + sectionSize * 2, y + sectionSize * 2) // Move origin to the bottom right corner of the current section
        p5.scale(-1, -1) // Flip both horizontally and vertically
        imagify(0, 0)
        p5.pop()
        if (params.delay) {
          offset.add(0.01, 0.01, 0)
        }
      }
      slowOffset.add(0.01, 0.01, 0)
      offset = slowOffset.copy()
    }
    params.delayOffset += params.delayOffsetSpeed
  }
}, settings)
