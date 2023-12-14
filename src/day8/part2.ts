const input: string = await Bun.file(`${import.meta.dir}/input1`).text();
const exampleInput: string = await Bun.file(`${import.meta.dir}/example`).text();

type Node = {
  id: string
  leftId: string
  rightId: string,
}

let instructionsPointer = 0

let startingNodes: Array<Node> = []

const nodeMap = new Map<string, Node>()
const parseLine = (line: string) => {
  const [id, leftRightRaw] = line.replace(/(\()|(\))|\s/g, '').split('=')
  const [leftId, rightId] = leftRightRaw.split(',')
  const node = { id, leftId, rightId }
  nodeMap.set(id, node)
  if (id[2] === 'A') {
    startingNodes.push(node)
  }

  return line
}

const followInstructions = (instructions: string) => {
  while (true) {
    const newNodes = startingNodes.map(currentNode => {
      const nextStep = instructions[instructionsPointer % instructions.length]
      switch (nextStep) {
        case 'L':
          currentNode = nodeMap.get(currentNode!.leftId)
          break
        case 'R':
          currentNode = nodeMap.get(currentNode!.rightId)
          break
      }
      return currentNode
    })
    instructionsPointer++
    if (newNodes.find(node => node.id[2] !== 'Z')) {
      startingNodes = newNodes
    } else {
      return
    }
  }
}
const lines = input
  .split('\n')
  .filter(it => it !== '' && it !== null)

const instructionsRaw = lines[0]
lines.slice(1).map(parseLine)
followInstructions(instructionsRaw)
console.log({ instructionsPointer })
