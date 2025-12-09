import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
  // console.log(data);
  const tempArray = [];
  let result = 0;

  data.forEach((row) => {
    const [a, b] = row.split(',').map(Number);
    tempArray.push([a, b]);
  })

  for (let i = 0; i < tempArray.length - 1; i++) {
    const [a1, b1] = tempArray[i];
    for (let j = i + 1; j < tempArray.length; j++) {
     const [a2, b2] = tempArray[j];

      const widthValue = Math.abs(a2 - a1) + 1;
      const heightValue = Math.abs(b2 - b1) + 1;
      const currentArea = widthValue * heightValue;

      if (currentArea > result) result = currentArea;
    }
  }

  return result;
}

await runSolution(day9a);