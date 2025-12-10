import { runSolution } from '../utils.ts';

function checkPointInside (redTiles, col, row): boolean {
  const temp = [];
  for (let i = 0; i < redTiles.length; i++) {
    if (redTiles[i][1] === row) {
      temp.push(redTiles[i][0])
    }
  }
  temp.sort((a, b) => a - b);

  if (col < temp[0]) return false;

  return true;
}

/** provide your solution as the return of this function */
export async function day9b(data: string[]) {
  const allowedTiles: number[][] = [];
  let result = 0;

  // Parse input
  data.forEach((row) => {
    const [x, y] = row.split(',').map(Number);
    allowedTiles.push([x, y]);
  });



  // Try all pairs of tiles as opposite corners
  for (let i = 0; i < allowedTiles.length - 1; i++) {
    const [x1, y1] = allowedTiles[i];
    for (let j = i + 1; j < allowedTiles.length; j++) {
      const [x2, y2] = allowedTiles[j];

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      const width = maxX - minX + 1;
      const height = maxY - minY + 1;
      const area = width * height;

      let valid = true;

      // Check all tiles in the rectangle
      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          if (!checkPointInside(allowedTiles, x, y) || x < minX || x > maxX ||  y < minY || y > maxY) {
            valid = false;
            break;
          }
        }
        if (!valid) break;
      }

      // console.log(area);
      if (valid && area > result) {
        result = area;
        console.log(result);
      }
    }
  }

  return result;
}

await runSolution(day9b);