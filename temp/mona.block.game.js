class Block {
  // constructor (x, y, size) { // Keep this constructor signature
  constructor (x, y, size) {
    this.size = size
    this.x = x
    this.y = y
    this.active = true
    this.fillColor = color(200)
    this.strokeColor = color(50)
  }

  draw () {
    if (this.active) {
      // Use the new default fill color
      fill(this.fillColor)
      // Optional: Add a stroke to distinguish blocks
      stroke(this.strokeColor);
      strokeWeight(1);
      // noStroke() // Or keep noStroke if you prefer

      rectMode(CORNER)
      rect(this.x, this.y, this.size, this.size)
    }
    // If !this.active, nothing is drawn, revealing the background
  }

  // Ensure handleBlockCollision uses the correct block size
  handleBlockCollision (ball, block) {
    // block here is 'this' when called from checkCollision
    const ballCenterX = ball.x + ball.size / 2
    const ballCenterY = ball.y + ball.size / 2
    const blockCenterX = this.x + this.size / 2 // Use this.size
    const blockCenterY = this.y + this.size / 2 // Use this.size

    const halfTotalWidth = (ball.size + this.size) / 2 // Use this.size
    const halfTotalHeight = (ball.size + this.size) / 2 // Use this.size

    // Vector from block center to ball center
    const vecX = ballCenterX - blockCenterX
    const vecY = ballCenterY - blockCenterY

    // Calculate overlaps
    const overlapX = halfTotalWidth - Math.abs(vecX)
    const overlapY = halfTotalHeight - Math.abs(vecY)

    const overlapTolerance = 0.5
    const resolutionEpsilon = 0.01 // A tiny extra push distance

    if (overlapX > 0 && overlapY > 0) {
      let collisionAxis = null

      if (Math.abs(overlapX - overlapY) < overlapTolerance) {
        if (Math.abs(ball.dx) > Math.abs(ball.dy)) {
          collisionAxis = 'horizontal'
          if (DEBUG)
            console.log(
              `Ambiguous Hit (Overlap): Favoring Horizontal (vx=${ball.dx.toFixed(
                2
              )}, vy=${ball.dy.toFixed(2)})`
            )
        } else {
          collisionAxis = 'vertical'
          if (DEBUG)
            console.log(
              `Ambiguous Hit (Overlap): Favoring Vertical (vx=${ball.dx.toFixed(
                2
              )}, vy=${ball.dy.toFixed(2)})`
            )
        }
      } else {
        if (overlapX < overlapY) {
          collisionAxis = 'horizontal'
          if (DEBUG)
            console.log(
              `Clear Horizontal Hit: overlapX=${overlapX.toFixed(
                2
              )}, overlapY=${overlapY.toFixed(2)}`
            )
        } else {
          collisionAxis = 'vertical'
          if (DEBUG)
            console.log(
              `Clear Vertical Hit: overlapX=${overlapX.toFixed(
                2
              )}, overlapY=${overlapY.toFixed(2)}`
            )
        }
      }

      if (collisionAxis === 'horizontal') {
        ball.dx *= -1
        const resolveDistX = overlapX + resolutionEpsilon
        ball.x += Math.sign(vecX) * resolveDistX
        if (DEBUG)
          console.log(
            `   Reflecting dx, Resolving X by ${Math.sign(vecX) * resolveDistX}`
          )
      } else if (collisionAxis === 'vertical') {
        ball.dy *= -1
        const resolveDistY = overlapY + resolutionEpsilon
        ball.y -= Math.sign(vecY) * resolveDistY // Corrected direction '-'
        if (DEBUG)
          console.log(
            `   Reflecting dy, Resolving Y by ${
              -Math.sign(vecY) * resolveDistY
            }`
          )
      }
    }
  }

  // checkCollision should be fine as it uses this.x, this.y, this.size
  checkCollision (ball) {
    if (!this.active) return false

    // AABB collision check using ball CENTER and block CORNER+SIZE
    if (
      ball.x + ball.size / 2 > this.x && // Ball right edge > Block left edge
      ball.x - ball.size / 2 < this.x + this.size && // Ball left edge < Block right edge
      ball.y + ball.size / 2 > this.y && // Ball bottom edge > Block top edge
      ball.y - ball.size / 2 < this.y + this.size // Ball top edge < Block bottom edge
    ) {
      if (!sounds.mute && sounds.blockHit) sounds.blockHit.play() // Check sound loaded

      this.handleBlockCollision(ball, this) // Pass 'this' explicitly if needed, otherwise context is fine

      this.active = false
      score.blocksDestroyed++

      // Check score *after* incrementing
      if (score.blocksDestroyed >= score.totalBlocks) {
        gameState = GAME_OVER // Consider a specific VICTORY state?
        // Optional: Play victory sound if defined
        // if (!sounds.mute && sounds.victory) sounds.victory.play();
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
    this.size = 8
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
    ellipse(this.x, this.y, this.size, this.size)
  }
}

let paddle
let ball
let blocks = []
let DEBUG = false

// --- Grid Layout Configuration ---
const desiredBlockSize = 15
const gap = 1 // Gap between blocks
const marginTop = 20 // Space above grid
const marginBottom = 75 // Space below grid (adjust based on paddle/score area)
const marginHorizontal = 20 // Space on left/right sides

// --- Calculated Grid Properties (will be set in createDynamicBlocks) ---
let gridCols = 0
let gridRows = 0
let gridStartX = 0
let gridStartY = 0
let gridActualWidth = 0 // NEW: Store the calculated width
let gridActualHeight = 0 // NEW: Store the calculated height

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

function preload () {
  // sourceImage = loadImage('mona.mono.00.jpg')
  sourceImage = loadImage('mona-lisa-768x1000.png')
  sounds.blockHit = loadSound('704260__baggonotes__mug_tap.wav')
}

function processImage () {
  // Basic checks
  if (!sourceImage || blocks.length === 0 || gridCols <= 0 || gridRows <= 0) {
    console.warn(
      'Cannot process image: Image not loaded or grid not created/invalid.'
    )
    // Optionally fill blocks with a default color if needed
    for (let block of blocks) {
      block.color = color(128) // Default gray
    }
    return
  }

  sourceImage.loadPixels()
  if (!sourceImage.pixels || sourceImage.pixels.length === 0) {
    console.error('Image pixel data is not available after loadPixels().')
    for (let block of blocks) {
      block.color = color(128) // Default gray
    }
    return
  }

  // Calculate aspect ratios
  const gridAspectRatio = gridCols / gridRows
  const imageAspectRatio = sourceImage.width / sourceImage.height

  let sampleX = 0,
    sampleY = 0
  let sampleWidth = sourceImage.width
  let sampleHeight = sourceImage.height

  // Determine the cropping region within the source image
  if (gridAspectRatio > imageAspectRatio) {
    // Grid is wider than the image aspect ratio -> Crop image top/bottom
    sampleWidth = sourceImage.width
    // Calculate the height needed in the image to match the grid's aspect ratio
    sampleHeight = sourceImage.width / gridAspectRatio
    sampleX = 0
    // Center the sampling region vertically
    sampleY = (sourceImage.height - sampleHeight) / 2
    console.log(`Cropping image vertically. Sampling Height: ${sampleHeight}`)
  } else if (gridAspectRatio < imageAspectRatio) {
    // Grid is taller (narrower) than the image aspect ratio -> Crop image left/right
    sampleHeight = sourceImage.height
    // Calculate the width needed in the image to match the grid's aspect ratio
    sampleWidth = sourceImage.height * gridAspectRatio
    sampleY = 0
    // Center the sampling region horizontally
    sampleX = (sourceImage.width - sampleWidth) / 2
    console.log(`Cropping image horizontally. Sampling Width: ${sampleWidth}`)
  }
  // Else: Aspect ratios match (or are close enough), use the whole image (sampleX/Y=0, sampleWidth/Height=full)

  // Make sure calculated sample dimensions are not negative or zero if inputs were weird
  sampleWidth = max(1, sampleWidth)
  sampleHeight = max(1, sampleHeight)

  // --- Process each block ---
  const blockAndGapWidth = desiredBlockSize + gap
  const blockAndGapHeight = desiredBlockSize + gap

  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i]

    // Calculate the COLUMN and ROW index of this block within our dynamic grid
    let col = Math.round((block.x - gridStartX) / blockAndGapWidth)
    let row = Math.round((block.y - gridStartY) / blockAndGapHeight)

    // Clamp col/row index to valid grid range
    col = constrain(col, 0, gridCols - 1)
    row = constrain(row, 0, gridRows - 1)

    // Map the block's column/row index to the *sampling region* coordinates within the image
    // Use max(1, ...) for range size to prevent division by zero in map if grid is 1xN or Nx1
    let imgX = map(col, 0, gridCols - 1, sampleX, sampleX + sampleWidth - 1) // Map col to sampling X range
    let imgY = map(row, 0, gridRows - 1, sampleY, sampleY + sampleHeight - 1) // Map row to sampling Y range

    // Floor to get integer pixel coordinates
    imgX = Math.floor(imgX)
    imgY = Math.floor(imgY)

    // Final constraint to ensure coordinates are within the actual image bounds
    // (handles potential floating point inaccuracies at the edges of the map)
    imgX = constrain(imgX, 0, sourceImage.width - 1)
    imgY = constrain(imgY, 0, sourceImage.height - 1)

    // Calculate pixel array index
    let index = 4 * (imgY * sourceImage.width + imgX)

    // Get and set color (with safety check)
    if (index >= 0 && index + 3 < sourceImage.pixels.length) {
      block.color = color(
        sourceImage.pixels[index], // R
        sourceImage.pixels[index + 1], // G
        sourceImage.pixels[index + 2], // B
        sourceImage.pixels[index + 3] // A
      )
    } else {
      console.warn(
        `Invalid pixel index: ${index} for block col ${col}, row ${row} (img ${imgX}, ${imgY})`
      )
      block.color = color(128) // Fallback color
    }
  }
  console.log('Image processed onto blocks (with cropping).')
}

function createDynamicBlocks () {
  blocks = [] // Clear existing blocks

  // Calculate available space for the grid
  const availableWidth = width - 2 * marginHorizontal
  const availableHeight = height - marginTop - marginBottom

  if (availableWidth <= 0 || availableHeight <= 0) {
    console.error('Not enough space for blocks with current margins.')
    score.totalBlocks = 0
    return
  }

  const blockAndGapWidth = desiredBlockSize + gap
  const blockAndGapHeight = desiredBlockSize + gap

  // Calculate cols/rows: how many full units fit? Add gap back to available space
  // because the last block doesn't have a trailing gap *within the grid width*.
  gridCols = Math.floor((availableWidth + gap) / blockAndGapWidth)
  gridRows = Math.floor((availableHeight + gap) / blockAndGapHeight)

  if (gridCols <= 0 || gridRows <= 0) {
    console.error(
      'Calculated 0 columns or rows. Check block size, gap, and margins relative to canvas size.'
    )
    score.totalBlocks = 0
    return
  }

  // Calculate the actual width/height of the grid to center it
  // Correct calculation: Use blockAndGap for N-1 gaps, plus one block size
  gridActualWidth =
    gridCols > 0 ? gridCols * desiredBlockSize + (gridCols - 1) * gap : 0
  gridActualHeight =
    gridRows > 0 ? gridRows * desiredBlockSize + (gridRows - 1) * gap : 0

  // Clamp to ensure non-negative dimensions
  gridActualWidth = max(0, gridActualWidth)
  gridActualHeight = max(0, gridActualHeight)

  // Calculate starting position to center the grid
  gridStartX = marginHorizontal + (availableWidth - gridActualWidth) / 2
  gridStartY = marginTop + (availableHeight - gridActualHeight) / 2

  // Create the blocks
  blocks = [] // Clear existing blocks before creating new ones
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const x = gridStartX + col * blockAndGapWidth
      const y = gridStartY + row * blockAndGapHeight
      blocks.push(new Block(x, y, desiredBlockSize))
    }
  }

  score.totalBlocks = gridCols * gridRows
  console.log(
    `Created grid: ${gridCols}x${gridRows}, Start: (${gridStartX.toFixed(
      1
    )}, ${gridStartY.toFixed(1)}), Size: ${gridActualWidth.toFixed(
      1
    )}x${gridActualHeight.toFixed(1)}, Total: ${score.totalBlocks}`
  )
}

function setup () {
  createCanvas(400, 600)
  textAlign(CENTER, CENTER)
  paddle = new Paddle()
  ball = new Ball()
  createDynamicBlocks()
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
      drawGame();
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
  rectMode(CORNER)
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

function drawGame() {
  // background(0); // Clear screen

  // --- Draw Background Image (Cropped and Aligned with Grid Area) ---
  if (sourceImage && gridActualWidth > 0 && gridActualHeight > 0) {
    // Aspect ratios
    const gridAspect = gridActualWidth / gridActualHeight;
    const imageAspect = sourceImage.width / sourceImage.height;

    // Destination rectangle is always the exact grid area
    const destX = gridStartX;
    const destY = gridStartY;
    const destW = gridActualWidth;
    const destH = gridActualHeight;

    // Source rectangle coordinates and dimensions (within the source image)
    let sourceX = 0;
    let sourceY = 0;
    let sourceW = sourceImage.width;
    let sourceH = sourceImage.height;

    // Determine which dimension to crop in the source image
    if (imageAspect > gridAspect) {
      // Image is wider than the grid aspect ratio -> Crop image sides
      // Calculate the source width that matches the grid's aspect ratio
      sourceW = sourceImage.height * gridAspect;
      // Center the source crop horizontally
      sourceX = (sourceImage.width - sourceW) / 2;
      // Use full source height
      sourceY = 0;
      sourceH = sourceImage.height;
    } else if (imageAspect < gridAspect) {
      // Image is taller than the grid aspect ratio -> Crop image top/bottom
      // Calculate the source height that matches the grid's aspect ratio
      sourceH = sourceImage.width / gridAspect;
      // Center the source crop vertically
      sourceY = (sourceImage.height - sourceH) / 2;
      // Use full source width
      sourceX = 0;
      sourceW = sourceImage.width;
    }
    // Else: aspect ratios match, use the entire source image (sx=0, sy=0, sWidth=full, sHeight=full)

    // Ensure source coordinates and dimensions are valid
    sourceX = max(0, sourceX);
    sourceY = max(0, sourceY);
    sourceW = max(1, sourceW); // Ensure width is at least 1
    sourceH = max(1, sourceH); // Ensure height is at least 1
    // Prevent source crop going beyond image boundaries
    sourceW = min(sourceW, sourceImage.width - sourceX);
    sourceH = min(sourceH, sourceImage.height - sourceY);


    // Draw the calculated part of the source image into the exact grid destination area
    image(
      sourceImage,
      destX, destY, destW, destH,   // Destination rect (exact grid area)
      sourceX, sourceY, sourceW, sourceH // Source rect (cropped part of image)
    );
  }
  // --- End Background Image Drawing ---

  // 1. UPDATE POSITIONS
  if (gameState !== GAME_PAUSED) {
    paddle.move();
    ball.move(); // Apply dx, dy to x, y based on last frame's state
  }

  // --- Collision Detection and Resolution ---
  if (gameState !== GAME_PAUSED && ball.launched) {
    for (let block of blocks) {
      if (block.checkCollision(ball)) {
        break;
      }
    }
  }

  // 2. DRAW EVERYTHING LAST
  for (let block of blocks) {
    block.draw()
  }

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
      if (key === ' ' && !ball.launched) {
        ball.launch()
      } else if (key === 'p' || key === 'P' || key === ' ') {
        gameState = GAME_PAUSED
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
  createDynamicBlocks()
}
