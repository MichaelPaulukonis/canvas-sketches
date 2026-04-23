import axios from 'axios'
import * as cheerio from 'cheerio'

const messageUrl =
  'https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub'

const CELL_X = 0
const CELL_Y = 2
const CELL_CHAR = 1
const HEADER_ROW = 0

const getCharacterTable = (url) => {
  return new Promise((resolve, reject) => {
    return axios.get(url).then(
      response => {
        const $ = cheerio.load(response.data)
        const rows = $('table').find('tr')
        const table = {
          rows: 0,
          columns: 0,
          data: []
        }
        rows.each((i, row) => {
          if (i === HEADER_ROW) return
          const rowData = {}
          const cells = $(row).find('td')
          cells.each((j, cell) => {
            if (j === CELL_X) rowData.x = parseInt($(cell).text(), 10)
            if (j === CELL_Y) rowData.y = parseInt($(cell).text(), 10)
            if (j === CELL_CHAR) rowData.char = $(cell).text()
          })
          // capture max values so we will not have to traverse the entire grid to find
          table.rows = Math.max(table.rows, rowData.x)
          table.columns = Math.max(table.columns, rowData.y)
          table.data.push(rowData)
        })
        return resolve(table)
      },
      err => {
        reject(err)
      }
    )
  })
}

// adapted from https://stackoverflow.com/a/58668351/41153
const rotateCounterClockwise = grid => {
  return grid[0].map((_, index) => grid.map(row => row[row.length - 1 - index]))
}
const makeGrid = table => {
  const grid = new Array(table.rows + 1)
    .fill()
    .map(() => ' '.repeat(table.columns + 1).split(''))
  table.data.forEach(cell => {
    grid[cell.x][cell.y] = cell.char
  })
  return rotateCounterClockwise(grid)
}

const translateMessage = async (url) => {
  return getCharacterTable(url)
    .then(table => {
      const grid = makeGrid(table)
      const message = grid.map(row => row.join('')).join('\n')
      console.log(message)
    })
    .catch(err => {
      console.log(err)
    })
}

await translateMessage(messageUrl)
