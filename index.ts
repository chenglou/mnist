import {numbers} from './data'

const references = document.createElement('div')
references.style.display = 'flex'
references.style.justifyContent = 'center'
document.body.appendChild(references)

function makeGrid(data: number[][]) {
  const grid = document.createElement('div')
  grid.style.display = 'grid'
  grid.style.margin = '8px'
  grid.style.gridTemplateColumns = 'repeat(5, 1fr)'
  grid.style.gridTemplateRows = 'repeat(5, 1fr)'
  references.appendChild(grid)

  const divs: HTMLDivElement[] = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const active = data[i][j] === 1
      const div = document.createElement('div')
      div.style.width = '16px'
      div.style.height = '16px'
      div.style.backgroundColor = active ? '#aaa' : '#ddd'
      div.style.outline = '1px solid #000'
      divs.push(div)
      grid.appendChild(div)
    }
  }
}

makeGrid(numbers[0])
makeGrid(numbers[1])
makeGrid(numbers[2])
makeGrid(numbers[3])
makeGrid(numbers[4])
makeGrid(numbers[5])
makeGrid(numbers[6])
makeGrid(numbers[7])
makeGrid(numbers[8])
makeGrid(numbers[9])

const testsContainer = document.createElement('div')
testsContainer.style.display = 'flex'
testsContainer.style.justifyContent = 'center'
testsContainer.style.flexWrap = 'wrap'
testsContainer.style.margin = '16px'
document.body.appendChild(testsContainer)

function makeTestGrid(data: number[][]) {
  const container = document.createElement('div')
  container.style.display = 'flex'
  container.style.flexDirection = 'column'
  container.style.alignItems = 'center'
  container.style.margin = '16px'
  container.style.gap = '12px'
  testsContainer.appendChild(container)

  const grid = document.createElement('div')
  grid.style.display = 'grid'
  grid.style.gridTemplateColumns = 'repeat(5, 1fr)'
  grid.style.gridTemplateRows = 'repeat(5, 1fr)'
  grid.style.alignItems = 'center'
  container.appendChild(grid)

  const divs: HTMLDivElement[] = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const active = data[i][j] === 1
      const div = document.createElement('div')
      div.style.width = '20px'
      div.style.height = '20px'
      div.style.backgroundColor = active ? '#aaa' : '#ddd'
      div.style.outline = '1px solid #000'
      divs.push(div)
      grid.appendChild(div)
    }
  }

  const labelsContainer = document.createElement('div')
  labelsContainer.style.display = 'flex'
  labelsContainer.style.flexDirection = 'column'
  container.appendChild(labelsContainer)
  const scores = scoresForGuess(data)
  const bestScore = Math.max(...scores)
  const maxScore = 25
  const scoreBarMaxSizeX = 88
  for (let i = 0; i < scores.length; i++) {
    const labelContainer = document.createElement('div')
    labelContainer.style.display = 'flex'
    labelContainer.style.justifyContent = 'space-between'
    labelContainer.style.gap = '4px'
    labelContainer.style.alignItems = 'center'
    labelContainer.style.width = `${scoreBarMaxSizeX + 40 + 8}px`
    const numberLabel = document.createElement('div')
    numberLabel.style.textAlign = 'right'
    numberLabel.style.flexShrink = '0'
    numberLabel.innerText = `${i}`
    numberLabel.style.fontSize = '18px'
    numberLabel.style.width = `20px`
    const scoreBar = document.createElement('div')
    scoreBar.style.flexShrink = '0'
    scoreBar.style.height = '16px'
    scoreBar.style.width = `${scoreBarMaxSizeX}px`
    scoreBar.style.outline = '1px solid #999'
    const scoreBarFill = document.createElement('div')
    scoreBarFill.style.height = '16px'
    const width = Math.abs(scores[i] / maxScore * scoreBarMaxSizeX / 2)
    scoreBarFill.style.width = `${width}px`
    scoreBarFill.style.marginLeft = `${scoreBarMaxSizeX / 2 - (scores[i] >= 0 ? 0 : width)}px`
    scoreBarFill.style.backgroundColor = scores[i] === bestScore ? '#aaa' : '#ddd'
    scoreBar.appendChild(scoreBarFill)

    const scoreLabel = document.createElement('div')
    scoreLabel.style.flexShrink = '0'
    scoreLabel.innerText = scores[i].toString()
    scoreLabel.style.fontSize = '18px'
    scoreLabel.style.width = `20px`

    labelContainer.appendChild(numberLabel)
    labelContainer.appendChild(scoreBar)
    labelContainer.appendChild(scoreLabel)
    labelsContainer.appendChild(labelContainer)
  }
}

function scoresForGuess(guess: number[][]): number[] {
  const scores: number[] = []
  // iterate through all the numbers and compare against the guess
  for (let n = 0; n < numbers.length; n++) {
    const number = numbers[n]
    let scoreSoFar = 0
    for (let i = 0; i < number.length; i++) {
      for (let j = 0; j < number[i].length; j++) {
        if (number[i][j] === guess[i][j]) {
          scoreSoFar++
        } else {
          scoreSoFar--
        }
      }
    }
    scores.push(scoreSoFar)
  }
  return scores
}

const tests: number[][][] = []
// populate tests with random stuff
for (let t = 0; t < 14; t++) {
  const test: number[][] = []
  for (let i = 0; i < 5; i++) {
    const row: number[] = []
    for (let j = 0; j < 5; j++) {
      const probability = j === 0 || j === 4 ? 0.8 : 0.6
      row.push(hash12(t, i * j) > probability ? 1 : 0)
    }
    test.push(row)
  }
  tests.push(test)
}
// populate tests more, with less random stuff
for (let t = 0; t < 30; t++) {
  // choose an existing number from numbers, aka index 0=9
  const testIndex = Math.floor(hash12(t, 0) * numbers.length)
  const test = JSON.parse(JSON.stringify(numbers[testIndex]))
  for (let i = 0; i < test.length; i++) {
    for (let j = 0; j < test[i].length; j++) {
      if (hash12(t, i * j) > 0.8) {
        // flip it from 1 to 0 and 0 to 1
        test[i][j] = 1 - test[i][j]
      }
    }
  }
  tests.push(test)
}

// push a hand-picked test
tests.push([
  [0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
])

for (let i = 0; i < tests.length; i++) {
  makeTestGrid(tests[i])
}

function fract(x: number) {
  return x - Math.floor(x)
}
function hash12(a: number, b: number) {
  let aa = fract(a * .1031)
  let bb = fract(b * .1031)
  let p3_0 = aa * .1031, p3_1 = bb * .1031, p3_2 = aa * .1031
  let q3_0 = p3_0 + 33.33, q3_1 = p3_1 + 33.33, q3_2 = p3_2 + 33.33
  let dotted = p3_2 * q3_0 + p3_0 * q3_1 + p3_1 * q3_2
  p3_2 += dotted; p3_0 += dotted; p3_1 += dotted
  return fract((p3_2 + p3_0) * p3_1)
}
