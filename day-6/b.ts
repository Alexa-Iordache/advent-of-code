import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6b(data: string[]) {
  const numRows = data.length;
  const numCols = data[0].length;

  let total = 0;
  let col = 0;

  while (col < numCols) {
    // Skip empty columns
    if (data.every(row => row[col] === ' ')) {
      col++;
      continue;
    }

    // Collect all columns for this problem (until next empty column)
    const problemCols: number[][] = [];
    let operator = '';

    let currentCol = col;
    while (currentCol < numCols && data.some(row => row[currentCol] !== ' ')) {
      const digits: string[] = [];
      for (let row = 0; row < numRows; row++) {
        const char = data[row][currentCol];
        if (char === '*' || char === '+') {
          operator = char; // last char in the problem
        } else if (char !== ' ') {
          digits.push(char);
        }
      }
      problemCols.push(digits.map(Number));
      currentCol++;
    }

    // Build numbers from columns
    const numbers = problemCols.map(colDigits => parseInt(colDigits.join(''), 10));

    // Compute result for this problem
    let subTotal = operator === '*' ? 1 : 0;
    if (operator === '+') {
      subTotal = numbers.reduce((a, b) => a + b, 0);
    } else if (operator === '*') {
      subTotal = numbers.reduce((a, b) => a * b, 1);
    }

    total += subTotal;
    col = currentCol; // move to next problem
  }

  return total;
}

await runSolution(day6b);