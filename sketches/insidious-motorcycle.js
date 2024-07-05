// from https://github.com/mattdesl/canvas-sketch/issues/132#issuecomment-2093335634

// the name comes from an auto-generated default in editor.p5.org

const canvasSketch = require('canvas-sketch')
import p5 from 'p5'
import { Pane } from 'tweakpane'

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
]

const minSectionSize = 10
const displayModes = {
  MIRRORED: 'mirrored',
  NORMAL_GRID: 'grid',
  DELAY_GRID: 'delay'
}

let config = {
  displayMode: displayModes.DELAY_GRID,
  minSectionSize: 10,
  sectionSize: 50,
  zoom: 1.0,
  offset: 1.0
}

const pane = new Pane()
 
pane.addInput(config, 'displayMode', { options: displayModes })
pane.addInput(config, 'minSectionSize', { min: 5, max: 50, step: 1 })
pane.addInput(config, 'sectionSize', { min: 10, max: 500, step: 1 })
pane.addInput(config, 'zoom', { min: 0.01, max: 10, step: 0.01 })
pane.addInput(config, 'offset', { min: 0.01, max: 2, step: 0.01 })

const preload = p5 => {
  img = p5.loadImage(root + p5.random(files))
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
  let section = null

  let noiseOffset = p5.createVector(0, 1000, 2000)
  var maxSectionSize

  section = p5.createVector(
    Math.floor(img.width / 2),
    Math.floor(img.height / 2)
  )
  maxSectionSize = p5.width / 4 // Assuming width and height are equal, otherwise use min(width, height) / 4

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
    if (p5.key === 'n') {
      img = p5.loadImage(root + p5.random(files))
      p5.loadImage(root + p5.random(files), newImage => {
        img = newImage
      })
    } else if (p5.key === 'r') {
      render()
    } else if (p5.key === 'm') {
      let modes = Object.values(displayModes)
      let currentModeIndex = modes.indexOf(config.displayMode)
      config.displayMode =
        currentModeIndex < modes.length - 1
          ? modes[currentModeIndex + 1]
          : modes[0]
    }
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, animate, width, height }) => {
    pane.refresh()

    p5.background(0)

    // Use Perlin noise to smoothly vary the section size
    config.sectionSize = Math.floor(
      p5.map(
        p5.noise(noiseOffset.z),
        0,
        1,
        config.minSectionSize,
        maxSectionSize
      )
    )
    section.x = Math.floor(
      p5.map(p5.noise(noiseOffset.x), 0, 1, 0, img.width - config.sectionSize)
    )
    section.y = Math.floor(
      p5.map(p5.noise(noiseOffset.y), 0, 1, 0, img.height - config.sectionSize)
    )

    switch (config.displayMode) {
      case displayModes.MIRRORED:
        mirrorGrid(width, config.sectionSize, height, p5, section)
        break
      case displayModes.NORMAL_GRID:
        normalGrid(width, config.sectionSize, height, p5, section)
        break
      case displayModes.DELAY_GRID:
        delayGrid(width, config.sectionSize, height, p5, section)
        break
    }

    // Increment noise offsets for the next frame
    noiseOffset.add(0.01, 0.01, 0.001)
  }

  function delayGrid (width, sectionSize, height, p5, section) {
    let offset = noiseOffset.copy()
    let slowOffset = noiseOffset.copy()
    for (let y = 0; y < height; y += sectionSize) {
      for (let x = 0; x < width; x += sectionSize) {
        // how can I make this larger/smaller while still random
        // maybe img.width - sectionSize * a thing like zoom
        section.x = Math.floor(
          p5.map(p5.noise(offset.x), 0, 1, 0, (img.width - sectionSize) * config.offset)
        )
        section.y = Math.floor(
          p5.map(p5.noise(offset.y), 0, 1, 0, (img.height - sectionSize) * config.offset)
        )
        p5.image(
          img,
          x,
          y,
          sectionSize,
          sectionSize,
          section.x,
          section.y,
          sectionSize / config.zoom,
          sectionSize / config.zoom
        )
        offset.add(0.01, 0.01, 0)
      }
      slowOffset.add(0.01, 0.01, 0)
      offset = slowOffset.copy()
    }
  }
}, settings)

function normalGrid (width, sectionSize, height, p5, section) {
  for (let x = 0; x < width; x += sectionSize) {
    for (let y = 0; y < height; y += sectionSize) {
      p5.image(
        img,
        x,
        y,
        sectionSize,
        sectionSize,
        section.x,
        section.y,
        sectionSize / config.zoom,
        sectionSize / config.zoom
      )
    }
  }
}

function mirrorGrid (width, sectionSize, height, p5, section) {
  for (let x = 0; x < width; x += sectionSize * 2) {
    // Multiply by 2 to cover half the canvas width per iteration
    for (let y = 0; y < height; y += sectionSize * 2) {
      // Same for height
      // Top-left quadrant (normal)
      p5.image(
        img,
        x,
        y,
        sectionSize,
        sectionSize,
        section.x,
        section.y,
        sectionSize / config.zoom,
        sectionSize / config.zoom
      )

      // Top-right quadrant (left-right flipped)
      p5.push()
      p5.translate(x + sectionSize * 2, y) // Move origin to the right edge of the current section
      p5.scale(-1, 1) // Flip horizontally
      p5.image(
        img,
        0,
        0,
        sectionSize,
        sectionSize,
        section.x,
        section.y,
        sectionSize / config.zoom,
        sectionSize / config.zoom
      )
      p5.pop()

      // Bottom-left quadrant (up-down flipped)
      p5.push()
      p5.translate(x, y + sectionSize * 2) // Move origin to the bottom edge of the current section
      p5.scale(1, -1) // Flip vertically
      p5.image(
        img,
        0,
        0,
        sectionSize,
        sectionSize,
        section.x,
        section.y,
        sectionSize / config.zoom,
        sectionSize / config.zoom
      )
      p5.pop()

      // Bottom-right quadrant (left-right and up-down flipped)
      p5.push()
      p5.translate(x + sectionSize * 2, y + sectionSize * 2) // Move origin to the bottom right corner of the current section
      p5.scale(-1, -1) // Flip both horizontally and vertically
      p5.image(
        img,
        0,
        0,
        sectionSize,
        sectionSize,
        section.x,
        section.y,
        sectionSize / config.zoom,
        sectionSize / config.zoom
      )
      p5.pop()
    }
  }
}
