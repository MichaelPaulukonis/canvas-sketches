  export default class Player {
    constructor (ctx, livesMax) {
      this.ctx = ctx
      this.livesMax = livesMax
      this.reset()
    }

    reset() {
      this.x = this.ctx.width / 2
      this.y = this.ctx.height / 2
      this.lives = this.livesMax
      this.invulnerable = false
    }

    move () {
      if (this.ctx.keyIsDown(this.ctx.LEFT_ARROW)) this.x -= 5
      if (this.ctx.keyIsDown(this.ctx.RIGHT_ARROW)) this.x += 5
      if (this.ctx.keyIsDown(this.ctx.UP_ARROW)) this.y -= 5
      if (this.ctx.keyIsDown(this.ctx.DOWN_ARROW)) this.y += 5

      // Wrap-around logic
      if (this.x < 0) this.x = this.ctx.width
      if (this.x > this.ctx.width) this.x = 0
      if (this.y < 0) this.y = this.ctx.height
      if (this.y > this.ctx.height) this.y = 0
    }

    display () {
      this.ctx.fill('purple')
      this.ctx.ellipse(this.x, this.y, 20, 20)
    }

    touches (other) {
      return this.ctx.dist(this.x, this.y, other.x, other.y) < 20
    }

    killed() {
      this.lives--
      this.invulnerable = true
      setTimeout(() => {
        this.invulnerable = false
      }, 2000)
    }
  }
