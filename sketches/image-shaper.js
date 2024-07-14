// originally @ https://editor.p5js.org/MichaelPaulukonis/sketches/cg_LK7asX

const canvasSketch = require('canvas-sketch')
var JSZip = require('jszip')
var FileSaver = require('file-saver')
import p5 from 'p5'

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
  // interface suggested by https://schultzschultz.com/stretch/  
  let interfaceSW = 3

  const activityModes = {
    Display: 'display',
    Selecting: 'selecting'
  }
  let activity = activityModes.Selecting
  let croppedVectors = []

  // Define a Shape class to hold a collection of Vectors
  class Shape {
    constructor () {
      this.vectors = []
      this.cutout = null
    }

    addVector (x, y) {
      let newVec = p5.createVector(x, y)
      if (
        this.vectors.length === 0 ||
        this.vectors[this.vectors.length - 1].dist(newVec) !== 0
      ) {
        this.vectors.push(newVec)
      }
    }

    draw () {
      p5.strokeJoin(p5.ROUND)
      p5.strokeWeight(interfaceSW)
      p5.stroke(0)
      p5.noFill()
      p5.beginShape()
      for (let v of this.vectors) {
        p5.vertex(v.x, v.y)
      }
      // global
      if (activity === activityModes.Selecting) {
        p5.vertex(p5.mouseX, p5.mouseY)
      }
      p5.endShape(p5.CLOSE)

      p5.beginShape()
      p5.strokeWeight(interfaceSW * 5)

      for (let v of this.vectors) {
        p5.point(v.x, v.y)
        p5.point(p5.mouseX, p5.mouseY)
      }
      p5.endShape(p5.CLOSE)
    }

    // better name
    makeCutout () {
      p5.clear()
      let myShape = p5.createGraphics(p5.width, p5.height)
      myShape.fill(204)
      myShape.strokeWeight(0)
      myShape.beginShape()
      for (let v of this.vectors) {
        myShape.vertex(v.x, v.y)
      }
      myShape.endShape(p5.CLOSE)
      myShape.drawingContext.globalCompositeOperation = 'source-in'

      myShape.image(imgOriginal, 0, 0)
      var img = p5.createImage(myShape.width, myShape.height)
      img.copy(
        myShape,
        0,
        0,
        myShape.width,
        myShape.height,
        0,
        0,
        myShape.width,
        myShape.height
      )
      this.cutout = img
    }
  }

  let selectionShape = new Shape()

  const reset = () => {
    update({
      dimensions: [imgOriginal.width, imgOriginal.height]
    });
    resize()
    p5.image(imgOriginal, p5.width / 2, p5.height / 2)
    activity = activityModes.Selecting
    selectionShape = new Shape()
  }

  p5.mousePressed = () => {
    if (activity === activityModes.Selecting) {
      p5.noCursor()
      selectionShape.addVector(p5.mouseX, p5.mouseY)
    }
  }

  p5.doubleClicked = () => {
    if (activity === activityModes.Selecting) {
      // doh! mousePressed has already fired TWICE, so this is a third time sigh
      selectionShape.addVector(p5.mouseX, p5.mouseY)
      selectionShape.makeCutout()
      activity = activityModes.Display
      p5.cursor()
      let { croppedImg, croppedVecs } = cropImageVecs(
        selectionShape.cutout,
        selectionShape.vectors
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
  }

  p5.keyPressed = () => {
    // mode invariant
    if (p5.key === 'r') {
      reset()
    } else if (p5.key === 's') {
      download()
    }
  }

  function cropImageVecs (img, vectors) {
    // use the shape vectors to get bounding box
    let left = img.width,
      right = 0,
      top = img.height,
      bottom = 0
    for (let v of vectors) {
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
    let croppedVecs = vectors.map(v => p5.createVector(v.x - left, v.y - top))
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
    const name =
    `IMG_${p5.year()}-${p5.month()}-${p5.day()}_${p5.hour()}-${p5.minute()}-${p5.second()}`
    saver(canvas, croppedVectors, name)
    console.log('downloaded ' + name)
  }

  reset()

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    p5.imageMode(p5.CENTER)
    if (activity === activityModes.Selecting) {
      p5.image(imgOriginal, p5.width / 2, p5.height / 2)
      selectionShape.draw()
    }
  }
}, settings)
