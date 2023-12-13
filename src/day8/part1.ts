const input: string = await Bun.file(`${import.meta.dir}/input1`).text();

type Node = {
  id: string
  leftId: string
  rightId: string,
}

let instructionsPointer = 0

const nodeMap = new Map<string, Node>()
const parseLine = (line: string) => {
  const [id, leftRightRaw] = line.replace(/(\()|(\))|\s/g, '').split('=')
  const [leftId, rightId] = leftRightRaw.split(',')
  nodeMap.set(id, { id, leftId, rightId })

  return line
}

const followInstructions = (instructions: string) => {
  let currentNode = nodeMap.get('AAA')
  while(true) {
    if(currentNode!.id === 'ZZZ') return
    const nextStep = instructions[instructionsPointer % instructions.length]
    switch(nextStep) {
      case 'L':
        currentNode = nodeMap.get(currentNode!.leftId)
        break
      case 'R':
        currentNode = nodeMap.get(currentNode!.rightId)
        break
    }
    instructionsPointer++
  }
}
const lines = input
  .split('\n')
  .filter(it => it !== '' && it !== null)

const instructionsRaw = lines[0]
lines.slice(1).map(parseLine)
followInstructions(instructionsRaw)
console.log({instructionsPointer})
