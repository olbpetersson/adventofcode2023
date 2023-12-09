const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const exampleInput: string = await Bun.file(`${import.meta.dir}/example`).text();

const [timeRaw, distanceRaw] = input
  .split('\n')
  .filter(it => it !== '' && it !== null)
const timeArray = timeRaw.split(':')[1].split(/\s+/)
  .filter(it => it !== '' && it !== null)
  .map(it => +it)
const distanceArray = distanceRaw.split(':')[1].split(/\s+/)
  .filter(it => it !== '' && it !== null)
  .map(it => +it)

const betterList: number[] = []
timeArray.map((timeValue, index) => {
  const currentRecord = distanceArray[index]
  betterList.push(0)
  for(let i = 1; i <= timeValue; i++) {
    const timeLeft = (timeValue - i)
    const distanceToCover = timeLeft * i
    if(distanceToCover > currentRecord) {
      betterList[index]++
    }
  }
})

const result = betterList.reduce((acc, current) =>
  acc * current, 1)

console.log({ result, betterList})
