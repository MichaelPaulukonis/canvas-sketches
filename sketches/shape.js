import Point from './point.js'

// interface suggested by https://schultzschultz.com/stretch/
let interfaceSW = 3

// Define a Shape class to hold a collection of Vectors
// also look @ /Users/michaelpaulukonis/projects/bh_sketchbook/ctxjs/common/shapes/rectangle.js
class Shape {
  constructor (ctx) {
    this.points = []
    this.cutout = null
    this.context = ctx
    this.isOpen = true
  }

  addVector (x, y) {
    let newPoint = new Point(x, y, this.context)
    if (
      this.points.length === 0 ||
      this.points[this.points.length - 1].distTo(newPoint) !== 0
    ) {
      this.points.push(newPoint)
    }
  }

  isPointInPolygon (px, py) {
    let isInside = false
    let j = this.points.length - 1

    for (let i = 0; i < this.points.length; j = i++) {
      const x1 = this.points[i].x
      const y1 = this.points[i].y
      const x2 = this.points[j].x
      const y2 = this.points[j].y

      const intersect =
        y1 > py !== y2 > py && px < ((x2 - x1) * (py - y1)) / (y2 - y1) + x1

      if (intersect) {
        isInside = !isInside
      }
    }

    return isInside
  }

  draw (mousePoint, ctx = this.context) {
    ctx.strokeJoin(ctx.ROUND)
    ctx.strokeWeight(interfaceSW)
    ctx.stroke('black')
    ctx.noFill()
    ctx.beginShape()
    for (let p of this.points) {
      ctx.vertex(p.x, p.y)
    }
    if (mousePoint && this.isOpen) {
      ctx.vertex(mousePoint.x, mousePoint.y)
    }

    ctx.endShape(ctx.CLOSE)

    ctx.beginShape()
    ctx.strokeWeight(interfaceSW * 5)

    for (let p of this.points) {
      if (mousePoint && !this.isOpen) {
        const d = ctx.dist(mousePoint.x, mousePoint.y, p.x, p.y)
        const threshold = 10 // Adjust this value to change the hover radius
        ctx.stroke(d < threshold ? 'red' : 'black')
      }
      ctx.point(p.x, p.y)
      ctx.stroke('black')
      if (mousePoint && this.isOpen) {
        ctx.vertex(mousePoint.x, mousePoint.y)
      }
    }
    ctx.endShape(ctx.CLOSE)
  }

  // better name
  makeCutout (imgOriginal, ctx = this.context) {
    ctx.clear()
    let myShape = ctx.createGraphics(ctx.width, ctx.height)
    myShape.fill(204)
    myShape.strokeWeight(0)
    myShape.beginShape()
    for (let p of this.points) {
      myShape.vertex(p.x, p.y)
    }
    myShape.endShape(ctx.CLOSE)
    myShape.drawingContext.globalCompositeOperation = 'source-in'

    myShape.image(imgOriginal, 0, 0)
    var img = ctx.createImage(myShape.width, myShape.height)
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

export default Shape