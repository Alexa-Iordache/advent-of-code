import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  console.log(data);

  const leftArray =[];
  const rightArray =[];

  data.forEach((item) => {
    const [first, second] = item.split('   ').map(Number);
    leftArray.push(first);
    rightArray.push(second);
  })

  leftArray.sort();
  rightArray.sort();

  return leftArray.reduce((result, currentValue, currentIndex) => {
    result += Math.abs(leftArray[currentIndex] - rightArray[currentIndex]);

    return result;
  }, 0);
}

await runSolution(day1a);
