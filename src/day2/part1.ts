const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
//const input: string = await Bun.file(`${import.meta.dir}/example`).text();

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
class Game {
  id: number
  reds: number = 0
  blues: number = 0
  greens: number = 0

  constructor(line: string) {
    const firstSplit = line.split(':')
    this.id = +firstSplit[0].split(' ')[1]
    firstSplit[1].split(';').forEach(sets => {
      sets.split(',').forEach(colorBox => {
        const [amount, color] = removeWhitespace(colorBox).split(' ')
        switch (color.trim()) {
          case "red":
            this.reds = Math.max(+amount.trim(), this.reds)
            break;
          case "blue":
            this.blues = Math.max(+amount.trim(), this.blues)
            break;
          case "green":
            this.greens = Math.max(+amount.trim(), this.greens)
            break;
        }
      })
    })
  }

  isPossible = () => {
    return this.blues <= 14 && this.reds <= 12 && this.greens <= 13

  }
}

const removeWhitespace = (value: string) => value.replace(/^\s+|\s+$/g, '');

const lines = input
  .split('\n')
  .filter(it => it !== '' && it !== null)

const result = lines
  .map(line => new Game(line))

const possible = lines
  .map(line => new Game(line))
  .filter(game => game.isPossible())
  .reduce((acc, current) => acc + current.id, 0)

console.log({ result, possible })

