let img
let emojis = ['🔴', '⚫️', '🔵', '⚪️', '🟣', '🟡', '🟤', '🟢', '🟠']
let emojiCount = 20
let isImageLoaded = false

function setup () {
  // createCanvas(800, 600);
  // background(255);
  // textAlign(CENTER, CENTER);
  // textSize(20);

  // Set up drag-and-drop
  let dropZone = select('body')
  dropZone.dragOver(() => cursor('copy'))
  dropZone.drop(handleFile, () => cursor('default'))

  // Set up emoji input
  let emojiInput = select('#emojiCount')
  emojiInput.input(() => {
    emojiCount = int(emojiInput.value())
  })
}

function draw () {
  if (img && isImageLoaded) {
    let imgWidth = img.width
    let imgHeight = img.height
    let emojiSize = width / emojiCount

    clear()
    textSize(emojiSize)
    textAlign(CENTER, CENTER)

    img.loadPixels()
    if (img.pixels.length === 0) {
      console.error('Pixels array is empty.')
      return
    }

    for (let y = 0; y < imgHeight; y += emojiSize) {
      for (let x = 0; x < imgWidth; x += emojiSize) {
        let i = (x + y * imgWidth) * 4

        if (i + 3 < img.pixels.length) {
          let r = img.pixels[i]
          let g = img.pixels[i + 1]
          let b = img.pixels[i + 2]
          let avg = (r + g + b) / 3
          let emojiIndex = floor(map(avg, 0, 255, 0, emojis.length))
          emojiIndex = constrain(emojiIndex, 0, emojis.length - 1)
          let emoji = emojis[emojiIndex]

          fill(0)
          text(emoji, x + emojiSize / 2, y + emojiSize / 2)
        } else {
          console.error(
            'Pixel index out of bounds:',
            i,
            'Pixels length:',
            img.pixels.length
          )
        }
      }
    }
  } else if (img && !isImageLoaded) {
    console.log('Image is not fully loaded yet.')
  }
}

function handleFile (file) {
  if (file.type === 'image') {
    // Create image element
    loadImage(file.data, loadedImg => {
      img = loadedImg
      isImageLoaded = true
      console.log('Image loaded and pixels read.')

      // Get the image dimensions
      let imgWidth = img.width
      let imgHeight = img.height

      // Calculate the maximum dimension
      let maxDimension = max(imgWidth, imgHeight)

      // Calculate the canvas dimensions
      let canvasWidth, canvasHeight
      if (maxDimension > 1000) {
        // Scale down the image to fit within 1000px
        let scaleFactor = 1000 / maxDimension
        canvasWidth = imgWidth * scaleFactor
        canvasHeight = imgHeight * scaleFactor
      } else {
        // Use the original image dimensions
        canvasWidth = imgWidth
        canvasHeight = imgHeight
      }

      // Create the canvas with the calculated dimensions
      createCanvas(canvasWidth, canvasHeight)
      background(255)
      textAlign(CENTER, CENTER)
      textSize(20)
    })
  } else {
    console.error('Not an image file!')
  }
}

function keyPressed () {
  if (key === 's' || key === 'S') {
    saveCanvas('emoji_image', 'png')
  }
}
