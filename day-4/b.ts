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

function rewriteMatrix(prevMatrix: string[][]): { currentMatrix: string[][], removedRolls: number} {
  const width = prevMatrix[0].length;
  const height = prevMatrix.length;

  // create the next matrix
  const currentMatrix: string[][] = prevMatrix.map(row => [...row]);
  let removedRolls = 0;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if(prevMatrix[i][j] !== '@') continue;

      const count = checkNeighbors(prevMatrix, i, j);

      if (count < 4) {
        currentMatrix[i][j] = '.';
        removedRolls ++;
      }
    }
  }
  // currentMatrix.forEach(row => console.log(row.join('')));
  // console.log('\n');

  return { currentMatrix, removedRolls };
}

/** provide your solution as the return of this function */
export async function day4b(data: string[]) {
  // console.log(data);
  let totalRolls = 0;

  // create the matrix
  let matrix = data.map(row => row.split(''));
  // matrix.forEach(row => console.log(row.join('')));
  // console.log('\n');

  while(true) {
    const { currentMatrix, removedRolls } = rewriteMatrix(matrix);
    totalRolls += removedRolls;

    if (removedRolls === 0) {
      break;
    }

   matrix = currentMatrix;
  }

  return totalRolls;
}

await runSolution(day4b);