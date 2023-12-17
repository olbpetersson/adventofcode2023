const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const exampleInput: string = await Bun.file(`${import.meta.dir}/example`).text();

const parseLine = (line: string) => {
  let numbers = line.split(' ').map(v => +v)
  const finalPos = [numbers[numbers.length - 1]]
  let diffTables
  do {
    diffTables = []
    for (let i = 0; i < numbers.length - 1; i++) {
      diffTables[i] = numbers[i + 1] - numbers[i]
    }
    finalPos.push(diffTables[diffTables.length - 1])
    numbers = diffTables
  } while (diffTables.some(v => v !== 0))

  return finalPos.reduce((acc, current) => acc + current, 0)
}

const lines = input
  .split('\n')
  .filter(it => it !== '' && it !== null)
  .map(parseLine)

const result = lines.reduce((acc, current) =>
  acc + +current, 0)
console.log({ result })

