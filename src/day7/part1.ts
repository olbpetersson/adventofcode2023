const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const exampleInput: string = await Bun.file(`${import.meta.dir}/example`).text();

const zeMap = new Map([
  ['A', 14],
  ['K', 13],
  ['Q', 12],
  ['J', 11],
  ['T', 10]
])

class Hand {
  handRaw: string
  handRank: number
  betValue: number
  constructor(line: string) {
    const [handRaw, betRaw] = line.split(' ')
    this.handRaw = handRaw
    this.betValue = +betRaw
    const localMap: Map<string, number> = new Map()
    handRaw.split('').forEach(char => {
      const newValue = (localMap.get(char) || 0) + 1
      localMap.set(char, newValue)
    })

    const poop = [...localMap.entries()].sort((a, b) => a[1] > b[1])

    let entries: any = []
    while (poop.length) {
      const nextEntry = poop.pop()
      if (nextEntry![1] === 1) {
        break
      }
      entries.push(nextEntry)
    }

    if (entries.length === 2) {
      this.handRank = (entries[0][1] * 2 + 1)
    } else {
      this.handRank = (entries[0] || [1, 1])[1] * 2
    }
  }
}

const sortHands = (a: Hand, b: Hand) => {
  if (a.handRank < b.handRank) {
    return 1
  } else if (a.handRank > b.handRank) {
    return -1
  } else {
    const bNuffr = b.handRaw.split('').map(c => (zeMap.get(c) || +c))
    const aNuffr = a.handRaw.split('').map(c => (zeMap.get(c) || +c))
    for (let i = 0; i < aNuffr.length; i++) {
      if (aNuffr[i] < bNuffr[i]) {
        return 1
      } else if (aNuffr[i] > bNuffr[i]) {
        return -1
      }
    }
    return 0
  }
}

const result = input
  .split('\n')
  .filter(it => it !== '' && it !== null)
  .map(v => new Hand(v))
  .sort(sortHands)
  .map((value, index) => value.betValue * (index + 1)).reduce((acc, current) => acc + current, 0)

console.log({ result })
