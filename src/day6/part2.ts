const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const exampleInput: string = await Bun.file(`${import.meta.dir}/example`).text();

const [timeRaw, distanceRaw] = input
  .split('\n')
  .filter(it => it !== '' && it !== null)
const timeValue = +timeRaw.split(':')[1].split(/\s+/)
  .filter(it => it !== '' && it !== null)
  .join('')
const currentRecord = +distanceRaw.split(':')[1].split(/\s+/)
  .filter(it => it !== '' && it !== null)
  .join('')

let betterNumber: number = 0
for (let i = 1; i <= timeValue; i++) {
  const timeLeft = (timeValue - i)
  const distanceToCover = timeLeft * i
  if (distanceToCover > currentRecord) {
    betterNumber++
  }
}

console.log({ betterNumber })
