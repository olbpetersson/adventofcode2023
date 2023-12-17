const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const exampleInput: string = await Bun.file(`${import.meta.dir}/example`).text();

const parseLine = (line: string) => {
  let numbers = line.split(' ').map(v => +v)
  const firstPos = [numbers[0]]
  let diffTables
  do {
    diffTables = []
    for (let i = 0; i < numbers.length - 1; i++) {
      diffTables[i] = numbers[i + 1] - numbers[i]
    }
    firstPos.push(diffTables[0])
    numbers = diffTables
  } while (diffTables.some(v => v !== 0))

  const poop = firstPos.reverse()
  const reconstruct = [0]
  for(let k = 1; k < firstPos.length; k++) {
    reconstruct.push(poop[k] - reconstruct[k-1])
  }
  return reconstruct[reconstruct.length -1]
}

const lines = input
  .split('\n')
  .filter(it => it !== '' && it !== null)
  .map(parseLine)

const result = lines.reduce((acc, current) =>
  acc + +current, 0)
console.log({ result })

