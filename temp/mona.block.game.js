class Block {
  constructor (x, y) {
    this.size = 4
    this.margin = 1
    this.x = x
    this.y = y
    this.active = true
    this.color = color(255) // Default white, will be updated from image
  }

  draw () {
    if (this.active) {
      fill(this.color)
      noStroke()
      rectMode(CORNER)
      rect(this.x, this.y, this.size, this.size)
    }
  }

  checkCollision (ball) {
    if (!this.active) return false

    // Check if ball intersects with block
    if (
      ball.x + ball.size / 2 > this.x &&
      ball.x - ball.size / 2 < this.x + this.size &&
      ball.y + ball.size / 2 > this.y &&
      ball.y - ball.size / 2 < this.y + this.size
    ) {
      if (!sounds.mute) sounds.blockHit.play()

      // Calculate centers (using ball's center)
      const ballCenterX = ball.x + ball.size / 2
      const ballCenterY = ball.y + ball.size / 2
      const blockCenterX = this.x + this.size / 2 // Use 'block' or 'this' as appropriate
      const blockCenterY = this.y + this.size / 2

      // Vector from block center to ball center
      const vecX = ballCenterX - blockCenterX
      const vecY = ballCenterY - blockCenterY

      // Half-widths for overlap calculation
      const halfTotalWidth = (ball.size + this.size) / 2
      const halfTotalHeight = (ball.size + this.size) / 2

      // Calculate overlaps
      const overlapX = halfTotalWidth - Math.abs(vecX)
      const overlapY = halfTotalHeight - Math.abs(vecY)

      // Determine collision axis based on MINIMUM overlap
      if (overlapX > 0 && overlapY > 0) {
        // Ensure collision exists
        if (overlapX < overlapY) {
          // <<< Collision is primarily Horizontal >>>
          // Hit was on left/right side because less overlap needed horizontally to separate
          ball.dx *= -1
          // Optional: Resolve penetration
          ball.x += Math.sign(vecX) * overlapX
        } else {
          // <<< Collision is primarily Vertical >>>
          // Hit was on top/bottom side because less (or equal) overlap needed vertically
          ball.dy *= -1 // <<< This will now correctly reverse vertical direction
          // Optional: Resolve penetration
          ball.y += Math.sign(vecY) * overlapY
        }
      }

      this.active = false
      score.blocksDestroyed++

      if (score.blocksDestroyed >= score.totalBlocks) {
        gameState = GAME_OVER
      }

      return true
    }
    return false
  }
}

class Paddle {
  constructor () {
    this.width = 80
    this.height = 4
    // Random offset between -50 and 50 pixels from center
    this.x = width / 2 + random(-50, 50)
    this.y = height - 30
    this.speed = 5
  }

  move () {
    // Keyboard control
    if (keyIsDown(LEFT_ARROW)) {
      this.x = max(this.width / 2, this.x - this.speed)
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x = min(width - this.width / 2, this.x + this.speed)
    }

    // Mouse control (optional)
    if (mouseIsPressed) {
      this.x = constrain(mouseX, this.width / 2, width - this.width / 2)
    }
  }

  draw () {
    fill(255)
    rectMode(CENTER)
    rect(this.x, this.y, this.width, this.height)
  }
}

class Ball {
  constructor () {
    this.size = 4 // Same as block size
    this.reset()
  }

  reset () {
    this.x = width / 2
    this.y = height - 50
    this.dx = 0
    this.dy = 0
    this.speed = 5
    this.launched = false
  }

  launch () {
    if (!this.launched) {
      this.launched = true
      // Launch downward with a slight angle
      this.dy = this.speed
      // Random angle between -30 and 30 degrees
      let angle = random(-PI / 6, PI / 6)
      this.dx = this.speed * sin(angle)
      score.launches++
    }
  }

  move () {
    if (!this.launched) {
      this.x = paddle.x // Ball follows paddle before launch
      return
    }

    this.x += this.dx
    this.y += this.dy

    // Wall collisions
    if (this.x <= this.size / 2 || this.x >= width - this.size / 2) {
      this.dx *= -1
    }
    if (this.y <= this.size / 2) {
      this.dy *= -1
    }

    // Bottom screen check - reset ball if missed
    if (this.y >= height) {
      this.reset()
    }

    // Paddle collision
    if (
      this.y + this.size / 2 >= paddle.y - paddle.height / 2 &&
      this.y - this.size / 2 <= paddle.y + paddle.height / 2 &&
      this.x >= paddle.x - paddle.width / 2 &&
      this.x <= paddle.x + paddle.width / 2
    ) {
      // Calculate new angle based on hit position
      let relativeHitPosition = (this.x - paddle.x) / (paddle.width / 2)
      let angle = (relativeHitPosition * PI) / 3 // Max 60-degree angle

      this.dx = this.speed * sin(angle)
      this.dy = -this.speed * cos(angle)

      // Ensure ball doesn't get stuck in paddle
      this.y = paddle.y - paddle.height / 2 - this.size / 2
    }
  }

  draw () {
    fill(255)
    rectMode(CENTER)
    rect(this.x, this.y, this.size, this.size)
  }
}

let paddle
let ball
let blocks = []
let DEBUG = false

// Game states
const GAME_START = 'start'
const GAME_PLAYING = 'playing'
const GAME_PAUSED = 'pause'
const GAME_OVER = 'gameover'

// Game variables
let gameState = GAME_START
let score = {
  launches: 0,
  blocksDestroyed: 0,
  totalBlocks: 7000 // 70 columns * 100 rows
}

let sourceImage

let sounds = {
  mute: false,
  blockHit: null,
  paddleHit: null,
  ballMiss: null,
  ballLaunch: null,
  wallHit: null,
  gameStart: null,
  gameOver: null,
  pause: null,
  victory: null
}

// Add this function to load the image
function preload () {
  sourceImage = loadImage('mona.mono.00.jpg')
  sounds.blockHit = loadSound('704260__baggonotes__mug_tap.wav')
}

// Add this function to process the image into blocks
function processImage () {
  // Assuming the image will be resized/processed to match our grid
  sourceImage.loadPixels()

  // For each block in our grid, sample the corresponding pixel
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i]
    let col = Math.floor((block.x - blocks[0].x) / (block.size + block.margin))
    let row = Math.floor((block.y - blocks[0].y) / (block.size + block.margin))

    // Get pixel color from source image
    let x = Math.floor(map(col, 0, 70, 0, sourceImage.width))
    let y = Math.floor(map(row, 0, 100, 0, sourceImage.height))
    let index = 4 * (y * sourceImage.width + x)

    // Store color in block
    block.color = color(
      sourceImage.pixels[index],
      sourceImage.pixels[index + 1],
      sourceImage.pixels[index + 2],
      sourceImage.pixels[index + 3]
    )
  }
}

function createBlocks () {
  blocks = []
  const blockSize = 4 // if increased doesn't necessarily fit w/in game screen
  // TODO: make this dynamic based on blocksize and canvas
  const cols = 70
  const rows = 100
  const margin = 1
  const startX = (width - (cols * (blockSize + margin) - margin)) / 2
  const startY = 20 // Starting 2 pixels from top (outer margin)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = startX + col * (blockSize + margin)
      const y = startY + row * (blockSize + margin)
      blocks.push(new Block(x, y))
    }
  }
}

function setup () {
  createCanvas(400, 600)
  textAlign(CENTER, CENTER)
  paddle = new Paddle()
  ball = new Ball()
  createBlocks()
  processImage()
}

function draw () {
  background(0)

  switch (gameState) {
    case GAME_START:
      drawStartScreen()
      break
    case GAME_PLAYING:
      drawGame()
      break
    case GAME_PAUSED:
      // drawGame()
      drawPauseScreen()
      break
    case GAME_OVER:
      drawGame()
      drawGameOverScreen()
      break
  }
}

function drawStartScreen () {
  fill(255)
  textSize(32)
  text('BLOCK BREAKER', width / 2, height / 3)

  textSize(16)
  text('Controls:', width / 2, height / 2 - 40)
  text('← → Arrow Keys or Mouse to move', width / 2, height / 2)
  text('SPACE to launch ball', width / 2, height / 2 + 30)
  text('P to pause', width / 2, height / 2 + 60)

  textSize(20)
  text('Press SPACE to start', width / 2, (height * 3) / 4)
}

function drawPauseScreen () {
  // Semi-transparent overlay
  fill(0, 0, 0, 127)
  rect(0, 0, width, height)

  fill(255)
  textSize(32)
  text('PAUSED', width / 2, height / 2)
  textSize(16)
  text('Press P to continue', width / 2, height / 2 + 40)
}

function drawGameOverScreen () {
  fill(0, 0, 0, 127)
  rect(0, 0, width, height)

  fill(255)
  textSize(32)
  text('GAME OVER', width / 2, height / 3)

  textSize(20)
  text(`Launches: ${score.launches}`, width / 2, height / 2)
  text(
    `Blocks Destroyed: ${score.blocksDestroyed}/${score.totalBlocks}`,
    width / 2,
    height / 2 + 30
  )

  textSize(16)
  text('Press SPACE to play again', width / 2, (height * 3) / 4)
}

function drawGame () {
  for (let block of blocks) {
    block.draw()
  }

  // Check ball collisions with blocks
  if (ball.launched) {
    for (let block of blocks) {
      if (block.checkCollision(ball)) {
        break // Exit after first collision
      }
    }
  }

  paddle.move()
  ball.move()

  paddle.draw()
  ball.draw()

  // Draw score information
  fill(255)
  textSize(12)
  textAlign(LEFT, CENTER)
  text(`Launches: ${score.launches}`, 10, height - 15)
  textAlign(RIGHT, CENTER)
  text(
    `Blocks: ${score.blocksDestroyed}/${score.totalBlocks}`,
    width - 10,
    height - 15
  )

  // Reset text alignment for other text elements
  textAlign(CENTER, CENTER)
}

function keyPressed () {
  if (key === 'm' || key === 'M') {
    sounds.mute = !sounds.mute
  } else if (key === 'd') {
    DEBUG = !DEBUG
  }

  switch (gameState) {
    case GAME_START:
      if (key === ' ') {
        gameState = GAME_PLAYING
      }
      break

    case GAME_PLAYING:
      if (key === 'p' || key === 'P') {
        gameState = GAME_PAUSED
      } else if (key === ' ') {
        ball.launch()
      }
      break

    case GAME_PAUSED:
      if (key === 'p' || key === 'P' || key === ' ') {
        gameState = GAME_PLAYING
      }
      break

    case GAME_OVER:
      if (key === ' ') {
        resetGame()
        gameState = GAME_PLAYING
      }
      break
  }
}

function resetGame () {
  score.launches = 0
  score.blocksDestroyed = 0
  ball.reset()
  createBlocks()
}
