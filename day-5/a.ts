import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
  // console.log(data);

  const arrayOfNb = []; // array with items to test
  const freshItems = []; // array with fresh items
  let result = 0;

  data.forEach(interval => {
    if(!interval) return;

    const item = interval.split('-').map(Number);

    if(item.length === 1) {
      arrayOfNb.push(item[0]);
    } else if(item.length === 2) {
      let [first, second] = item;

      if (first > second) {
        [first, second] = [second, first];
      }
      freshItems.push([first, second]);
    }
  })

  for (const n of arrayOfNb) {
    for (const [a, b] of freshItems) {
      if (n >= a && n <= b) {
        result++;
        break;
      }
    }
  }

  return result;
}

await runSolution(day5a);