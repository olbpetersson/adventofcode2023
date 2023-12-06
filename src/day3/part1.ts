const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
//const input: string = await Bun.file(`${import.meta.dir}/example`).text();

const digitRegex = /^[0-9]$/

const lines = input
  .split('\n')
  .filter(it => it !== '' && it !== null)

const hasAdjacentMarker = (widthMarker: number, heightMarker: number, matrix: string[][]) => {
  for (let width = Math.max(0, widthMarker - 1); width <= Math.min(matrix[0].length - 1, widthMarker + 1); width++) {
    for (let height = Math.max(0, heightMarker - 1); height <= Math.min(matrix.length - 1, heightMarker + 1); height++) {
      const target = matrix[height][width]
      if (!(digitRegex.test(target) || target === '.')) {
        return true
      }
    }
  }
}

class NumberWithAdjacentMarker {
  numberString: string = '';
  hasAdjacentMarker: boolean = false
  lastIndex: number[] = []
}

let currentNumber = new NumberWithAdjacentMarker()
const candidates: NumberWithAdjacentMarker[] = []
const matrix = lines
  .map(word => word.split(''))

matrix.forEach((line, i) => {
  line.forEach((value, k) => {
    if (digitRegex.test(value)) {
      currentNumber.numberString += value
      if (currentNumber.numberString === '111') {
        console.log({ currentNumber })
      }
      const hasMarker = hasAdjacentMarker(k, i, matrix)
      if (hasMarker) {
        currentNumber.hasAdjacentMarker = hasMarker
      }
      currentNumber.lastIndex = [k, i]
    } else {
      if (currentNumber.hasAdjacentMarker) {
        candidates.push(currentNumber)
      }
      currentNumber = new NumberWithAdjacentMarker()
    }
  })
})


const result = candidates.reduce((acc, current) =>
  acc + +current.numberString, 0)
console.log({ result })

