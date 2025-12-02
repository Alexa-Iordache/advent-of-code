import { runSolution } from '../utils.ts';

function checkInvalidNumber(nb: number): boolean {
  const copyNb = nb.toString();

  if (copyNb.length % 2 === 0) {
    const half: number = copyNb.length / 2;
    if (copyNb.slice(0, half) === copyNb.slice(half)) return true;
  }

  return false;
}

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  let result = 0;

  data.forEach(range => {
    const localRange = range.split(',');
    let [startPoint, endPoint]: [number, number] = [0,0];

    localRange.forEach(item => {
      [startPoint, endPoint] = item.split('-').map(Number);
      if(startPoint && endPoint) {
        // console.log([startPoint, endPoint])
        for(let i = startPoint; i <= endPoint; i++) {
          if(checkInvalidNumber(i)) {
            console.log(i);
            result += i;
          }
        }
      }
    })
  })

  return result;
}

await runSolution(day2a);