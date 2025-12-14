import { runSolution } from '../utils.ts';

// Let's assuma (0, 0) - black
// row + col = even number - black tile
// row + col = odd number - white tile


// FOR SAMPLE DATA:

// shape 0: 4 black tiles + 3 white tiles -> imbalance = 4 - 3 = 1
// shape 1: 4 black tiles + 3 white tiles -> imbalance = 4 - 3 = 1
// shape 2: 3 black tiles + 4 white tiles -> imbalance = 3 - 4 = -1
// shape 3: 3 black tiles + 4 white tiles -> imbalance = 3 - 4 = -1
// shape 4: 4 black tiles + 3 white tiles -> imbalance = 4 - 3 = 1
// shape 5: 5 black tiles + 2 white tiles -> imbalance = 5 - 2 = 3

/** provide your solution as the return of this function */
export async function day12a(data: string[]) {

  // array with absolute imbalance values for each shape
  // const absoluteImbalances =  [1, 1, 1, 1, 1, 3];

  const regions: { width: number; height: number; presents: number[] }[] = [];

  for (const line of data) {
    if (!line) {
      continue;
    }
    const m = line.match(/^(\d+)\s*x\s*(\d+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const width = parseInt(m[1], 10);
    const height = parseInt(m[2], 10);
    const presents = m[3].trim().split(/\s+/).filter(Boolean).map(s => parseInt(s, 10));

    while (presents.length < 6) presents.push(0);
    if (presents.length > 6) presents.length = 6;
    regions.push({ width, height, presents });
  }

  // console.log(regions);
  let result = 0;

  for (let i = 0; i < regions.length; i++) {
    const regionArea = regions[i].width * regions[i].height;
    console.log(regionArea);

    let tempResult = 0;
    for (let j = 0; j < regions[i].presents.length; j++) {
      // console.log(regions[i].presents[j]);
      // tempResult += regions[i].presents[j] * 7;
      if (j === 1) tempResult += regions[i].presents[j] * 6;
      else if (j === 4) tempResult += regions[i].presents[j] * 5;
      else tempResult += regions[i].presents[j] * 7;
    }
    console.log(tempResult, '\n')
    if (tempResult < regionArea) result ++;
  }

  return result;
}

await runSolution(day12a);