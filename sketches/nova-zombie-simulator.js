const canvasSketch = require('canvas-sketch')
import p5 from 'p5'
window.p5 = p5
require('p5/lib/addons/p5.sound')

import Player from './nova.player.js'
import Soldier from './nova.soldier.js'
import Zombie from './nova.zombie.js'
import Human from './nova.human.js'

let player
let humans = []
let zombies = []
let soldiers = []
let soldierLimit = 3
let humanLimit = 10
let sound = {}

const preload = p5 => {
  console.log('preload')
  sound.scream = p5.loadSound(
    '/assets/nova-zombie/64940__syna-max__wilhelm_scream.wav'
  )
  sound.gunshot = p5.loadSound(
    '/assets/nova-zombie/128297__xenonn__layered-gunshot-7.wav'
  )
  sound.crunch = p5.loadSound(
    '/assets/nova-zombie/524609__clearwavsound__bone-crunch.wav'
  )
  sound.thing = p5.loadSound(
    '/assets/nova-zombie/425941__jarethorin__loopy-thing.wav'
  )
  console.log('preload complete')
}

const gameMode = {
  HELP: 'help',
  PLAYING: 'playing',
  GAME_OVER: 'game over',
  ATTRACT: 'attract'
}

let config = {
  mode: gameMode.ATTRACT,
  score: 0,
  level: 0,
  livesMax: 3
}

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  // Turn on a render loop
  animate: true,
  dimensions: [600, 600],
  prefix: 'nova-zombie'
}

canvasSketch(({ p5, play, canvas }) => {
  function resetLevel () {
    humans = []
    zombies = []
    soldiers = []
    for (let i = 0; i < humanLimit; i++) {
      humans.push(new Human(p5))
    }
    for (let i = 0; i < soldierLimit; i++) {
      soldiers.push(new Soldier(p5))
    }
    config.level++
    if (config.level % 2 === 0) {
      soldierLimit++
      humanLimit += 2
    }
  }

  function startGame () {
    console.log('start game')
    player = new Player(p5, config.livesMax)
    config.level = 0
    config.score = 0
    resetLevel()
    play()
    sound.thing.setVolume(1.0)
    sound.thing.loop()
  }

  function displayScore () {
    p5.fill(0)
    p5.textSize(24)
    p5.text('Score: ' + config.score, 10, 30)
    p5.text('Round: ' + config.level, 10, 60)
    p5.text(`Lives: ${player.lives}`, 10, 90)
  }

  let restartButton = p5.createButton('Start')
  // canvas positions are different inside of the animate loop. hrm.
  restartButton.position(
    canvas.offsetLeft,
    canvas.offsetTop + canvas.offsetHeight + 10
  )
  restartButton.mousePressed(startGame)

  startGame()

  return ({ p5, pause, width, height }) => {
    p5.background(220)
    player.move()
    player.display()

    if (player.lives <= 0) {
      sound.scream.play()
      // p5.noLoop() // this has no effect in canvas-sketch
      p5.textSize(32)
      p5.text('Game Over', width / 2 - 100, height / 2)
      pause()
      return
    }

    for (let human of humans) {
      human.move(zombies, player)
      human.display()
      if (player.touches(human)) {
        sound.crunch.play()
        zombies.push(new Zombie(human.x, human.y, p5))
        humans.splice(humans.indexOf(human), 1)
        config.score++
      }
    }

    for (let zombie of zombies) {
      zombie.move(soldiers, humans)
      zombie.display()
      for (let human of humans) {
        if (zombie.touches(human)) {
          sound.crunch.play()
          zombies.push(new Zombie(human.x, human.y, p5))
          humans.splice(humans.indexOf(human), 1)
          // config.score++Í
        }
      }
    }

    for (let soldier of soldiers) {
      soldier.move(player, zombies)
      soldier.display()
      if (soldier.touches(player) && !player.invulnerable) {
        player.killed()
      }
      for (let zombie of zombies) {
        if (soldier.touches(zombie)) {
          sound.gunshot.play()
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
