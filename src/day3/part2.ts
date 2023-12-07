const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
//const input: string = await Bun.file(`${import.meta.dir}/example`).text();

const digitRegex = /^[0-9]$/

const lines = input
  .split('\n')
  .filter(it => it !== '' && it !== null)

const getMarkerCoordinates = (widthMarker: number, heightMarker: number, matrix: string[][]) => {
  for (let width = Math.max(0, widthMarker - 1); width <= Math.min(matrix[0].length - 1, widthMarker + 1); width++) {
    for (let height = Math.max(0, heightMarker - 1); height <= Math.min(matrix.length - 1, heightMarker + 1); height++) {
      const target = matrix[height][width]
      if (target === '*') {
        return `${height}${width}`
      }
    }
  }
}

class NumberWithAdjacentMarker {
  numberString: string = '';
  markerCoordinates: string = ''
}

let currentNumber = new NumberWithAdjacentMarker()
const asteriskMap: Map<string, string[]> = new Map<string, string[]>()

const matrix = lines
  .map(word => word.split(''))

matrix.forEach((line, i) => {
  line.forEach((value, k) => {
    if (digitRegex.test(value)) {
      currentNumber.numberString += value
      const markerCoordinates = getMarkerCoordinates(k, i, matrix)
      if (markerCoordinates) {
        currentNumber.markerCoordinates = markerCoordinates
      }
    } else {
      if (currentNumber.markerCoordinates) {
        const prevValue = asteriskMap.get(currentNumber.markerCoordinates)
        const newValue = (prevValue ? [...prevValue, currentNumber.numberString] : [currentNumber.numberString])
        asteriskMap.set(currentNumber.markerCoordinates, newValue)
      }
      currentNumber = new NumberWithAdjacentMarker()
    }
  })
})

const twoMatchesSelection =
  [...asteriskMap.values()].filter(it => it.length == 2)

const result = twoMatchesSelection.reduce((acc, current) =>
  acc + +current[0] * +current[1], 0)
console.log({ result })

