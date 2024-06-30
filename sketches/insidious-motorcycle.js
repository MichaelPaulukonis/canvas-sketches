// from https://github.com/mattdesl/canvas-sketch/issues/132#issuecomment-2093335634

// the name comes from an auto-generated default in editor.p5.org

const canvasSketch = require('canvas-sketch')
// const p5 = require('p5')
import p5 from 'p5'
import { File } from 'p5'

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
  let sx = 0 // X-coordinate for the top left corner of the section
  let sy = 0 // Y-coordinate for the top left corner of the section
  let section = null
  let direction = null
  // Initialize noise offsets for x and y directions
  let noiseOffsetX = 0
  let noiseOffsetY = 1000 // Start at a different position to ensure x and y vary differently
  let noiseOffsetSize = 2000
  const minSectionSize = 10
  var maxSectionSize
  let config = {
    oneStep: false
  }

  direction = p5.createVector(0.5, 0.5)
  section = p5.createVector(
    Math.floor(img.width / 2),
    Math.floor(img.height / 2)
  )
  maxSectionSize = p5.width / 4 // Assuming width and height are equal, otherwise use min(width, height) / 4

  // Attach the drop event handler to the canvas element
  canvas.addEventListener('drop', (event) => {
    event.preventDefault()
    for (const item of event.dataTransfer.items) {
      if (item.kind === 'file') {
      let data = URL.createObjectURL(item.getAsFile());
        p5.loadImage(data, image => {
          img = image
          render()
        })
      }
    }
  })

    // Prevent the default behavior for dragover events
    canvas.addEventListener('dragover', (event) => {
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
    }
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, animate, width, height }) => {
    p5.background(220)

    // Use Perlin noise to smoothly vary the section size
    const sectionSize = Math.floor(
      p5.map(p5.noise(noiseOffsetSize), 0, 1, minSectionSize, maxSectionSize)
    )
    section.x = Math.floor(
      p5.map(p5.noise(noiseOffsetX), 0, 1, 0, img.width - sectionSize)
    )
    section.y = Math.floor(
      p5.map(p5.noise(noiseOffsetY), 0, 1, 0, img.height - sectionSize)
    )

    // // Display the section of the image in a grid
    // for (let x = 0; x < width; x += sectionSize) {
    //   for (let y = 0; y < height; y += sectionSize) {
    //     p5.image(
    //       img,
    //       x,
    //       y,
    //       sectionSize,
    //       sectionSize,
    //       section.x,
    //       section.y,
    //       sectionSize,
    //       sectionSize
    //     );
    //   }
    // }

    // mirrored
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
          sectionSize,
          sectionSize
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
          sectionSize,
          sectionSize
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
          sectionSize,
          sectionSize
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
          sectionSize,
          sectionSize
        )
        p5.pop()
      }
    }

    // Increment noise offsets for the next frame
    noiseOffsetX += 0.01
    noiseOffsetY += 0.01
    noiseOffsetSize += 0.001
  }
}, settings)
