// from https://github.com/mattdesl/canvas-sketch/issues/132#issuecomment-2093335634

// the name comes from an auto-generated default in editor.p5.org

const canvasSketch = require('canvas-sketch')
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
]

const displayModes = {
  MIRRORED: 'mirrored',
  NORMAL_GRID: 'grid',
  DELAY_GRID: 'delay'
}

let params = {
  displayMode: displayModes.DELAY_GRID,
  minSectionSize: 10,
  maxSectionSize: 0,
  sectionSize: 50,
  zoom: 1.0,
  offset: 1.0,
  delayOffset: Math.random() * 1000,
  delayOffsetSpeed: 0.001
}

const pane = new Pane()

pane.addInput(params, 'displayMode', { options: displayModes })
pane.addInput(params, 'minSectionSize', { min: 20, max: 400, step: 1 })
pane.addInput(params, 'maxSectionSize', { min: 20, max: 800, step: 1 })
pane.addMonitor(params, 'sectionSize', { readonly: true })
pane.addInput(params, 'zoom', { min: 0.01, max: 10, step: 0.01 })
pane.addInput(params, 'offset', { min: 0.01, max: 2, step: 0.01 })
pane.addInput(params, 'delayOffsetSpeed', {
  min: -0.03,
  max: 0.03,
  step: 0.0001
})

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
    if (p5.key === 'n') {
      img = p5.loadImage(root + p5.random(files))
      p5.loadImage(root + p5.random(files), newImage => {
        img = newImage
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

  // Use Perlin noise to smoothly vary the section size
  params.sectionSize = Math.floor(
    p5.map(
      p5.noise(noiseOffset.z),
      0,
      1,
      params.minSectionSize,
      params.maxSectionSize
    )
  )

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, animate, width, height }) => {
    pane.refresh()

    p5.background(0)

    // // Use Perlin noise to smoothly vary the section size
    // except there are some big jumps, sometimes.
    // which are jarring
    // this seems to be the culprit, because if we move it OUTSIDE
    // of the render loop, there's not herky-jerking
    // params.sectionSize = Math.floor(
    //   p5.map(
    //     p5.noise(noiseOffset.z),
    //     0,
    //     1,
    //     params.minSectionSize,
    //     params.maxSectionSize
    //   )
    // )
    section.x = Math.floor(
      p5.map(p5.noise(noiseOffset.x), 0, 1, 0, img.width - params.sectionSize)
    )
    section.y = Math.floor(
      p5.map(p5.noise(noiseOffset.y), 0, 1, 0, img.height - params.sectionSize)
    )

    switch (params.displayMode) {
      case displayModes.MIRRORED:
        mirrorGrid(width, params.sectionSize, height, p5, section)
        break
      case displayModes.NORMAL_GRID:
        normalGrid(width, params.sectionSize, height, p5, section)
        break
      case displayModes.DELAY_GRID:
        delayGrid(width, params.sectionSize, height, p5, section)
        break
    }

    // Increment noise offsets for the next frame
    noiseOffset.add(0.001, 0.001, 0.0001)
  }

  function delayGrid (width, sectionSize, height, p5, section) {
    let offset = noiseOffset.copy()
    let slowOffset = noiseOffset.copy()
    for (let y = 0; y < height; y += sectionSize) {
      for (let x = 0; x < width; x += sectionSize) {
        let offsetx =
          p5.noise(x * 0.001, y * 0.001, params.delayOffset) * params.offset
        let offsety =
          p5.noise(x * 0.001, y * 0.001, params.delayOffset + 1000) *
          params.offset
        section.x = Math.floor(
          p5.map(
            p5.noise(offset.x),
            0,
            1,
            0,
            (img.width - sectionSize) * offsetx
          )
        )
        section.y = Math.floor(
          p5.map(
            p5.noise(offset.y),
            0,
            1,
            0,
            (img.height - sectionSize) * offsety
          )
        )
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
        offset.add(0.01, 0.01, 0)
      }
      slowOffset.add(0.01, 0.01, 0)
      offset = slowOffset.copy()
    }
    params.delayOffset += params.delayOffsetSpeed
  }

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
          sectionSize / params.zoom,
          sectionSize / params.zoom
        )
      }
    }
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
        let offsetx =
          p5.noise(x * 0.001, y * 0.001, params.delayOffset) * params.offset
        let offsety =
          p5.noise(x * 0.001, y * 0.001, params.delayOffset + 1000) *
          params.offset
        section.x = Math.floor(
          p5.map(
            p5.noise(offset.x),
            0,
            1,
            0,
            (img.width - sectionSize) * offsetx
          )
        )
        section.y = Math.floor(
          p5.map(
            p5.noise(offset.y),
            0,
            1,
            0,
            (img.height - sectionSize) * offsety
          )
        )

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
      }
      slowOffset.add(0.01, 0.01, 0)
      offset = slowOffset.copy()
    }
    params.delayOffset += params.delayOffsetSpeed
  }
}, settings)
