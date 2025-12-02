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

 return data.reduce((result, line) => {
   line.split(',').forEach(range => {
     const [startPoint, endPoint] = range.split('-').map(Number);

     if(!startPoint || !endPoint) return;

     for (let i = startPoint; i <= endPoint; i++) {
       if(checkInvalidNumber(i)) {
         console.log(i);
         result += i;
       }
     }
   })

   return result;
 }, 0);
}

await runSolution(day2b);