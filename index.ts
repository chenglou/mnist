import {numbers} from './data'

const references = document.createElement('div')
references.style.display = 'flex'
references.style.justifyContent = 'center'
document.body.appendChild(references)

function makeGrid(data: number[][]) {
  const container = document.createElement('div')
  container.style.display = 'flex'
  container.style.flexDirection = 'column'
  container.style.margin = '8px'
  references.appendChild(container)

  const divs: HTMLDivElement[] = []
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement('div')
    row.style.display = 'flex'
    row.style.flexDirection = 'row'
    container.appendChild(row)
    for (let j = 0; j < data[i].length; j++) {
      const active = data[i][j] === 1
      const div = document.createElement('div')
      div.style.width = '16px'
      div.style.height = '16px'
      div.style.backgroundColor = active ? '#aaa' : '#ddd'
      div.style.outline = '1px solid #000'
      divs.push(div)
      row.appendChild(div)
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
  const testContainer = document.createElement('div')
  testContainer.style.display = 'flex'
  testContainer.style.flexDirection = 'column'
  testContainer.style.alignItems = 'center'
  testContainer.style.margin = '16px'
  testsContainer.appendChild(testContainer)
  const divs: HTMLDivElement[] = []
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement('div')
    row.style.display = 'flex'
    row.style.flexDirection = 'row'
    testContainer.appendChild(row)
    for (let j = 0; j < data[i].length; j++) {
      const active = data[i][j] === 1
      const div = document.createElement('div')
      div.style.width = '20px'
      div.style.height = '20px'
      div.style.backgroundColor = active ? '#aaa' : '#ddd'
      div.style.outline = '1px solid #000'
      divs.push(div)
      row.appendChild(div)
    }
  }

  const labelsContainer = document.createElement('div')
  labelsContainer.style.display = 'flex'
  labelsContainer.style.flexDirection = 'column'
  labelsContainer.style.margin = '8px'
  const scores = scoresForGuess(data)
  const bestScore = Math.max(...scores)
  const maxScore = 25
  const scoreBarMaxSizeX = 80
  for (let i = 0; i < scores.length; i++) {
    const labelContainer = document.createElement('div')
    labelContainer.style.display = 'flex'
    labelContainer.style.gap = '4px'
    labelContainer.style.alignItems = 'center'
    const numberLabel = document.createElement('div')
    numberLabel.innerText = i.toString()
    numberLabel.style.fontSize = '20px'
    const scoreBar = document.createElement('div')
    scoreBar.style.width = `${scores[i] / maxScore * scoreBarMaxSizeX}px`
    scoreBar.style.height = '20px'
    scoreBar.style.backgroundColor = scores[i] === bestScore ? '#aaa' : '#ddd'
    const scoreLabel = document.createElement('div')
    scoreLabel.innerText = scores[i].toString()
    scoreLabel.style.fontSize = '20px'

    labelContainer.appendChild(numberLabel)
    labelContainer.appendChild(scoreBar)
    labelContainer.appendChild(scoreLabel)
    labelsContainer.appendChild(labelContainer)
  }

  testContainer.appendChild(labelsContainer)
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
// populate tets with random numbers
for (let t = 0; t < 100; t++) {
  const test: number[][] = []
  for (let i = 0; i < 5; i++) {
    const row: number[] = []
    for (let j = 0; j < 5; j++) {
      const probability = j === 0 || j === 4 ? 0.8 : 0.6
      row.push(Math.random() > probability ? 1 : 0)
    }
    test.push(row)
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
