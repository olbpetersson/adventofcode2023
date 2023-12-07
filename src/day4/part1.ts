const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
//const input: string = await Bun.file(`${import.meta.dir}/example`).text();

// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
class ScratchCard {
  winningNumbers: number[]
  yourNumbers: number[]
  winningScore: number

  constructor(line: string) {
    const [ winningRaw, yourRaw] = line.split(':')[1].split('|')
    this.winningNumbers = winningRaw.split(' ')
      .filter(it => it !== '')
      .map(it => +it)
    this.yourNumbers = yourRaw.split(' ')
      .filter(it => it !== '')
      .map(it => +it)
    const sharedNumbers = this.winningNumbers.filter( win => this.yourNumbers.indexOf(win) > -1)
    this.winningScore = Math.floor(Math.pow(2, sharedNumbers.length-1))
  }
}

const lines = input
  .split('\n')
  .filter(it => it !== '' && it !== null)
  .map(line => new ScratchCard(line))

const result = lines.reduce((acc, current) =>
  acc + current.winningScore, 0)
console.log({ result, })

