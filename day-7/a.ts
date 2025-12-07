import { runSolution } from '../utils.ts';

function createIdentifier (a: number, b: number): string {
  return `[${a},${b}]`;
}

/** provide your solution as the return of this function */
export async function day7a(data: string[]) {

  // gasim pozitia de plecare
  let startCol = 0;
  for (let i = 0; i < data.length; i++) {
    startCol = data[i].indexOf('S');
    break;
  }
  // console.log(startRow, startCol);

  // o folosim pentru a
  const visited = new Set<string>();
  const splitters = new Set<string>();
  const positions = [];

  // raza incepe imediat sub S
  positions.push([1, startCol]);

  let result = 0;

  while (positions.length > 0) {
    const [row, col] = positions.shift()!;

    // daca iese din grid -> ignora
    if (row >= data.length || col < 0 || col >= data[0].length) continue;

    const currentPosID = createIdentifier(row, col);
    if (visited.has(currentPosID)) continue;
    visited.add(currentPosID);

    if (data[row][col] === '^') {
      if (!splitters.has(currentPosID)) {
        result += 1;
        splitters.add(currentPosID);

        positions.push([row, col - 1]);
        positions.push([row, col + 1]);
      }
    } else {
      positions.push([row + 1, col]);
    }
  }

  return result;
}

await runSolution(day7a);