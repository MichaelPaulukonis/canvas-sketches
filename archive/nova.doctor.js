export default  class Doctor {
    constructor (ctx) {
      this.ctx = ctx
      this.x = this.ctx.random(this.ctx.width)
      this.y = this.ctx.random(this.ctx.height)
      this.noiseOffsetX = this.ctx.random(1000)
      this.noiseOffsetY = this.ctx.random(1000)
    }

    move (zombies) {
      this.x += this.ctx.map(this.ctx.noise(this.noiseOffsetX), 0, 1, -2.5, 2.5)
      this.y += this.ctx.map(this.ctx.noise(this.noiseOffsetY), 0, 1, -2.5, 2.5)
      this.noiseOffsetX += 0.01
      this.noiseOffsetY += 0.01

      // Wrap-around logic
      if (this.x < 0) this.x = this.ctx.width
      if (this.x > this.ctx.width) this.x = 0
      if (this.y < 0) this.y = this.ctx.height
      if (this.y > this.ctx.height) this.y = 0

      for (let zombie of zombies) {
        if (this.ctx.dist(this.x, this.y, zombie.x, zombie.y) < 200) {
          this.x += (zombie.x - this.x) * 0.02
          this.y += (zombie.y - this.y) * 0.02
        }
      }
    }

    display () {
      this.ctx.fill('red')
      this.ctx.ellipse(this.x, this.y, 20, 20)
    }

    touches (other) {
      return this.ctx.dist(this.x, this.y, other.x, other.y) < 20
    }
  }