export default class Human {
    constructor (x, y, ctx) {
      this.ctx = ctx
      this.x = x || this.ctx.random(this.ctx.width)
      this.y = y || this.ctx.random(this.ctx.height)
      this.noiseOffsetX = this.ctx.random(1000)
      this.noiseOffsetY = this.ctx.random(1000)
    }

    move (zombies, player) {
      this.x += this.ctx.map(this.ctx.noise(this.noiseOffsetX), 0, 1, -2, 2)
      this.y += this.ctx.map(this.ctx.noise(this.noiseOffsetY), 0, 1, -2, 2)
      this.noiseOffsetX += 0.01
      this.noiseOffsetY += 0.01

      // Wrap-around logic
      if (this.x < 0) this.x = this.ctx.width
      if (this.x > this.ctx.width) this.x = 0
      if (this.y < 0) this.y = this.ctx.height
      if (this.y > this.ctx.height) this.y = 0

      // Avoid player and zombies
      for (let zombie of zombies) {
        if (this.ctx.dist(this.x, this.y, zombie.x, zombie.y) < 50) {
          this.x += (this.x - zombie.x) * 0.05
          this.y += (this.y - zombie.y) * 0.05
        }
      }
      if (this.ctx.dist(this.x, this.y, player.x, player.y) < 50) {
        this.x += (this.x - player.x) * 0.05
        this.y += (this.y - player.y) * 0.05
      }
    }

    display () {
      this.ctx.fill('white')
      this.ctx.ellipse(this.x, this.y, 20, 20)
    }
  }