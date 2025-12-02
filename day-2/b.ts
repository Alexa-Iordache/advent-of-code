import { runSolution } from '../utils.ts';

function checkInvalidNumber(nb: number): boolean {
  const copyNb: string = nb.toString();
  const length: number = copyNb.length;

  for (let i = 1; i <= length / 2; i++) {

    if (length % i !== 0) continue;

    const testingPart: string = copyNb.slice(0, i);
    let recreatedNb: string = "";

    for (let j = 0; j < length / i; j++) {
      recreatedNb += testingPart;
    }

    if (recreatedNb === copyNb) return true;
  }

  return false;
}

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
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

await runSolution(day2b);