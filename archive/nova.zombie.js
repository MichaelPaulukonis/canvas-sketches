export default  class Zombie {
    constructor (x, y, ctx) {
      this.ctx = ctx
      this.x = x
      this.y = y
      this.noiseOffsetX = this.ctx.random(1000)
      this.noiseOffsetY = this.ctx.random(1000)
    }

    // something like "world" would be a better reference....
    move (soldiers, humans, doctors) {
      this.x += this.ctx.map(this.ctx.noise(this.noiseOffsetX), 0, 1, -2, 2)
      this.y += this.ctx.map(this.ctx.noise(this.noiseOffsetY), 0, 1, -2, 2)
      this.noiseOffsetX += 0.01
      this.noiseOffsetY += 0.01

      // Wrap-around logic
      if (this.x < 0) this.x = this.ctx.width
      if (this.x > this.ctx.width) this.x = 0
      if (this.y < 0) this.y = this.ctx.height
      if (this.y > this.ctx.height) this.y = 0

      // Avoid soldiers
      for (let soldier of soldiers) {
        if (this.ctx.dist(this.x, this.y, soldier.x, soldier.y) < 50) {
          this.x += (this.x - soldier.x) * 0.04
          this.y += (this.y - soldier.y) * 0.04
        }
      }

      // Avoid doctors
      for (let doctor of doctors) {
        if (this.ctx.dist(this.x, this.y, doctor.x, doctor.y) < 50) {
          this.x += (this.x - doctor.x) * 0.02
          this.y += (this.y - doctor.y) * 0.02
        }
      }

      // move towards humans
      for (let human of humans) {
        if (this.ctx.dist(this.x, this.y, human.x, human.y) < 100) {
          this.x += (human.x - this.x) * 0.04
          this.y += (human.y - this.y) * 0.04
        }
      }
    }

    display () {
      this.ctx.fill('darkblue')
      this.ctx.ellipse(this.x, this.y, 20, 20)
    }

    touches (other) {
      return this.ctx.dist(this.x, this.y, other.x, other.y) < 20
    }
  }