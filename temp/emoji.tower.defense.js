let towers = []
let enemies = []
let projectiles = []
let palaceHealth = 100
let path = []
let gridSize = 40
let palacePos
let spawnInterval = 2000
let currentWave = 1
let currentEnemyIndex = 0
let playerMoney = 5

let enemyTypes = [
  { damage: 5, health: 1, icon: '😡', value: 1 },
  { damage: 10, health: 5, icon: '🤡', value: 2 },
  { damage: 15, health: 15, icon: '👿', value: 3 },
  { damage: 50, health: 30, icon: '👹', value: 4 },
  { damage: 55, health: 40, icon: '👁', value: 5 }
]
let towerTypes = [
  { icon: '😃', damage: 1, range: 100, value: 5 },
  { icon: '😉', damage: 5, range: 150, value: 7 },
  { icon: '😏', damage: 10, range: 200, value: 9 },
  { icon: '😱', damage: 15, range: 300, value: 20 },
  { icon: '🤬', damage: 25, range: 400, value: 30 }
]

const waveStructure = [
  { numEnemies: 5, enemyTypes: [0] },
  { numEnemies: 10, enemyTypes: [0, 1] },
  { numEnemies: 15, enemyTypes: [0, 1, 2] },
  { numEnemies: 20, enemyTypes: [0, 1, 2, 3] },
  { numEnemies: 25, enemyTypes: [0, 1, 2, 3, 4] }
]

let isDragging = false
let selectedTowerType = null
let isPaused = false

function getPath () {
  const paths = [
    [
      { x: 0, y: 300 },
      { x: 200, y: 300 },
      { x: 200, y: 100 },
      { x: 400, y: 100 },
      { x: 400, y: 500 },
      { x: 600, y: 500 },
      { x: 600, y: 200 },
      { x: 700, y: 200 },
      { x: 700, y: 400 },
      { x: 800, y: 400 }
    ],
    [
      { x: 0, y: 200 },
      { x: 200, y: 200 },
      { x: 200, y: 400 },
      { x: 600, y: 400 },
      { x: 600, y: 200 },
      { x: 800, y: 200 }
    ],
    [
      { x: 0, y: 300 },
      { x: 200, y: 300 },
      { x: 200, y: 100 },
      { x: 400, y: 100 },
      { x: 400, y: 500 },
      { x: 600, y: 500 },
      { x: 600, y: 200 },
      { x: 800, y: 200 }
    ],
    [
      { x: 0, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 400 },
      { x: 300, y: 400 },
      { x: 300, y: 200 },
      { x: 500, y: 200 },
      { x: 500, y: 500 },
      { x: 600, y: 500 },
      { x: 600, y: 300 },
      { x: 700, y: 300 },
      { x: 700, y: 100 },
      { x: 800, y: 100 },
      { x: 800, y: 300 },
      { x: 900, y: 300 },
      { x: 900, y: 500 }
    ]
  ]
  return random(paths)
}

function setup () {
  createCanvas(800, 600)

  path = getPath()

  // Define palace position
  palacePos = { x: 780, y: 200 }

  // Spawn initial enemies
  setInterval(spawnEnemy, spawnInterval)
}

function draw () {
  background(220)
  drawTowerButtons(playerMoney)
  drawPath()
  drawPalace()
  if (!isPaused && isDragging) {
    displayDraggedTower()
  }
  updateTowers()
  updateEnemies()
  updateProjectiles()
  palaceDamageCheck()
  displayStats()
}

function keyPressed () {
  if (key === ' ') {
    isPaused = !isPaused
  }
}

function displayDraggedTower () {
  textSize(32)
  textAlign(CENTER, CENTER)
  text(selectedTowerType.icon, mouseX, mouseY)
}

function displayStats () {
  textSize(16)
  fill(0)
  textAlign(LEFT)
  text(`Wave: ${currentWave}`, 10, 20)
  text(`Palace Health: ${palaceHealth}`, 10, 40)
  text(`Palace Treasury: ${playerMoney}`, 10, 60)
}

function palaceDamageCheck () {
  for (let i = enemies.length - 1; i >= 0; i--) {
    if (
      dist(enemies[i].pos.x, enemies[i].pos.y, palacePos.x, palacePos.y) < 20
    ) {
      palaceHealth -= enemies[i].damage
      enemies.splice(i, 1)
      if (palaceHealth <= 0) {
        textSize(64)
        textAlign(CENTER, CENTER)
        text('Game Over', width / 2, height / 2)
        noLoop()
      }
    }
  }
}

function updateProjectiles () {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    if (!isPaused) projectiles[i].move()
    projectiles[i].display()

    // Check for collision with enemies
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (
        dist(
          projectiles[i].pos.x,
          projectiles[i].pos.y,
          enemies[j].pos.x,
          enemies[j].pos.y
        ) < 20
      ) {
        enemies[j].health -= projectiles[i].damage
        projectiles.splice(i, 1) // removes projectile from array
        if (enemies[j].health <= 0) {
          playerMoney += enemies[j].type.value
          enemies.splice(j, 1) // removes projectile from array
        }
        break
      }
    }

    // Remove projectiles that are off-screen
    if (
      projectiles[i] &&
      (projectiles[i].pos.x < 0 ||
        projectiles[i].pos.x > width ||
        projectiles[i].pos.y < 0 ||
        projectiles[i].pos.y > height)
    ) {
      projectiles.splice(i, 1)
    }
  }
}

function updateEnemies () {
  for (let enemy of enemies) {
    if (!isPaused) enemy.move()
    enemy.display()
  }
}

function updateTowers () {
  for (let tower of towers) {
    tower.display()
    if (isPaused) continue
    tower.shoot()
  }
}

function drawPalace () {
  textSize(32)
  textAlign(CENTER, CENTER)
  text('🏰', palacePos.x, palacePos.y)
}

// Draw the path for enemies
function drawPath () {
  stroke(0)
  noFill()
  beginShape()
  for (let point of path) {
    vertex(point.x, point.y)
  }
  endShape()
}

// Tower class
class Tower {
  constructor (x, y, tower) {
    this.pos = createVector(x, y)
    this.damage = tower.damage
    this.fireRate = 60 // Fire rate in frames
    this.lastShot = 0
    this.icon = tower.icon
    this.range = tower.range
  }

  display () {
    textSize(32)
    textAlign(CENTER, CENTER)
    text(this.icon, this.pos.x, this.pos.y)
  }

  shoot () {
    if (frameCount - this.lastShot > this.fireRate) {
      let closestEnemy = this.getClosestEnemy()
      if (closestEnemy) {
        projectiles.push(
          new Projectile(this.pos.x, this.pos.y, closestEnemy, this.damage)
        )
        this.lastShot = frameCount
      }
    }
  }

  getClosestEnemy () {
    let closestDist = this.range
    let closestEnemy = null
    for (let enemy of enemies) {
      let d = dist(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y)
      if (d < closestDist) {
        closestDist = d
        closestEnemy = enemy
      }
    }
    return closestEnemy
  }

  getIcon () {
    switch (this.damage) {
      case 1:
        return '😃'
      case 5:
        return '😉'
      case 10:
        return '😏'
      case 15:
        return '😱'
      case 25:
        return '🤬'
    }
  }
}

// Enemy class
class Enemy {
  constructor (type) {
    this.type = type
    this.pos = createVector(path[0].x, path[0].y)
    this.pathIndex = 0
    this.health = type.health
    this.damage = type.damage
    this.icon = type.icon
  }

  move () {
    let target = path[this.pathIndex]
    let dir = createVector(target.x - this.pos.x, target.y - this.pos.y)
    dir.normalize()
    this.pos.add(dir)

    if (dist(this.pos.x, this.pos.y, target.x, target.y) < 2) {
      this.pathIndex++
    }

    if (this.pathIndex >= path.length) {
      this.pathIndex = path.length - 1
    }
  }

  display () {
    textSize(32)
    textAlign(CENTER, CENTER)
    text(this.icon, this.pos.x, this.pos.y)

    // Display enemy health
    textSize(16)
    textAlign(LEFT, CENTER)
    text(this.health, this.pos.x - 20, this.pos.y - 20)
  }
}

// Projectile class
class Projectile {
  constructor (x, y, target, damage) {
    this.pos = createVector(x, y)
    this.target = target
    this.damage = damage
    this.speed = 5
  }

  move () {
    let dir = createVector(
      this.target.pos.x - this.pos.x,
      this.target.pos.y - this.pos.y
    )
    dir.normalize()
    this.pos.add(dir.mult(this.speed))
  }

  display () {
    textSize(32)
    // fill(0)
    textAlign(CENTER, CENTER)
    // bullet doesn't look awesome, TBH
    // maybe something simpler? or.... an arrow emoji? And rotate it to point at target
    text('⁍', this.pos.x, this.pos.y)
  }
}

// Note that you may need to adjust the wave structure and enemy types
// based on your desired difficulty progression and game balance.
// Additionally, you might want to consider adding a delay or a
// "wave preparation" phase between waves to give players a chance
// to prepare for the next wave.

function spawnEnemy () {
  if (isPaused) return

  const currentWaveData = waveStructure[currentWave - 1]
  if (currentEnemyIndex < currentWaveData.numEnemies) {
    const enemyTypeIndex =
      currentWaveData.enemyTypes[
        currentEnemyIndex % currentWaveData.enemyTypes.length
      ]
    const enemyType = enemyTypes[enemyTypeIndex]
    enemies.push(new Enemy(enemyType))
    currentEnemyIndex++
  } else {
    // TODO: we only have 5 waves defined, need more, or way to handle!
    currentWave++
    currentEnemyIndex = 0
  }
}

// Handle mouse click to place towers
function mousePressed () {
  // Check if the user clicked on a tower button
  for (let i = 0; i < towerTypes.length; i++) {
    let x = 10 + i * 50
    let y = 550
    if (dist(mouseX, mouseY, x, y) < 20 && towerTypes[i].value <= playerMoney) {
      selectedTowerType = towerTypes[i]
      isDragging = true
      break
    }
  }
}

function mouseDragged () {
  if (isDragging && isNearPath(mouseX, mouseY)) {
    // Place the tower at the current mouse position
    // TODO: center on the path? Do not overlap towers
    towers.push(new Tower(mouseX, mouseY, selectedTowerType))
    playerMoney -= selectedTowerType.value
    isDragging = false
    selectedTowerType = null
  }
}

function mouseReleased () {
  isDragging = false
  selectedTowerType = null
}

function drawTowerButtons (money) {
  textSize(32)
  textAlign(CENTER, CENTER)
  noStroke()
  let y = 550
  for (let i = 0; i < towerTypes.length; i++) {
    let x = 20 + i * 50
    let tower = towerTypes[i]
    if (tower.value <= money) {
      fill(0, 255)
    } else {
      fill(0, 100)
    }
    text(tower.icon, x, y)
  }
  fill(0, 255)
}

// Check if the tower is near the path
function isNearPath (x, y) {
  let near = false
  for (let i = 0; i < path.length - 1; i++) {
    const start = path[i]
    const end = path[i + 1]
    const closestPoint = closestPointOnLine(
      x,
      y,
      start.x,
      start.y,
      end.x,
      end.y
    )
    const distance = dist(x, y, closestPoint.x, closestPoint.y)
    if (distance < 5) {
      // Adjust this distance threshold as needed
      near = true
      break
    }
  }
  return near
}

function closestPointOnLine (px, py, x1, y1, x2, y2) {
  const A = px - x1
  const B = py - y1
  const C = x2 - x1
  const D = y2 - y1

  const dot = A * C + B * D
  const len_sq = C * C + D * D
  const param = dot / len_sq

  let xx, yy

  if (param < 0) {
    xx = x1
    yy = y1
  } else if (param > 1) {
    xx = x2
    yy = y2
  } else {
    xx = x1 + param * C
    yy = y1 + param * D
  }

  return createVector(xx, yy)
}
