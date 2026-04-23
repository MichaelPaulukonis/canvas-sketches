let player
let oxygen
let maxOxygen = 100
let money = 0
let fish = []
let specialFish
let harpoon
let harpoonSpeed = 10
let harpoonFired = false
let harpoonTarget = null
let isOnSurface = false

function setup () {
  createCanvas(800, 600)
  textAlign(CENTER, CENTER)
  player = createPlayer()
  oxygen = maxOxygen
  harpoon = createHarpoon()

  // Create normal fish
  for (let i = 0; i < 10; i++) {
    fish.push(createFish())
  }

  // Create special fish 🐳 with 🎬
  specialFish = createSpecialFish()
}

function draw () {
  if (isOnSurface) {
    showSurfaceScreen()
  } else {
    showFishingScreen()
  }
}

function showFishingScreen () {
  background(0, 100, 255)
  drawOxygenBar()
  drawFish()
  drawHarpoon()

  drawPlayer()

  updateHarpoon()
  checkCollisions()
  oxygen -= 0.1

  // Check if oxygen runs out
  if (oxygen <= 0) {
    goToSurface()
  }
}

// Draw the player emoji in the bottom-left corner
function drawPlayer () {
  textSize(50)
  text(player.emoji, player.x, player.y)
}

function createPlayer () {
  let emojis = ['😏', '😃', '😱']
  return {
    emoji: random(emojis),
    x: 50, // Fixed position in the bottom-left corner
    y: height - 50
  }
}

function createHarpoon () {
  return {
    x: player.x,
    y: player.y,
    angle: 0,
    active: false
  }
}

function drawHarpoon () {
  if (harpoon.active) {
    push()
    translate(harpoon.x, harpoon.y)
    rotate(harpoon.angle)
    textSize(40)
    text('⇀', 0, 0)
    pop()
  }
}

function updateHarpoon () {
  if (harpoon.active) {
    harpoon.x += harpoonSpeed * cos(harpoon.angle)
    harpoon.y += harpoonSpeed * sin(harpoon.angle)

    // Check if harpoon is off-screen
    if (
      harpoon.x < 0 ||
      harpoon.x > width ||
      harpoon.y < 0 ||
      harpoon.y > height
    ) {
      harpoon.active = false
    }
  }
}

function mousePressed () {
  if (!harpoon.active && !isOnSurface) {
    harpoon.x = player.x
    harpoon.y = player.y
    harpoon.angle = atan2(mouseY - player.y, mouseX - player.x)
    harpoon.active = true
  }
}

function drawOxygenBar () {
  fill(255)
  rect(20, 20, maxOxygen, 20)
  fill(0, 255, 0)
  rect(20, 20, oxygen, 20)
  fill(255)
  textSize(16)
  text('Oxygen: ' + int(oxygen), 70, 30)
  text('Money: $' + money, 700, 30)
}

function createFish () {
  let emojis = ['🐟', '🐠', '🐡', '🐙', '🦐', '🦑', '🦀']
  return {
    emoji: random(emojis),
    x: random(200, width),
    y: random(height),
    value: 10
  }
}

function createSpecialFish () {
  return {
    emoji: '🐳🎬',
    x: random(200, width),
    y: random(height)
  }
}

function drawFish () {
  for (let i = 0; i < fish.length; i++) {
    textSize(40)
    text(fish[i].emoji, fish[i].x, fish[i].y)
    fill('white') // Set text color to black
    textSize(12) // Adjust text size as needed
    text(`\$${fish[i].value}`, fish[i].x - 10, fish[i].y - 20) // Display money value above the fish
  }
  textSize(40)
  text(specialFish.emoji, specialFish.x, specialFish.y)
}

function checkCollisions () {
  if (harpoon.active) {
    for (let i = fish.length - 1; i >= 0; i--) {
      if (dist(harpoon.x, harpoon.y, fish[i].x, fish[i].y) < 30) {
        money += 10
        fish.splice(i, 1)
        fish.push(createFish())
        harpoon.active = false
        break
      }
    }

    if (dist(harpoon.x, harpoon.y, specialFish.x, specialFish.y) < 30) {
      oxygen = maxOxygen
      specialFish.x = -100
      specialFish.y = -100
      harpoon.active = false
    }
  }
}

function goToSurface () {
  isOnSurface = true
  oxygen = 0
}

function showSurfaceScreen () {
  background(255, 255, 0)
  fill(0)
  textSize(32)
  text('🏝 You returned to the surface!', width / 2, height / 2 - 20)
  textSize(24)
  text('Press SPACE to go fishing again', width / 2, height / 2 + 20)

  text(`Money: ${money}`, width / 2, height / 2 + 80)
  // Display the current oxygen level
  text(`Oxygen: ${maxOxygen}`, width / 2, height / 2 + 110)

  // Upgrade oxygen message
  let upgradeMessage =
    money >= 100
      ? `Press U to upgrade your oxygen supply: $100`
      : 'Not enough money to upgrade oxygen! 💸'
  if (keyIsDown(85) && money >= 100) {
    money -= 100
    maxOxygen += 20
    oxygen = maxOxygen
  }
  text(upgradeMessage, width / 2, height / 2 + 140)

  if (keyIsDown(32)) {
    isOnSurface = false
    oxygen = maxOxygen
    for (let i = 0; i < 10; i++) {
      fish[i] = createFish()
    }
    specialFish = createSpecialFish()
  }
}
