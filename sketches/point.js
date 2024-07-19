// originally from https://github.com/brianhonohan/sketchbook
import { Vector } from 'p5'

export default class Point {
  constructor (x, y, ctx) {
    this.pos = ctx.createVector(x, y)
    this.radius = 10
    this.isBeingDragged = false
    this.dragEnabled = false
    this.context = ctx
  }

  get x () {
    return this.pos.x
  }
  get y () {
    return this.pos.y
  }
  set x (newVal) {
    this.pos.x = newVal
  }
  set y (newVal) {
    this.pos.y = newVal
  }

  set (x, y) {
    this.x = x
    this.y = y
  }

  distTo (otherPoint) {
    return this.context.dist(this.x, this.y, otherPoint.x, otherPoint.y)
  }

  move (x, y) {
    this.x += x
    this.y += y
  }

  add (point) {
    this.x += point.x
    this.y += point.y
  }

  // static get ALIGN_MODE_MOVE_1() { return 0; }
  // static get ALIGN_MODE_MOVE_2() { return 1; }
  static get ALIGN_MODE_MOVE_3 () {
    return 2
  }
  static get ALIGN_MODE_AVERAGE () {
    return 3
  }

  static align (p1, p2, p3, mode) {
    mode = mode ? mode : Point.ALIGN_MODE_MOVE_3

    let vec12 = this.context.createVector(p2.x - p1.x, p2.y - p1.y)
    let vec21 = this.context.createVector(p1.x - p2.x, p1.y - p2.y)
    let vec23 = this.context.createVector(p3.x - p2.x, p3.y - p2.y)

    let heading12 = vec12.heading()
    let heading23 = vec23.heading()

    // let angBtw = vec21.angleBetween(vec23);
    // console.log(`angBtw: ${angBtw}, heading diff: ${heading12 - heading23}`);

    switch (mode) {
      case Point.ALIGN_MODE_MOVE_3:
        vec23.rotate(heading12 - heading23)
        p3.x = p2.x + vec23.x
        p3.y = p2.y + vec23.y
        return
      case Point.ALIGN_MODE_AVERAGE:
        let angleDiff = heading12 - heading23
        vec23.rotate()
        p3.x = p2.x + vec23.x
        p3.y = p2.y + vec23.y
        return
    }
  }

  sub (x, y) {
    if (x instanceof Point) {
      this.x -= x.x || 0
      this.y -= x.y || 0
      return this
    }
    this.x -= x || 0
    this.y -= y || 0
    return this
  }

  // NOTE: This function accepts alternate formatted params
  // (Point, heading)
  // (x, y, heading)
  rotateAbout (a, b, c) {
    let otherPoint
    let heading

    if (a instanceof Point) {
      otherPoint = a.pos
      heading = b
    } else {
      otherPoint = this.context.createVector(a, b)
      heading = c
    }

    let diff = Vector.sub(this.pos, otherPoint)
    diff.rotate(heading)
    this.x = otherPoint.x + diff.x
    this.y = otherPoint.y + diff.y
  }

  containsXY (x, y) {
    return this.context.dist(x, y, this.x, this.y) < this.radius
  }

  handleMousePressed () {
    this.isDragged = this.containsXY(mouseX, mouseY)
    return this.isDragged
  }

  handleMouseDragged () {
    this.set(mouseX, mouseY)
  }

  handleMouseReleased () {
    this.isDragged = false
  }

  draw () {
    if (this.dragEnabled) {
      // P5JsUtils.drawControlPoints([this])
    }
    this.context.point(this.x, this.y)
  }
}
