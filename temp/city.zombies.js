// expects p5 and p5Play to exist in global (ugh) scope

let city = []
let rows = 21
let cols = 21
let tileSize = 20
let humans = []
let zombies = []
let numHumans = 100
let bricks = {}
let margin = 5
const humanSpeed = 1
let zombieSpeed = 0.9
const zombieBounciness = 0.8

const COLORS = {
  HUMAN: {},
  ZOMBIE: {}
}

function setup () {
  createCanvas(cols * tileSize, rows * tileSize)
  generateCity()

  COLORS.HUMAN = color('white')
  COLORS.ZOMBIE = color('red')

  createHumans()

  const target = random(humans)
  turnZombie(target)
  removeHuman(target)
}

function draw () {
  background(220)
  for (let s of allSprites) {
    if (s.x < -margin) s.x = canvas.w + margin
    if (s.x > canvas.w + margin) s.x = -margin
    if (s.y < -margin) s.y = canvas.h + margin
    if (s.y > canvas.h + margin) s.y = -margin
  }

  // Check for collisions and turn white agents red if they collide with a red agent
  for (const zombie of zombies) {
    for (let human of humans) {
      if (zombie.collides(human)) {
        turnZombie(human)
        removeHuman(human)
      }
    }
  }
  for (let human of humans) {
    if (human.color === COLORS.ZOMBIE) {
      for (let other of humans) {
        if (other.color === COLORS.HUMAN && human.collides(other)) {
          other.color = COLORS.ZOMBIE
          other.speed = zombieSpeed
          other.bounciness = zombieBounciness
        }
      }
    }
  }
}

function generateCity () {
  city = []

  bricks = new Group()
  bricks.collider = 'static'
  bricks.w = tileSize
  bricks.h = tileSize
  bricks.tile = '='
  bricks.color = 'black'

  // Initialize the city with all walls
  for (let i = 0; i < rows; i++) {
    city[i] = []
    for (let j = 0; j < cols; j++) {
      city[i][j] = '='
    }
  }

  // Start the recursive backtracking algorithm from a random cell
  const startRow = Math.floor(Math.random() * rows)
  const startCol = Math.floor(Math.random() * cols)
  generateMaze(city, startRow, startCol)

  // Convert the 2D array to a string for use with Tiles
  const cityString = city.map(row => row.join(''))
  new Tiles(cityString, tileSize / 2, tileSize / 2, tileSize, tileSize)
}

function generateMaze (city, row, col) {
  const rows = city.length
  const cols = city[0].length

  // Mark the current cell as part of the maze
  city[row][col] = '.'

  // Shuffle the order of the directions to visit
  const directions = shuffle([
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ])

  // Recursively visit each direction
  for (const [dx, dy] of directions) {
    const newRow = row + dy * 2
    const newCol = col + dx * 2

    // Check if the new cell is within the bounds and is a wall
    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      city[newRow][newCol] === '='
    ) {
      // Carve a path between the current cell and the new cell
      city[row + dy][col + dx] = '.'
      // sometimes skip this, which leaves more gaps
      if (Math.random() < 0.7) {
        // Recursively generate the maze from the new cell
        generateMaze(city, newRow, newCol)
      }
    }
  }
}

// Helper function to shuffle an array in-place
function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function createHumans () {
  for (let i = 0; i < numHumans; i++) {
    let validPosition = false
    let x, y
    while (!validPosition) {
      x = floor(random(cols)) * tileSize + tileSize / 2
      y = floor(random(rows)) * tileSize + tileSize / 2
      let col = floor(x / tileSize)
      let row = floor(y / tileSize)

      // Check if the position is a street ('.')
      // city is an array of strings, but strings allow for indexing
      if (city[row][col] === '.') {
        validPosition = true
      }
    }
    let human = new Sprite(x, y, 10)
    human.color = COLORS.HUMAN
    human.direction = random(360)
    human.speed = random(4)
    human.bounciness = 1
    human.friction = 0
    humans.push(human)
  }
}

function removeHuman (human) {
  let hidx = humans.indexOf(human)
  humans.splice(hidx, 1)
  human.remove()
}

// also adds to zombies. rename
function turnZombie (human) {
  let zombie = new Sprite(human.x, human.y, 10)
  zombie.color = COLORS.ZOMBIE
  zombie.speed = zombieSpeed
  zombie.bounciness = zombieBounciness
  zombies.push(zombie)
}
