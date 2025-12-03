import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {

  // data.forEach((item) => {
  //
  //   const numberArray = item.split('').map(Number);
  //   // console.log(numberArray);
  //
  //   // perechi [cifra, index]
  //   const pairs: [number, number][] = [];
  //
  //   for (let i = 0; i < numberArray.length; i++) {
  //     pairs.push([numberArray[i], i]);
  //   }
  //   // console.log(pairs);
  //
  //   pairs.sort((a:[number, number], b: [number, number]): number => {
  //     if (b[0] !== a[0]) return b[0] - a[0];
  //     return a[1] - b[1]; // tinem cont si de index daca valoarea este aceeasi
  //   });
  //   // console.log(pairs);
  //
  //   // doar primele 12 perechi
  //   const smallSetOfPairs: [number, number][] =  pairs.slice(0, 12);
  //   // console.log(smallSetOfPairs);
  //
  //   // ordonam in functie de index acum
  //   smallSetOfPairs.sort((a: [number, number], b: [number, number] ) => a[1] - b[1]);
  //   // console.log(smallSetOfPairs);
  //
  //   //cream noul numar
  //   let newNumber = 0;
  //   for (let i = 0; i < smallSetOfPairs.length; i++) {
  //     const currentPair = smallSetOfPairs[i];
  //     newNumber = newNumber * 10 + currentPair[0];
  //   }
  //   console.log(newNumber);
  // })

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