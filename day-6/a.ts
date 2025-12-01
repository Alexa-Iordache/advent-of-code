import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6a(map: string[]) {
  console.log(map);
  let guard:[number, number, string] = [0, 0, 'N'];
  const positions = new Set();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if(map[y][x] === '^') {
       guard = [y, x, 'N'];
       positions.add(`${y}, ${x}`);
      }
    }
  }

  while(true) {
    if(guard[2] === 'N') {
      if (map[guard[0]-1]?.[guard[1]] === '#') {
        guard[2] = 'E';
      } else {
        guard[0]--;
        positions.add(`${guard[0]}, ${guard[1]}`);
      }
    }

    if(guard[2] === 'S') {
      if (map[guard[0]+1]?.[guard[1]] === '#') {
        guard[2] = 'W';
      } else {
        guard[0]++;
        positions.add(`${guard[0]}, ${guard[1]}`);
      }
    }

    if(guard[2] === 'E') {
      if (map[guard[0]]?.[guard[1]+1] === '#') {
        guard[2] = 'S';
      } else {
        guard[1]++;
        positions.add(`${guard[0]}, ${guard[1]}`);
      }
    }

    if(guard[2] === 'W') {
      if (map[guard[0]]?.[guard[1]-1] === '#') {
        guard[2] = 'N';
      } else {
        guard[1]--;
        positions.add(`${guard[0]}, ${guard[1]}`);
      }
    }

    if(guard[0] < 0 || guard[0] >= map.length || guard[1] < 0 || guard[1] >= map[0].length) {
      break;
    }
  }
  return positions.size - 1;
}

await runSolution(day6a);