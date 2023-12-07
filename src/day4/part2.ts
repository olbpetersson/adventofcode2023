//const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const input: string = await Bun.file(`${import.meta.dir}/example`).text();
const funkyMap = new Map<number, number>()

const updateMap = (id: number, steps: number) => {
  for (let i = id+1; i <= id+steps; i++) {
    const oldValue = funkyMap.get(id)
    const newValue = oldValue ? (oldValue + 1) * oldValue : 1
    funkyMap.set(i, newValue)
  }
  console.log('After card', { id, funkyMap })
}
// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
class ScratchCard {
  winningNumbers: number[]
  yourNumbers: number[]
  winningScore: number

  constructor(line: string) {
    const split = line.split(':')
    const gameId = +split[0].split(' ')[1]
    const [winningRaw, yourRaw] = split[1].split('|')
    this.winningNumbers = winningRaw.split(' ')
      .filter(it => it !== '')
      .map(it => +it)
    this.yourNumbers = yourRaw.split(' ')
      .filter(it => it !== '')
      .map(it => +it)
    const sharedNumbers = this.winningNumbers.filter(win => this.yourNumbers.indexOf(win) > -1)
    this.winningScore = Math.floor(Math.pow(2, sharedNumbers.length - 1))
    updateMap(gameId, sharedNumbers.length)
  }
}

const lines = input
  .split('\n')
  .filter(it => it !== '' && it !== null)
  .map(line => new ScratchCard(line))

const result = lines.reduce((acc, current) =>
  acc + current.winningScore, 0)
console.log({ result, })

