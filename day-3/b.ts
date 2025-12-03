import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
  let finalResult = 0;

  data.forEach((item) => {
    const numberArray = item.split('').map(Number);
    // console.log(numberArray);

    // perechi [cifra, index]
    const pairs: [number, number][] = [];
    for ( let i = 0; i < numberArray.length; i++) {
      pairs.push([numberArray[i], i]);
    }
    // console.log(pairs);

    const stack: [number, number][] = [];
    let toRemove = pairs.length - 12; // cate perechi trebuie eliminate

    for (const pair of pairs) {
      while (
        stack.length > 0 &&
        toRemove > 0 &&
        stack[stack.length - 1][0] < pair[0]
        ) {
        stack.pop();
        toRemove--;
      }
      stack.push(pair);
    }

    const resultPairs = stack.slice(0, 12);

      //cream noul numar
      let newNumber = 0;
      for (let i = 0; i < resultPairs.length; i++) {
        const currentPair = resultPairs[i];
        newNumber = newNumber * 10 + currentPair[0];
      }
      console.log(newNumber);
      finalResult += newNumber;
  });

  return finalResult;
}

await runSolution(day3b);