import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6a(map: string[]) {
  // console.log(map);
  let guard:[number, number, number, number] = [0, 0, 0, 0];
  const positions = new Set();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if(map[y][x] === '^') {
       guard = [y, x, -1, 0];
       positions.add(`${y}, ${x}`);
      }
    }
  }

  while(true) {
    // const [initialY, initialX]: [number, number] = [guard[2], guard[3]];
    // if (map[guard[0]-1]?.[guard[1]] === '#') {
    //   guard[2] = initialX;
    //   guard[3] = - initialY;
    // } else {
    //   guard[0]--;
    //   positions.add(`${guard[0]}, ${guard[1]}`);
    // }
    if(guard[2] === -1 && guard[3] === 0) {
      if (map[guard[0]-1]?.[guard[1]] === '#') {
        guard[2] = 0;
        guard[3] = 1
      } else {
        guard[0]--;
        positions.add(`${guard[0]}, ${guard[1]}`);
      }
    }

    if(guard[2] === 1 && guard[3] === 0) {
      if (map[guard[0]+1]?.[guard[1]] === '#') {
        guard[2] = 0;
        guard[3] = -1;
      } else {
        guard[0]++;
        positions.add(`${guard[0]}, ${guard[1]}`);
      }
    }

    if(guard[2] === 0 && guard[3] === 1) {
      if (map[guard[0]]?.[guard[1]+1] === '#') {
        guard[2] = 1;
        guard[3] = 0;
      } else {
        guard[1]++;
        positions.add(`${guard[0]}, ${guard[1]}`);
      }
    }

    if(guard[2] === 0 && guard[3] === -1) {
      if (map[guard[0]]?.[guard[1]-1] === '#') {
        guard[2] = -1;
        guard[3] = 0;
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