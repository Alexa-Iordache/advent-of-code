import { runSolution } from '../utils.ts';

function checkInvalidNumber(nb: number): boolean {
  const copyNb: string = nb.toString();
  const half: number = copyNb.length / 2;

  return copyNb.slice(0, half) === copyNb.slice(half);
}

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {

  return data.reduce((result, line) => {

    line.split(',').forEach(range => {
      const [start, end] = range.split('-').map(Number);

      if (!start || !end) return;

      for (let i = start; i <= end; i++) {
        if (checkInvalidNumber(i)) {
          result += i;
        }
      }
    });

    return result;
  }, 0);
}

await runSolution(day2a);