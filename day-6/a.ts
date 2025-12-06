import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
  // console.log(data);

  // extragem numerele si elinimam spatiile
  const rows = data.map(row =>
    row
      .trim()
      .split(/\s+/)
      .map(v => (isNaN(Number(v)) ? v : Number(v)))
  );

  // inversam matricea
  const cols= [];

  for (let col = 0; col < rows[0].length; col++) {
    cols[col] = [];
    for (let row = 0; row < rows.length; row++) {
      cols[col][row] = rows[row][col];
    }
  }

  // console.log(cols)
  let finalResult = 0;

  for (let i = 0; i < cols.length; i++) {
    // console.log('ROW: ', cols[i]);
    // console.log('SEMN: ', cols[i][rowLength - 1]);
    const column = cols[i];
    const signIndex = column.length - 1;
    const sign = column[signIndex];

    if(sign === '+') {
      let partialResult = 0;
      for (let j = 0; j < signIndex; j++) {
        partialResult += Number(column[j]);
      }
      // console.log(partialResult)
      finalResult += partialResult;

    } else if(sign === '*') {
      let partialResult = 1;
      for (let j = 0; j < signIndex; j++) {
        partialResult *= Number(column[j]);
      }
      // console.log(partialResult)
      finalResult += partialResult;
    }
  }

 return finalResult;
}

await runSolution(day6a);