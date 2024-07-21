const canvasSketch = require('canvas-sketch')
import p5 from 'p5'

let player
let humans = []
let zombies = []
let soldiers = []
let score = 0
let gameLevel = 0
let soldierLimit = 3
let humanLimit = 10

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5 },
  // Turn on a render loop
  animate: true,
  dimensions: [600, 600],
  prefix: 'nova-zombie'
}

canvasSketch(({ p5, render, canvas }) => {

  function resetLevel () {
    humans = []
    zombies = []
    soldiers = []
    for (let i = 0; i < humanLimit; i++) {
      humans.push(new Human())
    }
    for (let i = 0; i < soldierLimit; i++) {
      soldiers.push(new Soldier())
    }
    gameLevel++
    if (gameLevel % 2 === 0) {
      soldierLimit++
      humanLimit += 2
    }
  }

  function displayScore () {
    p5.fill(0)
    p5.textSize(24)
    p5.text('Score: ' + score, 10, 30)
    p5.text('Round: ' + gameLevel, 10, 60)
    p5.text(`Lives: ${player.lives}`, 10, 90)
  }

  class Player {
    constructor () {
      this.x = p5.width / 2
      this.y = p5.height / 2
      this.lives = 3
    }

    move () {
      if (p5.keyIsDown(p5.LEFT_ARROW)) this.x -= 5
      if (p5.keyIsDown(p5.RIGHT_ARROW)) this.x += 5
      if (p5.keyIsDown(p5.UP_ARROW)) this.y -= 5
      if (p5.keyIsDown(p5.DOWN_ARROW)) this.y += 5

      // Wrap-around logic
      if (this.x < 0) this.x = p5.width
      if (this.x > p5.width) this.x = 0
      if (this.y < 0) this.y = p5.height
      if (this.y > p5.height) this.y = 0
    }

    display () {
      p5.fill('purple')
      p5.ellipse(this.x, this.y, 20, 20)
    }

    touches (other) {
      return p5.dist(this.x, this.y, other.x, other.y) < 20
    }
  }

  class Human {
    constructor () {
      this.x = p5.random(p5.width)
      this.y = p5.random(p5.height)
      this.noiseOffsetX = p5.random(1000)
      this.noiseOffsetY = p5.random(1000)
    }

    move () {
      this.x += p5.map(p5.noise(this.noiseOffsetX), 0, 1, -2, 2)
      this.y += p5.map(p5.noise(this.noiseOffsetY), 0, 1, -2, 2)
      this.noiseOffsetX += 0.01
      this.noiseOffsetY += 0.01

      // Wrap-around logic
      if (this.x < 0) this.x = p5.width
      if (this.x > p5.width) this.x = 0
      if (this.y < 0) this.y = p5.height
      if (this.y > p5.height) this.y = 0

      // Avoid player and zombies
      for (let zombie of zombies) {
        if (p5.dist(this.x, this.y, zombie.x, zombie.y) < 50) {
          this.x += (this.x - zombie.x) * 0.05
          this.y += (this.y - zombie.y) * 0.05
        }
      }
      if (p5.dist(this.x, this.y, player.x, player.y) < 50) {
        this.x += (this.x - player.x) * 0.05
        this.y += (this.y - player.y) * 0.05
      }
    }

    display () {
      p5.fill('white')
      p5.ellipse(this.x, this.y, 20, 20)
    }
  }

  class Zombie {
    constructor (x, y) {
      this.x = x
      this.y = y
      this.noiseOffsetX = p5.random(1000)
      this.noiseOffsetY = p5.random(1000)
    }

    move () {
      this.x += p5.map(p5.noise(this.noiseOffsetX), 0, 1, -2, 2)
      this.y += p5.map(p5.noise(this.noiseOffsetY), 0, 1, -2, 2)
      this.noiseOffsetX += 0.01
      this.noiseOffsetY += 0.01

      // Wrap-around logic
      if (this.x < 0) this.x = p5.width
      if (this.x > p5.width) this.x = 0
      if (this.y < 0) this.y = p5.height
      if (this.y > p5.height) this.y = 0

      // Avoid soldiers
      for (let soldier of soldiers) {
        if (p5.dist(this.x, this.y, soldier.x, soldier.y) < 50) {
          this.x += (this.x - soldier.x) * 0.05
          this.y += (this.y - soldier.y) * 0.05
        }
      }
    }

    display () {
      p5.fill('darkblue')
      p5.ellipse(this.x, this.y, 20, 20)
    }
  }

  class Soldier {
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

  player = new Player()
  resetLevel()

  return ({ p5, animate, width, height }) => {
    p5.background(220)
    player.move()
    player.display()

    for (let human of humans) {
      human.move()
      human.display()
      if (player.touches(human)) {
        zombies.push(new Zombie(human.x, human.y))
        humans.splice(humans.indexOf(human), 1)
        score++
      }
    }

    for (let zombie of zombies) {
      zombie.move()
      zombie.display()
    }

    for (let soldier of soldiers) {
      soldier.move()
      soldier.display()
      if (soldier.touches(player)) {
        // but they _stay_ touching, we need to "debounce" or whatever
        player.lives--
      }
      for (let zombie of zombies) {
        if (soldier.touches(zombie)) {
          zombies.splice(zombies.indexOf(zombie), 1)
        }
      }
    }

    // Check for new round
    if (humans.length === 0) {
      // Start new round
      resetLevel()
    }

    displayScore()
  }

}, settings)
