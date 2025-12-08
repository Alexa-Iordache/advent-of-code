import { runSolution } from '../utils.ts';

function calculateDistance(a: [number, number, number], b: [number, number, number]): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

/** provide your solution as the return of this function */
export async function day8b(data: string[]) {

  const tempArray = [];
  const distAndIndex: { dist: number; i: number; j: number }[] = [];
  const nodes = [];

  data.forEach(line => {
    tempArray.push(line.split(',').map(Number));
  })

  for (let i = 0; i < tempArray.length - 1; i++) {
    for (let j = i + 1; j < tempArray.length; j++) {
      const dist = calculateDistance(tempArray[i], tempArray[j]);
      distAndIndex.push({ dist, i, j });
    }
  }

  distAndIndex.sort((a, b) => a.dist - b.dist);

  // create the array with nodes
  for (let i = 0; i < distAndIndex.length; i++) {
    // console.log(distAndIndex[i].dist, distAndIndex[i].i, distAndIndex[i].j);
    nodes.push([distAndIndex[i].i, distAndIndex[i].j]);
  }
  // console.log(nodes);

  const groups = [];
  let lastPair = [];

  for (const [a, b] of nodes) {

    // find group index that contains a or b
    const index_a: number = groups.findIndex(g => g.includes(a));
    const index_b: number = groups.findIndex(g => g.includes(b));

    // if there is no group that contains neither a or b, we add the node to the groups array
    if(index_a === -1 && index_b === -1)  {
      groups.push([a, b]);
    }
    // if a exists
    else if (index_a !== -1 && index_b === -1) {
      // check if b is already in that group
      if(!groups[index_a].includes(b)) {
        groups[index_a].push(b);
      }
    }
    else if (index_a === -1 && index_b !== -1) {
      // check if b is already in that group
      if(!groups[index_b].includes(a)) {
        groups[index_b].push(a);
      }
    }
    // if a and b are in different groups, we merge the second group into the first one and delete the second one
    else if (index_a !== -1 && index_b !== -1 &&  index_a !== index_b) {
      const newItems = groups[index_b].filter(item => !groups[index_a].includes(item));
      groups[index_a] = groups[index_a].concat(newItems);
      groups.splice(index_b, 1);
    }


    groups.sort((a, b) => b.length - a.length);
    const finalGroup = groups[0];
    // console.log(finalGroup);
    // console.log(finalGroup.length);
    // console.log([a, b]);
    lastPair = [a, b];
    if(finalGroup.length === data.length) break;
  }

  console.log(lastPair);
  const first = data[lastPair[0]].split(',').map(Number)[0];
  const second = data[lastPair[1]].split(',').map(Number)[0];
  console.log(first, second)

  return first * second;
}

await runSolution(day8b);