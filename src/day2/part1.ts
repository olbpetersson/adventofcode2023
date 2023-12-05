//const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const input: string = await Bun.file(`${import.meta.dir}/example`).text();

const numberPattern = /\d+/g;
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
class Game {
  id: number
  reds: number = 0
  blues: number = 0
  greens: number = 0

  constructor(line: string) {
    const firstSplit = line.split(':')
    this.id = +firstSplit[0].split(' ')[1]
    // the rest includes 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    firstSplit[1].split(';').forEach(sets => {
      // 3 blue, 4 red;
      sets.split(',').forEach(colorBox => {
        const splitted = removeWhitespace(colorBox).split(' ')
        const [color, fest] = removeWhitespace(colorBox).split(' ')
        console.log({test, fest})
        console.log({splitted})
        const color = splitted[0].trim()
        const amount = splitted[1].trim()
//        console.log('colorBox', {colorBox, color})
        switch (color.trim()) {
          case "red":
            this.reds += +amount.trim()
          case "blue":
            this.blues += +amount.trim()
          case "green":
            this.greens += +amount.trim()
        }
      })
    })
  }
}

const removeWhitespace = (value: string) => value.replace(/^\s+|\s+$/g, '');

const lines = input
    .split('\n')
    .filter( it => it !== '' && it !== null)

const result = lines.map(line => {
  new Game(line)
})
console.log({result})
/*.map(line => line.match(numberPattern)?.join('') ?? '0')
  .map(linenumbers => number(linenumbers[0] + linenumbers[linenumbers.length - 1]))
  .reduce((acc, current) => acc + current, 0)

console.log(result)
*/

