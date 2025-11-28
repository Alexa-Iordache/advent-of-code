import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  console.log(data);
  let result = 0;

  data.forEach((item) => {
    const localArray = item.split(' ').map(Number);

    if(localArray[0] < localArray[1]) {
      for(let i = 0; i < localArray.length; i++) {
        const dif = localArray[i+1] - localArray[i];
        if(dif < 1 || dif > 3) {
          return;
        }
      }
      result ++;
    } else {
      for(let i = 0; i < localArray.length; i++) {
        const dif = localArray[i] - localArray[i+1];
        if(dif < 1 || dif > 3) {
          return;
        }
      }
      result ++;
    }
  })

  return result;
}

await runSolution(day2a);