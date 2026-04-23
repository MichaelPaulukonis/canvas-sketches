let bubbles = [] // Array to hold all bubbles in the grid
let shootingBubbles = [] // Array to hold shooting bubbles
let shooterBubble // Current bubble color to be shot
let bubbleColors = ['🟢', '🔵', '🟣', '🟠', '🔴', '🟡'] // Bubble colors
let bubbleSize = 40 // Size of each bubble
let shooterX // Horizontal position of shooter
let shooterY // Vertical position of shooter
let isAiming = false // Track aiming state
let score = 0 // Player's score
let playerEmoji = '😃' // Player emoji

function setup () {
  createCanvas(600, 600) // Create a canvas of size 600x600
  shooterX = width / 2 // Position of the shooter
  shooterY = height - 60 // Position of the shooter
  generateRandomBubbles() // Populate the grid with bubbles
  shooterBubble = createShooterBubble() // Assign a random bubble to shoot
}

function draw () {
  background(135, 206, 250) // Light blue background
  textAlign(CENTER, CENTER)

  displayBubbles() // Show all bubbles on screen

  // Draw shooter bubble
  textSize(bubbleSize * 0.7)
  fill(0)
  text(playerEmoji, shooterX, shooterY) // Shooter emoji

  if (isAiming) {
    stroke(0, 100)
    line(shooterX, shooterY, mouseX, mouseY) // Draw aiming line
    text(shooterBubble, mouseX, mouseY) // Display shooting bubble while aiming
  }

  const outOfRange = bubble =>
    bubble.x < 0 || bubble.x > width || bubble.y < 0 || bubble.y > height

  // Update and move shooting bubbles
  for (let i = shootingBubbles.length - 1; i >= 0; i--) {
    shootingBubbles[i].update() // Update position of shooting bubbles
    if (outOfRange(shootingBubbles[i])) {
      shootingBubbles.splice(i, 1) // Remove shooting bubble after it hits
      break // Stop checking after collision
    }
    // Check for collision with fixed bubbles
    for (let j = bubbles.length - 1; j >= 0; j--) {
      if (
        dist(
          shootingBubbles[i].x,
          shootingBubbles[i].y,
          bubbles[j].x,
          bubbles[j].y
        ) <
        bubbleSize / 1.5
      ) {
        checkMatches(bubbles[j], shootingBubbles[i].color)
        shootingBubbles.splice(i, 1) // Remove shooting bubble after it hits
        break // Stop checking after collision
      }
    }
  }
  showScore() // Display score
}

// Function to generate random bubbles
function generateRandomBubbles () {
  for (let x = 0; x < width; x += bubbleSize) {
    for (let y = 0; y < height / 2; y += bubbleSize) {
      let colorIndex = floor(random(bubbleColors.length))
      bubbles.push(
        new Bubble(
          x + bubbleSize / 2,
          y + bubbleSize / 2,
          bubbleColors[colorIndex]
        )
      )
    }
  }
}

// Create a random bubble to shoot
function createShooterBubble () {
  let colorIndex = floor(random(bubbleColors.length))
  return bubbleColors[colorIndex] // Assign a random bubble color
}

// Function to display all fixed bubbles
function displayBubbles () {
  for (let bubble of bubbles) {
    textSize(bubbleSize)
    text(bubble.color, bubble.x, bubble.y) // Center the emoji in the bubble
  }
}

// Show current score
function showScore () {
  textAlign(LEFT)
  textSize(16)
  fill(0)
  text('Score: ' + score, 10, 20) // Display score in the top-left corner
}

// Start aiming when mouse is pressed
function mousePressed () {
  shooterBubble = createShooterBubble() // Assign a random bubble to shoot
  isAiming = true // Start aiming
}

// Shoot the bubble when mouse is released
function mouseReleased () {
  if (isAiming) {
    shootBubble() // Trigger bubble shooting
    isAiming = false // Stop aiming
  }
}

// Function to shoot a bubble
function shootBubble () {
  let newBubble = new ShootingBubble(shooterX, shooterY, shooterBubble)
  newBubble.direction = createVector(
    mouseX - shooterX,
    mouseY - shooterY
  ).normalize() // Pointing to the mouse
  newBubble.speed = 5 // Set shoot speed
  shootingBubbles.push(newBubble) // Add the new bubble to the shooting array
}

const hitWrongColor = matchedBubbles => matchedBubbles.length === 0

// Helper function to get the neighboring bubbles
function getNeighbors (bubble) {
  const neighbors = []
  const x = bubble.x
  const y = bubble.y

  // Check the bubbles above, below, left, and right
  const potentialNeighbors = [
    { x: x, y: y - bubbleSize }, // Above
    { x: x, y: y + bubbleSize }, // Below
    { x: x - bubbleSize, y: y }, // Left
    { x: x + bubbleSize, y: y } // Right
  ]

  for (const neighbor of potentialNeighbors) {
    const foundBubble = bubbles.find(
      b => b.x === neighbor.x && b.y === neighbor.y
    )
    if (foundBubble) {
      neighbors.push(foundBubble)
    }
  }

  return neighbors
}

// Function to check and remove matches
function checkMatches (hitBubble, shotColor) {
  const matchedBubbles = []
  const visited = new Set() // Keep track of visited bubbles

  // Recursive function to find all connected bubbles
  function floodFill (bubble) {
    if (bubble.color !== shotColor || visited.has(bubble)) {
      return // Return if the bubble is not the same color or has been visited
    }

    visited.add(bubble) // Mark the bubble as visited
    matchedBubbles.push(bubble) // Add the bubble to the matched bubbles array

    // Recursively check the neighboring bubbles
    const neighbors = getNeighbors(bubble)
    for (const neighbor of neighbors) {
      floodFill(neighbor)
    }
  }

  floodFill(hitBubble) // Start the flood fill from the hit bubble

  if (matchedBubbles.length === 0) {
    // If no matching bubbles were found, add the shooting bubble to the grid
    const newBubble = new Bubble(
      hitBubble.x,
      hitBubble.y + bubbleSize,
      shotColor
    )
    bubbles.push(newBubble)
  } else {
    // Remove all matched bubbles from the grid
    for (const bubble of matchedBubbles) {
      score += 10 // Increase score for each matching bubble
      removeFromBubbles(bubble)
    }
    // this could be optimized - only visit bubbles in rows that have been modified
    for (const bubble of bubbles) {
      const neighbors = getNeighbors(bubble)
      if (neighbors.length === 0) {
        score += 10 // Increase score for each matching bubble
        removeFromBubbles(bubble)
      }
    }
  }
}

// Bubble class for static bubbles
class Bubble {
  constructor (x, y, color) {
    this.x = x // X position
    this.y = y // Y position
    this.color = color // Color
  }
}

// Class for shooting bubbles
class ShootingBubble {
  constructor (x, y, color) {
    this.x = x // Starting X position
    this.y = y // Starting Y position
    this.color = color // Color of the bubble
    this.direction = createVector(0, 0) // Direction vector
    this.speed = 0 // Initial speed
    this.size = bubbleSize * 0.7
  }

  update () {
    this.x += this.direction.x * this.speed // Update X position
    this.y += this.direction.y * this.speed // Update Y position
    textSize(this.size)
    text(this.color, this.x, this.y)
  }
}
function removeFromBubbles(bubble) {
  const index = bubbles.indexOf(bubble)
  if (index !== -1) {
    bubbles.splice(index, 1)
  }
}

