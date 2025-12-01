import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  let position = 50;
  let totalCount = 0;

  for (const line of data) {
    const direction = line[0];
    const dist = Number(line.slice(1));

    for (let i = 0; i < dist; i++) {
      if (direction === "R") {
        position = (position + 1) % 100;
      } else {
        position = (position - 1 + 100) % 100;
      }

      if (position === 0) totalCount++;
    }
  }

  return totalCount;
}

await runSolution(day1b);