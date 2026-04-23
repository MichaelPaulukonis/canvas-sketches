let maze = []
let cols, rows
let cellSize = 20 // Size of each maze cell
let mazeScale = 30 // Scaling factor to make the maze much bigger
let canvasWidth = 400 // Width of the canvas (viewport)
let canvasHeight = 400 // Height of the canvas (viewport)
let player
let coins = []
let monsters = []
let numCoins = 10
let numMonsters = 3
let flickerInterval
let lightFlicker = false
let coinCount = 0

function setup () {
  createCanvas(canvasWidth, canvasHeight)
  cols = floor(width / cellSize)
  rows = floor(height / cellSize)

  generateMaze()

  player = new Player()

  for (let i = 0; i < numCoins; i++) {
    coins.push(createCoin())
  }

  for (let i = 0; i < numMonsters; i++) {
    monsters.push(new Monster())
  }

  flickerInterval = setInterval(() => {
    lightFlicker = !lightFlicker
  }, 500) // Flicker every 500 ms
}

function draw () {
  background(0)

  translate(-player.x * cellSize + width / 2, -player.y * cellSize + height / 2)

  drawMaze()

  if (lightFlicker) {
    fill('white')
    noStroke()
    rect(0, 0, cols * mazeScale * cellSize, rows * mazeScale * cellSize)
    lightFlicker = false
  }

  player.update() // Update player movement
  player.show() // Draw the player

  // Draw and check coins
  for (let i = coins.length - 1; i >= 0; i--) {
    if (player.collectCoin(coins[i])) {
      coins.splice(i, 1)
      coinCount++ // Increment coin count when a coin is collected
      coins.push(createCoin()) // Add a new coin
    }
    coins[i].show()
  }

  // Draw and move monsters
  for (let monster of monsters) {
    monster.update()
    monster.show()
    if (player.collideWithMonster(monster)) {
      // For now, just log when player is caught (you can add a game over state here)
      console.log('Caught by a monster!')
    }
  }

  // Draw coin count
  resetMatrix() // Reset translation for UI display
  fill(255)
  textSize(24)
  textAlign(LEFT, TOP)
  text('Coins: ' + coinCount, 10, 10)
}

// Removed keyPressed() and instead use keyIsDown in player.update()

function generateMaze () {
  // Simple maze generation (you can improve this)
  for (let i = 0; i < cols * mazeScale; i++) {
    // Increase maze size for larger scale
    maze[i] = []
    for (let j = 0; j < rows * mazeScale; j++) {
      maze[i][j] = random() > 0.7 ? 1 : 0 // 1 is wall, 0 is path
    }
  }
  maze[0][0] = 0 // Ensure start is not a wall
  maze[cols * mazeScale - 1][rows * mazeScale - 1] = 0 // Ensure end is not a wall
}

function drawMaze () {
  for (let i = 0; i < cols * mazeScale; i++) {
    for (let j = 0; j < rows * mazeScale; j++) {
      if (maze[i][j] === 1) {
        fill(100)
        noStroke()
        rect(i * cellSize, j * cellSize, cellSize, cellSize)
      }
    }
  }
}

function createCoin () {
  let x, y
  do {
    x = floor(random(cols * mazeScale))
    y = floor(random(rows * mazeScale))
  } while (maze[x][y] !== 0) // Ensure coin is placed on a path
  return new Coin(x, y)
}

class Player {
  constructor () {
    this.x = floor((cols * mazeScale) / 2) // Start in the middle of the maze
    this.y = floor((rows * mazeScale) / 2) // Start in the middle of the maze
    this.size = cellSize / 2
    this.speed = 1 // Speed of movement
  }

  update () {
    // Use keyIsDown for smooth movement
    if (keyIsDown(LEFT_ARROW)) {
      this.move(-1, 0)
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.move(1, 0)
    } else if (keyIsDown(UP_ARROW)) {
      this.move(0, -1)
    } else if (keyIsDown(DOWN_ARROW)) {
      this.move(0, 1)
    }
  }

  move (x, y) {
    let newX = this.x + x * this.speed
    let newY = this.y + y * this.speed
    if (
      newX >= 0 &&
      newY >= 0 &&
      newX < cols * mazeScale &&
      newY < rows * mazeScale &&
      maze[newX][newY] === 0
    ) {
      this.x = newX
      this.y = newY
      if (random() < 0.05) {
        // 5% chance to teleport
        // this.x = floor(random(cols * mazeScale));
        // this.y = floor(random(rows * mazeScale));
        let x, y
        do {
          x = floor(random(cols * mazeScale))
          y = floor(random(rows * mazeScale))
        } while (maze[x][y] !== 0) // Ensure player is placed on a path
        this.x = x
        this.y = y
      }
    }
  }

  show () {
    fill(255, 0, 0)
    noStroke()
    ellipse(
      this.x * cellSize + cellSize / 2,
      this.y * cellSize + cellSize / 2,
      this.size
    )
  }

  collectCoin (coin) {
    let d = dist(
      this.x * cellSize,
      this.y * cellSize,
      coin.x * cellSize,
      coin.y * cellSize
    )
    return d < this.size / 2 + coin.size / 2
  }

  collideWithMonster (monster) {
    let d = dist(
      this.x * cellSize,
      this.y * cellSize,
      monster.x * cellSize,
      monster.y * cellSize
    )
    return d < this.size / 2 + monster.size / 2
  }
}

class Coin {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.size = cellSize / 4
  }

  show () {
    fill(255, 215, 0)
    noStroke()
    ellipse(this.x * cellSize, this.y * cellSize, this.size)
  }
}

class Monster {
  constructor () {
    // Place monster at random open location in the maze
    let x, y
    do {
      x = floor(random(cols * mazeScale))
      y = floor(random(rows * mazeScale))
    } while (maze[x][y] !== 0)
    this.x = x
    this.y = y
    this.size = cellSize * 0.7
    this.emoji = random(['👹', '🐲'])
  }

  update () {
    let dir = floor(random(4)) // Random direction (0 = left, 1 = right, 2 = up, 3 = down)
    let newX = this.x,
      newY = this.y
    if (dir === 0 && this.x > 0 && maze[this.x - 1][this.y] === 0) newX--
    if (
      dir === 1 &&
      this.x < cols * mazeScale - 1 &&
      maze[this.x + 1][this.y] === 0
    )
      newX++
    if (dir === 2 && this.y > 0 && maze[this.x][this.y - 1] === 0) newY--
    if (
      dir === 3 &&
      this.y < rows * mazeScale - 1 &&
      maze[this.x][this.y + 1] === 0
    )
      newY++
    this.x = newX
    this.y = newY
  }

  show () {
    textSize(cellSize)
    text(this.emoji, this.x * cellSize, this.y * cellSize + cellSize)
  }
}
