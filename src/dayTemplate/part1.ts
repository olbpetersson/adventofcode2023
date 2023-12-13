const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const exampleInput: string = await Bun.file(`${import.meta.dir}/example`).text();

const parseLine = (line: string) => {
  return line
}

const lines = input
  .split('\n')
  .filter(it => it !== '' && it !== null)
  .map(parseLine)

const result = lines.reduce((acc, current) =>
  acc + +current, 0)
console.log({ result })

