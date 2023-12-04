const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
//const input: string = await Bun.file(`${import.meta.dir}/example`).text();

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
class Game {
  id: Number
  sets: Array<GameSet>
  constructor(line: string) {
    const firstSplit = line.split(':')
    this.id = Number(firstSplit[0].split(' ')[1])
    this.sets = firstSplit[1].split(';').map(setString => {

      return new GameSet(setString)
    })
  }
}

class GameSet {
  boxes: Array<Boxes>
  constructor(line: string) {
    this.boxes = line.split(",").map(boxesString => new Boxes(boxesString))
    //3 blue, 4 red;

  }
}

class Boxes {
  color: string
  amount: number
  // 3 blue;
  constructor(line: string) {
    line.trim().split(',')
  }
}

const lines = input
  .split("\n")

lines.map(line => {
  return line.split(':')
})
/*.map(line => line.match(numberPattern)?.join('') ?? '0')
  .map(lineNumbers => Number(lineNumbers[0] + lineNumbers[lineNumbers.length - 1]))
  .reduce((acc, current) => acc + current, 0)

console.log(result)
*/

