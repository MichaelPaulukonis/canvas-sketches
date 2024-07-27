export default  class Doctor {
    constructor () {
      this.x = p5.random(p5.width)
      this.y = p5.random(p5.height)
      this.noiseOffsetX = p5.random(1000)
      this.noiseOffsetY = p5.random(1000)
    }

    move () {
      this.x += p5.map(p5.noise(this.noiseOffsetX), 0, 1, -2.5, 2.5)
      this.y += p5.map(p5.noise(this.noiseOffsetY), 0, 1, -2.5, 2.5)
      this.noiseOffsetX += 0.01
      this.noiseOffsetY += 0.01

      // Wrap-around logic
      if (this.x < 0) this.x = p5.width
      if (this.x > p5.width) this.x = 0
      if (this.y < 0) this.y = p5.height
      if (this.y > p5.height) this.y = 0

      // Move towards player and zombies
      if (p5.dist(this.x, this.y, player.x, player.y) < 200) {
        this.x += (player.x - this.x) * 0.02
        this.y += (player.y - this.y) * 0.02
      }
      for (let zombie of zombies) {
        if (p5.dist(this.x, this.y, zombie.x, zombie.y) < 200) {
          this.x += (zombie.x - this.x) * 0.02
          this.y += (zombie.y - this.y) * 0.02
        }
      }
    }

    display () {
      p5.fill('olive')
      p5.ellipse(this.x, this.y, 20, 20)
    }

    touches (other) {
      return p5.dist(this.x, this.y, other.x, other.y) < 20
    }
  }