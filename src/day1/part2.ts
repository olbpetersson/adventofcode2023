const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
//const input: string = await Bun.file(`${import.meta.dir}/example2`).text();

const numberPattern = /(?=(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|(\d+))/g

const wordNumberMap = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
}

const result = input
  .split("\n")
  .map(line => {
    const regexIterator = line.matchAll(numberPattern) ?? []
    const matchedStrings = [...regexIterator].map(value => value.find(it => it != undefined && it != ''))
    const numbers = matchedStrings.map(value => {
      const mapHit = wordNumberMap[value]
      return mapHit ? mapHit : value
    })
    return numbers.join('')
  })
  .filter(it => it !== '')
  .map(lineNumbers => Number(lineNumbers[0] + lineNumbers[lineNumbers.length - 1]))


const reduced = result.reduce((acc, current) => acc + current, 0)
console.log({ reduced })
