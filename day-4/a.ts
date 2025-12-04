import { runSolution } from '../utils.ts';

function checkNeighbors(matrix, i, j) {
  const height = matrix.length;
  const width = matrix[0].length;
  let count = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) continue; // skip itself

      const posX = i + x;
      const posY = j + y;

      if (posX >= 0 && posX < height && posY >= 0 && posY < width) {
        if (matrix[posX][posY] === '@') count++;
      }
    }
  }

  return count;
}

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
  console.log(data);
  let totalRolls = 0;

  // create the matrix
  const matrix = data.map(row => row.split(''));

  const width = matrix[0].length;
  const height = matrix.length;

  // check every position
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if(matrix[i][j] !== '@') continue;

      const count = checkNeighbors(matrix, i, j);
      if (count < 4) totalRolls++;
    }
  }

  return totalRolls;
}

await runSolution(day4a);