import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  console.log(data);
  let initialPosition = 50;
  let totalCount = 0;

  for (const line of data) {
    const direction = line[0];
    const dist = Number(line.slice(1));

    if (direction === 'R') {
      initialPosition = (initialPosition + dist) % 100;
      console.log(initialPosition)
    } else {
      initialPosition = (initialPosition - dist) % 100;
      if (initialPosition < 0) initialPosition += 100;
      console.log(initialPosition)
    }

    if (initialPosition === 0) totalCount++;
  }

  return totalCount;
}

await runSolution(day1a);