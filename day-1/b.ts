import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  console.log(data);

  const leftArray =[];

  const occurance = new Proxy({}, {
    get: (target, name) => name in target ? target[name] : 0
  })


  data.forEach((item) => {
    const [first, second] = item.split('   ').map(Number);
    leftArray.push(first);

    occurance[second] ++;
  })

  return leftArray.reduce((result, currentValue, currentIndex) => {

    result += occurance[currentValue] * currentValue;

    return result;
  }, 0);
}

await runSolution(day1b);