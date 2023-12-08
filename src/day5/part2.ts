const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const exampleInput: string = await Bun.file(`${import.meta.dir}/example`).text();

class Range {
  lowerInclusive: number
  upperExclusive: number
  diff: number

  constructor(first: number, second: number, third: number) {
    this.lowerInclusive = second
    this.upperExclusive = second + third
    this.diff = this.lowerInclusive - first
  }
}

class Thingy {
  label: string
  ranges: Range[] = []
  nextThingy: Thingy | undefined

  constructor(nextLabel: string) {
    this.label = nextLabel
  }

  youCanNeverBreakTheChain(nuffra: number): number {
    const difference = this.ranges.find(it => it.lowerInclusive <= nuffra && it.upperExclusive > nuffra)?.diff ?? 0
    const relevantNuffra = nuffra - difference

    if (this.nextThingy) {
      return this.nextThingy.youCanNeverBreakTheChain(relevantNuffra)
    } else {
      return relevantNuffra
    }
  }
}

const digits = /(\d+)/g
const words = /^(\w+)-\w+-(\w+)/g

let startingPointThingy: Thingy | undefined
let activeThingy: Thingy = new Thingy('start')

const lines = input
  .split('\n')

const seeds = lines[0]!.match(/\d+/g)!.map(it => +it)

lines.forEach(word => {
  if (word.match(words)) {
    const [_, fromWord] = [...word.matchAll(words)][0]
    const newThingy = new Thingy(fromWord)
    if (!startingPointThingy) {
      startingPointThingy = newThingy
    }
    activeThingy.nextThingy = newThingy;
    activeThingy = newThingy;
  } else if (word.match(digits)) {
    const [offset, lowerInclusive, steps] = word.split(' ').map(it => +it)
    const hello = new Range(offset, lowerInclusive, steps)
    activeThingy.ranges.push(hello)
  }
})

let smallest = Number.MAX_SAFE_INTEGER

for(let i = 0; i < seeds.length; i+=2) {
  const seed = seeds[i]
  const steps = seeds[i+1]
  for(let k = seed; k < seed+steps; k++) {
     const competitor = startingPointThingy!.youCanNeverBreakTheChain(k)
     if(competitor < smallest) {
      smallest = competitor
    }
  }
}

console.log({ smallest })


