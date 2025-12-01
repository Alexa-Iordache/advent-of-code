import { runSolution } from '../utils.ts';

function hasLoop (map: string[][], guard: [number, number, string]): boolean {
  const positions = [];

  for (let y = 0; y < map.length; y++) {
    positions[y] = [];
    for (let x = 0; x < map[y].length; x++) {
      positions[y][x] = '';
    }
  }

  while(true) {
    if(guard[0] < 0 || guard[0] >= map.length || guard[1] < 0 || guard[1] >= map[0].length) {
      return false;
    }

    if (positions[guard[0]][guard[1]] === guard[2]) {
      return true;
    }
    if(positions[guard[0]][guard[1]] === '') {
      positions[guard[0]][guard[1]] = guard[2];
    }

    if(guard[2] === 'N') {
      if (map[guard[0]-1]?.[guard[1]] === '#') {
        guard[2] = 'E';
      } else {
        guard[0]--;
      }
    }

    if(guard[2] === 'S') {
      if (map[guard[0]+1]?.[guard[1]] === '#') {
        guard[2] = 'W';
      } else {
        guard[0]++;
      }
    }

    if(guard[2] === 'E') {
      if (map[guard[0]]?.[guard[1]+1] === '#') {
        guard[2] = 'S';
      } else {
        guard[1]++;
      }
    }

    if(guard[2] === 'W') {
      if (map[guard[0]]?.[guard[1]-1] === '#') {
        guard[2] = 'N';
      } else {
        guard[1]--;
      }
    }
  }
}

/** provide your solution as the return of this function */
export async function day6b(mapRaw: string[]) {
  const map = mapRaw.map((x) => x.split(''));
  let guard:[number, number, string] = [0, 0, 'N'];
  let result = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if(map[y][x] === '^') {
        guard = [y, x, 'N'];
      }
    }
  }

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if(map[y][x] === '#') continue
      const mapCopy = map.map((row) => {
        return [... row];
      })

      const guardCopy: [number, number, string] = guard.map((a) => {return a}) as [number, number, string];

      mapCopy[y][x] = '#';

      // console.log(mapCopy.map(a => a.join('')).join('\n'));

      if(hasLoop(mapCopy, guardCopy)) {
        result ++;
      }
    }
  }

  return result;
}

await runSolution(day6b);