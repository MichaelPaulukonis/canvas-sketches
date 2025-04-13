class Block {
  // constructor (x, y) { // OLD
  constructor (x, y, size) { // NEW: Accept size
    // this.size = 4 // OLD: Hardcoded size
    this.size = size; // NEW: Use passed size
    // this.margin = 1 // We'll use a separate 'gap' variable for layout
    this.x = x;
    this.y = y;
    this.active = true;
    this.color = color(255);
  }

  draw () {
    if (this.active) {
      fill(this.color);
      noStroke();
      rectMode(CORNER);
      // Uses this.size implicitly if width/height args are same
      rect(this.x, this.y, this.size, this.size);
    }
  }

  // Ensure handleBlockCollision uses the correct block size
  handleBlockCollision(ball, block) { // block here is 'this' when called from checkCollision
      const ballCenterX = ball.x + ball.size / 2;
      const ballCenterY = ball.y + ball.size / 2;
      // const blockCenterX = block.x + block.size / 2; // OLD - might have been hardcoded 4 somewhere implicitly
      const blockCenterX = this.x + this.size / 2; // Use this.size
      // const blockCenterY = block.y + block.size / 2; // OLD
      const blockCenterY = this.y + this.size / 2; // Use this.size

      // const halfTotalWidth = (ball.size + block.size) / 2; // OLD
      const halfTotalWidth = (ball.size + this.size) / 2; // Use this.size
      // const halfTotalHeight = (ball.size + block.size) / 2; // OLD
      const halfTotalHeight = (ball.size + this.size) / 2; // Use this.size

      // ... rest of handleBlockCollision logic remains the same ...
       // Vector from block center to ball center
      const vecX = ballCenterX - blockCenterX;
      const vecY = ballCenterY - blockCenterY;

      // Calculate overlaps
      const overlapX = halfTotalWidth - Math.abs(vecX);
      const overlapY = halfTotalHeight - Math.abs(vecY);

       const overlapTolerance = 0.5;
       const resolutionEpsilon = 0.01; // A tiny extra push distance

       if (overlapX > 0 && overlapY > 0) {
         let collisionAxis = null;

         if (Math.abs(overlapX - overlapY) < overlapTolerance) {
           if (Math.abs(ball.dx) > Math.abs(ball.dy)) {
             collisionAxis = 'horizontal';
              if (DEBUG) console.log(`Ambiguous Hit (Overlap): Favoring Horizontal (vx=${ball.dx.toFixed(2)}, vy=${ball.dy.toFixed(2)})`);
           } else {
             collisionAxis = 'vertical';
             if (DEBUG) console.log(`Ambiguous Hit (Overlap): Favoring Vertical (vx=${ball.dx.toFixed(2)}, vy=${ball.dy.toFixed(2)})`);
           }
         } else {
             if (overlapX < overlapY) {
                 collisionAxis = 'horizontal';
                 if (DEBUG) console.log(`Clear Horizontal Hit: overlapX=${overlapX.toFixed(2)}, overlapY=${overlapY.toFixed(2)}`);
             } else {
                 collisionAxis = 'vertical';
                  if (DEBUG) console.log(`Clear Vertical Hit: overlapX=${overlapX.toFixed(2)}, overlapY=${overlapY.toFixed(2)}`);
             }
         }

         if (collisionAxis === 'horizontal') {
             ball.dx *= -1;
             const resolveDistX = overlapX + resolutionEpsilon;
             ball.x += Math.sign(vecX) * resolveDistX;
              if (DEBUG) console.log(`   Reflecting dx, Resolving X by ${Math.sign(vecX) * resolveDistX}`);

         } else if (collisionAxis === 'vertical') {
             ball.dy *= -1;
             const resolveDistY = overlapY + resolutionEpsilon;
             ball.y -= Math.sign(vecY) * resolveDistY; // Corrected direction '-'
              if (DEBUG) console.log(`   Reflecting dy, Resolving Y by ${-Math.sign(vecY) * resolveDistY}`);
         }
       }
  }


  // checkCollision should be fine as it uses this.x, this.y, this.size
  checkCollision (ball) {
    if (!this.active) return false;

    // AABB collision check using ball CENTER and block CORNER+SIZE
    if (
      ball.x + ball.size / 2 > this.x && // Ball right edge > Block left edge
      ball.x - ball.size / 2 < this.x + this.size && // Ball left edge < Block right edge
      ball.y + ball.size / 2 > this.y && // Ball bottom edge > Block top edge
      ball.y - ball.size / 2 < this.y + this.size // Ball top edge < Block bottom edge
    ) {
      if (!sounds.mute && sounds.blockHit) sounds.blockHit.play(); // Check sound loaded

      this.handleBlockCollision(ball, this); // Pass 'this' explicitly if needed, otherwise context is fine

      this.active = false;
      score.blocksDestroyed++;

      // Check score *after* incrementing
      if (score.blocksDestroyed >= score.totalBlocks) {
          gameState = GAME_OVER; // Consider a specific VICTORY state?
          // Optional: Play victory sound if defined
          // if (!sounds.mute && sounds.victory) sounds.victory.play();
      }

      return true;
    }
    return false;
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
    this.size = 4
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

// --- Grid Layout Configuration ---
const desiredBlockSize = 6; // Or 4, or whatever you want
const gap = 1;              // Gap between blocks
const marginTop = 20;       // Space above grid
const marginBottom = 100;     // Space below grid (adjust based on paddle/score area)
const marginHorizontal = 20;  // Space on left/right sides

// --- Calculated Grid Properties (will be set in createDynamicBlocks) ---
let gridCols = 0;
let gridRows = 0;
let gridStartX = 0;
let gridStartY = 0;

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
  sourceImage = loadImage('mona.mono.00.jpg')
  sounds.blockHit = loadSound('704260__baggonotes__mug_tap.wav')
}

function processImage() {
  if (!sourceImage || blocks.length === 0 || gridCols === 0 || gridRows === 0) {
      console.warn("Cannot process image: Image not loaded or grid not created.");
      return; // Skip if image not loaded or grid is empty
  }

  sourceImage.loadPixels();

  if (!sourceImage.pixels || sourceImage.pixels.length === 0) {
     console.error("Image pixel data is not available.");
     return;
  }

  // For each block in our grid, sample the corresponding pixel
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];

    // Calculate the COLUMN and ROW index of this block within our dynamic grid
    // Use the actual blockAndGap size used during creation
    const blockAndGapWidth = desiredBlockSize + gap;
    const blockAndGapHeight = desiredBlockSize + gap;

    // Calculate col/row index relative to the grid start, handle potential floating point issues
    let col = Math.round((block.x - gridStartX) / blockAndGapWidth);
    let row = Math.round((block.y - gridStartY) / blockAndGapHeight);

     // Clamp values just in case rounding goes slightly out of bounds
    col = constrain(col, 0, gridCols - 1);
    row = constrain(row, 0, gridRows - 1);

    // Get pixel color from source image, mapping block grid index to image coordinates
    // Map the block's column/row index (0 to gridCols-1) to the image's width/height
    let imgX = Math.floor(map(col, 0, gridCols - 1, 0, sourceImage.width - 1));
    let imgY = Math.floor(map(row, 0, gridRows - 1, 0, sourceImage.height - 1));

    // Ensure mapped coordinates are within image bounds
    imgX = constrain(imgX, 0, sourceImage.width - 1);
    imgY = constrain(imgY, 0, sourceImage.height - 1);


    let index = 4 * (imgY * sourceImage.width + imgX); // Calculate pixel index

    // Check if index is valid before accessing pixels
    if (index >= 0 && index + 3 < sourceImage.pixels.length) {
        // Store color in block
        block.color = color(
          sourceImage.pixels[index],     // R
          sourceImage.pixels[index + 1], // G
          sourceImage.pixels[index + 2], // B
          sourceImage.pixels[index + 3]  // A
        );
    } else {
        console.warn(`Invalid pixel index calculated: ${index} for block at col ${col}, row ${row} (mapped to img ${imgX}, ${imgY})`);
        block.color = color(128); // Default to gray if index is bad
    }
  }
   console.log("Image processed onto blocks.");
}

function createDynamicBlocks() {
  blocks = []; // Clear existing blocks

  // Calculate available space for the grid
  const availableWidth = width - 2 * marginHorizontal;
  const availableHeight = height - marginTop - marginBottom;

  if (availableWidth <= 0 || availableHeight <= 0) {
      console.error("Not enough space for blocks with current margins.");
      score.totalBlocks = 0;
      return;
  }

  // Calculate how many blocks+gaps fit
  const blockAndGapWidth = desiredBlockSize + gap;
  const blockAndGapHeight = desiredBlockSize + gap;

  // Calculate cols/rows: how many full units fit? Add gap back to available space
  // because the last block doesn't have a trailing gap *within the grid width*.
  gridCols = Math.floor((availableWidth + gap) / blockAndGapWidth);
  gridRows = Math.floor((availableHeight + gap) / blockAndGapHeight);

   if (gridCols <= 0 || gridRows <= 0) {
      console.error("Calculated 0 columns or rows. Check block size, gap, and margins relative to canvas size.");
       score.totalBlocks = 0;
      return;
  }


  // Calculate the actual width/height of the grid to center it
  const totalGridWidth = gridCols * desiredBlockSize + (gridCols - 1) * gap;
  const totalGridHeight = gridRows * desiredBlockSize + (gridRows - 1) * gap;

  // Calculate starting position to center the grid
  gridStartX = marginHorizontal + (availableWidth - totalGridWidth) / 2;
  gridStartY = marginTop + (availableHeight - totalGridHeight) / 2;

  // Create the blocks
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const x = gridStartX + col * blockAndGapWidth;
      const y = gridStartY + row * blockAndGapHeight;
      // Pass the desired size to the constructor
      blocks.push(new Block(x, y, desiredBlockSize));
    }
  }

  // Update total blocks count for scoring
  score.totalBlocks = gridCols * gridRows;
  console.log(`Created grid: ${gridCols}x${gridRows}, Start: (${gridStartX.toFixed(1)}, ${gridStartY.toFixed(1)}) Total: ${score.totalBlocks}`);
}

function setup () {
  createCanvas(400, 600)
  textAlign(CENTER, CENTER)
  paddle = new Paddle()
  ball = new Ball()
  createDynamicBlocks()
  if (sourceImage) {
    processImage();
 } else {
    console.warn("Source image not loaded in preload, cannot process.");
 }
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
  // 1. UPDATE POSITIONS FIRST
  paddle.move()
  ball.move() // Apply dx, dy to x, y based on last frame's state

  // --- Collision Detection and Resolution AFTER moving ---
  if (ball.launched) {
    for (let block of blocks) {
      // checkCollision now checks based on the *new* ball position
      // and handles the collision (reflection + penetration resolution) if needed.
      if (block.checkCollision(ball)) {
        // Optional: Depending on how sticky you want collisions,
        // you might decide if breaking here is still correct.
        // If the ball could hit two blocks after one move,
        // you might need a more complex resolution.
        // For now, let's keep the break.
        break
      }
    }
  }
  // --- End Collision Handling ---

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
  createDynamicBlocks()
}
