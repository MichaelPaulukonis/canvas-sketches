// originally @ https://editor.p5js.org/MichaelPaulukonis/sketches/cg_LK7asX

const canvasSketch = require('canvas-sketch')
var JSZip = require('jszip')
var FileSaver = require('file-saver')
import p5 from 'p5'
import Shape from './shape.js'

const root = '../assets/image-shaper/'
var imgOriginal

const preload = p5 => {
  imgOriginal = p5.loadImage(root + 'mona.dots.small.00.png')
}

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  dimensions: [800, 800],
  prefix: 'shaper',
  // Turn on a render loop
  animate: true,
  scaleToFit: true
}

canvasSketch(({ p5, canvas, resize, update }) => {
  p5.imageMode(p5.CENTER)

  const activityModes = {
    Editing: 'editing',
    Display: 'display',
    Selecting: 'selecting'
  }
  let activity = activityModes.Selecting
  let croppedVectors = []

  let selectionShape = new Shape(p5)

  const reset = () => {
    update({
      dimensions: [imgOriginal.width, imgOriginal.height]
    })
    resize()
    p5.image(imgOriginal, p5.width / 2, p5.height / 2)
    activity = activityModes.Selecting
    selectionShape = new Shape(p5)
  }

  p5.mousePressed = () => {
    if (activity === activityModes.Selecting) {
      p5.noCursor()
      selectionShape.addVector(p5.mouseX, p5.mouseY)
    } else if (activity === activityModes.Editing) {
      selectionShape.handleMousePressed()
      // move everything if dragging
      // if above a certain point, highlight and allow to move
      // actually, highlight s/b w/o pressed
    }
  }

  p5.mouseDragged = () => {
    if (activity === activityModes.Editing) {
      selectionShape.handleMouseDragged()
    }
  }

  p5.mouseReleased = () => {
    if (activity === activityModes.Editing) {
      selectionShape.handleMouseReleased()
    }
  }

  p5.doubleClicked = () => {
    if (activity === activityModes.Selecting) {
      selectionShape.addVector(p5.mouseX, p5.mouseY)
      selectionShape.isOpen = false
      activity = activityModes.Editing
      p5.cursor()
    }
  }

  const cropAndDisplay = () => {
    selectionShape.makeCutout(imgOriginal)
    activity = activityModes.Display
    p5.cursor()
    let { croppedImg, croppedVecs } = cropImageVecs(
      selectionShape.cutout,
      selectionShape.points
    )
    croppedVectors = croppedVecs
    p5.resizeCanvas(croppedImg.width, croppedImg.height)
    p5.clear()
    p5.image(
      croppedImg,
      p5.width / 2,
      p5.height / 2,
      croppedImg.width,
      croppedImg.height
    )
  }

  p5.keyPressed = () => {
    // mode invariant
    if (p5.key === 'r') {
      reset()
    } else if (p5.key === 's') {
      download()
    } else if (p5.key === 'c') {
      cropAndDisplay()
    }
  }

  function cropImageVecs (img, points) {
    // use the shape vectors to get bounding box
    let left = img.width,
      right = 0,
      top = img.height,
      bottom = 0
    for (let v of points) {
      left = Math.min(left, v.x)
      right = Math.max(right, v.x)
      top = Math.min(top, v.y)
      bottom = Math.max(bottom, v.y)
    }
    // to guard against zero-width/height images?
    // do it right
    let croppedImg = p5.createImage(right - left + 1, bottom - top + 1)
    croppedImg.copy(
      img,
      left,
      top,
      right - left + 1,
      bottom - top + 1,
      0,
      0,
      croppedImg.width,
      croppedImg.height
    )
    let croppedVecs = points.map(v => p5.createVector(v.x - left, v.y - top))
    return { croppedImg, croppedVecs }
  }

  // Attach the drop event handler to the canvas element
  canvas.addEventListener('drop', event => {
    event.preventDefault()
    for (const item of event.dataTransfer.items) {
      if (item.kind === 'file') {
        let data = URL.createObjectURL(item.getAsFile())
        p5.loadImage(data, image => {
          imgOriginal = image
          reset()
        })
      }
    }
  })

  // Prevent the default behavior for dragover events
  canvas.addEventListener('dragover', event => {
    event.preventDefault()
  })

  // zip containing image plus the vectors
  const saver = (canvas, vectors, name) => {
    var zip = new JSZip()
    canvas.toBlob(blob => {
      zip.file(name + '.png', blob)
      zip.file(name + '.json', JSON.stringify(vectors))
      zip.generateAsync({ type: 'blob' }).then(content => {
        FileSaver.saveAs(content, `${name}.zip`)
      })
    })
  }

  function download () {
    const name = `IMG_${p5.year()}-${p5.month()}-${p5.day()}_${p5.hour()}-${p5.minute()}-${p5.second()}`
    saver(canvas, croppedVectors, name)
    console.log('downloaded ' + name)
  }

  reset()

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    p5.cursor()
    if (activity === activityModes.Selecting) {
      p5.image(imgOriginal, p5.width / 2, p5.height / 2)
      selectionShape.draw({ x: p5.mouseX, y: p5.mouseY })
    } else if (activity === activityModes.Editing) {
      p5.image(imgOriginal, p5.width / 2, p5.height / 2)
      selectionShape.draw({ x: p5.mouseX, y: p5.mouseY })
      // if mouse is IN shape
      if (selectionShape.isPointInPolygon(p5.mouseX, p5.mouseY)) {
        p5.cursor('grab')
      }
      // if mouse is above a vector, highlight it
    }
  }
}, settings)
