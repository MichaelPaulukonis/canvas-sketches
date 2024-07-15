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

    this.dragEnabled = false;
    this.dragArea = this;
    this.dragOffset = undefined;
    this.isDragged = false;
    // this.fillColor = color(80);
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

  handleMousePressed(ctx = this.context){
    const pointPressed = this.points.find(p => p.containsXY(ctx.mouseX, ctx.mouseY));

    if (pointPressed){
      pointPressed.isBeingDragged = true;
      this.isDragged = true;
      return true;
    } else {
      const dragAreaPressed = this.isPointInPolygon(ctx.mouseX, ctx.mouseY);
      if (dragAreaPressed){
        this.isDragged = true;
        this.dragOffset = new Point(ctx.mouseX, ctx.mouseY, ctx);
        return true;
      }
    }
    return false;
  }

  handleMouseDragged(ctx = this.context){
    const pointDragged = this.points.find(p => p.isBeingDragged);

    if (pointDragged) {
      pointDragged.set(ctx.mouseX, ctx.mouseY);

      if (this.topLeft == pointDragged) {
        this.bottomLeft.x = pointDragged.x;
        this.topRight.y = pointDragged.y;

      } else if (this.topRight == pointDragged) {
        this.bottomRight.x = pointDragged.x;
        this.topLeft.y = pointDragged.y;

      } else if (this.bottomRight == pointDragged) {
        this.topRight.x = pointDragged.x;
        this.bottomLeft.y = pointDragged.y;

      } else if (this.bottomLeft == pointDragged) {
        this.topLeft.x = pointDragged.x;
        this.bottomRight.y = pointDragged.y;
      }
      // this.computePosAndSize();
    } else {
      let mover = new Point(ctx.mouseX - this.dragOffset.x, ctx.mouseY - this.dragOffset.y, ctx)
      this.points.forEach(p => p.add(mover))
    }
  }

  handleMouseReleased(){
    this.points.forEach(p => { p.isBeingDragged = false; });
    this.isDragged = false;
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
