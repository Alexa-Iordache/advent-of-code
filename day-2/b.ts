import { runSolution } from '../utils.ts';

export function checkSafetiness(data: number[]): boolean {

  if (data.length < 2) return true;
  if (data[0] === data[1]) return false;

  if(data[0] < data[1]) {
      for(let i = 0; i < data.length; i++) {
        const dif = data[i+1] - data[i];
        if(dif < 1 || dif > 3) {
          return false;
        }
      }
      return true;
    } else {
      for (let i = 0; i < data.length; i++) {
        const dif = data[i] - data[i + 1];
        if (dif < 1 || dif > 3) {
          return false;
        }
      }
      return true;
    }
}

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  console.log(data);
  let result = 0;

  data.forEach((item) => {
    const localArray = item.split(' ').map(Number);

    for (let i = 0; i < localArray.length; i++) {
      const copyArray = [...localArray];
      copyArray.splice(i, 1);

      if(checkSafetiness(copyArray)) {
        console.log(checkSafetiness(copyArray));
        result ++;
        return;
      }
    }
  })

  return result;
}

await runSolution(day2b);