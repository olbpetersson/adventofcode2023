const input: string = await Bun.file(`${import.meta.dir}/input`).text();
//const input: string = await Bun.file(`${import.meta.dir}/example`).text();

const numberPattern = /\d+/g;

const result = input
  .split("\n")
  .map(line => line.match(numberPattern)?.join('') ?? '0')
  .map(lineNumbers => Number(lineNumbers[0] + lineNumbers[lineNumbers.length - 1]))
  .reduce((acc, current) => acc + current, 0)

console.log(result)


