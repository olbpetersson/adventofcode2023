const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const exampleInput: string = await Bun.file(`${import.meta.dir}/example`).text();

const funkyMap = new Map<number, number>()

const updateWinningCopies = (id: number, steps: number) => {
  const numerate = funkyMap.get(id) || 1
  for (let h = 0; h < numerate; h++) {
    for (let i = id + 1; i <= id + steps; i++) {
      funkyMap.set(i, (funkyMap.get(i) || 1) + 1)
    }
  }
}
// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
class ScratchCard {
  winningNumbers: number[]
  yourNumbers: number[]

  constructor(line: string) {
    const split = line.split(':')
    const gameId = +split[0].split(/\s+/)[1]
    funkyMap.set(gameId, funkyMap.get(gameId) || 1)
    const [winningRaw, yourRaw] = split[1].split('|')
    this.winningNumbers = winningRaw.split(/\s+/)
      .filter(it => it !== '')
      .map(it => +it)
    this.yourNumbers = yourRaw.split(/\s+/)
      .filter(it => it !== '')
      .map(it => +it)
    const sharedNumbers = this.winningNumbers.filter(win => this.yourNumbers.includes(win))
    updateWinningCopies(gameId, sharedNumbers.length)
  }
}

input
  .split('\n')
  .filter(it => it !== '' && it !== null)
  .map(line => new ScratchCard(line))

const result = [...funkyMap.values()].reduce((acc, current) =>
  acc + current, 0)
console.log({ result, })

