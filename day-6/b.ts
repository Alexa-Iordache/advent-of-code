import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6b(data: string[]) {
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

  console.log(cols)
  let finalResult = 0;

  for (let i = 0; i < cols.length; i++) {
    const column = cols[i];
    const signIndex = column.length - 1;
    const sign = column[signIndex];

    for (let j = 0; j < signIndex; j++) {
      let currentNb = column[j];

      if(0 <= currentNb && currentNb <= 9)  currentNb = currentNb * 1000;
      if(10 <= currentNb && currentNb <= 99) currentNb = currentNb * 100;
      if(100 <= currentNb && currentNb <= 999) currentNb = currentNb * 10;

      column[j] = currentNb;
    }
    // console.log(column)

    // build numbers by extracting digits safely
    let firstNb = 0;
    let secondNb = 0;
    let thirdNb = 0;
    let fourthNb = 0;

    for (let j = 0; j < signIndex; j++) {
      const currentNb = column[j];
      firstNb = firstNb * 10 + Math.floor(currentNb % 10);
      secondNb = secondNb * 10 + Math.floor((currentNb / 10) % 10);
      thirdNb = thirdNb * 10 + Math.floor((currentNb / 100) % 10);
      fourthNb = fourthNb * 10 + Math.floor(currentNb / 1000);
    }
    console.log('FIRST:   ', firstNb);
    console.log('SECOND:   ', secondNb);
    console.log('THIRD:   ', thirdNb);
    console.log('FOURTH:   ', fourthNb);

    if(sign === '+') {
      const partialResult = firstNb + secondNb + thirdNb + fourthNb;
      console.log(partialResult)
      finalResult += partialResult;
    } else  if(sign === '*') {
      if (firstNb === 0) firstNb = 1;
      if (secondNb === 0) secondNb = 1;
      if (thirdNb === 0) thirdNb = 1;
      if (fourthNb === 0) fourthNb = 1;
      const partialResult = firstNb * secondNb * thirdNb * fourthNb;
      console.log(partialResult)
      finalResult += partialResult;
    }
  }

  return finalResult;
}

await runSolution(day6b);