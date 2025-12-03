import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {

  let result: number = 0;
  data.forEach((item) => {

    const numberArray = item.split('').map(Number);

    let maxNumber: number = 0;

    for(let i = 0; i < numberArray.length; i++) {
      const firstDigit = numberArray[i];
      const secondDigit = Math.max(...numberArray.slice(i+1));
      if(maxNumber < firstDigit * 10 + secondDigit) {
        maxNumber = firstDigit * 10 + secondDigit;
      }
    }
    console.log(maxNumber)
    result += maxNumber;
  })

  return result;
}

await runSolution(day3a);