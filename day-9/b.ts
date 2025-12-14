import { runSolution } from '../utils.ts';

type Edge = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  vertical: boolean;
};

export function day9b(data: string[]): number {

  const points: [number, number][] = [];
  const edges: Edge[] = [];
  let result = 0;

  // parse input
  data.forEach((row) => {
    const [x, y] = row.split(',').map(Number);
    points.push([x, y]);
  });

  // build polygon edges
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    edges.push({
      x1, y1, x2, y2,
      vertical: x1 === x2
    });
  }
  // console.log(edges);

  // create a rectangle with wach two pairs of points
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];

      // if it's a row/ column, it makes no sense to calculate the area
      if (x1 === x2 || y1 === y2) continue;

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

//       (minX, minY) ───────── (maxX, minY)
//            │                     │
//            │                     │
//       (minX, maxY) ───────── (maxX, maxY)

      // assume the rectagle is valid
      let isRectangleValid = true;

      for (const edge of edges) {
        if (edge.vertical) {
          const edgeX = edge.x1;
          const edgeMinY = Math.min(edge.y1, edge.y2);
          const edgeMaxY = Math.max(edge.y1, edge.y2);

          // check if the edge is inside the rectangle
          if (minX < edgeX && maxX > edgeX && minY < edgeMaxY && maxY > edgeMinY) {
            isRectangleValid = false;
            break;
          }
        } else {
          const edgeY = edge.y1;
          const edgeMinX = Math.min(edge.x1, edge.x2);
          const edgeMaxX = Math.max(edge.x1, edge.x2);

          if (minY < edgeY && maxY > edgeY && minX < edgeMaxX && maxX > edgeMinX) {
            isRectangleValid = false;
            break;
          }
        }
      }

      if (!isRectangleValid) continue;

      const currentArea = (maxX - minX + 1) * (maxY - minY + 1);
      if (currentArea > result) {
        result = currentArea;
      }
    }
  }

  return result;
}

await runSolution(day9b);