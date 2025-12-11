import { runSolution } from '../utils.ts';

// Count paths from "you" to "out"
function DFSsearch(graph, node): number {
  if (node === "out") return 1;
  if (!graph[node]) return 0;

  let total = 0;

  for (const next of graph[node]) {
    total += DFSsearch(graph, next);
  }
  return total;
}

/** provide your solution as the return of this function */
export async function day11a(data: string[]) {
  // console.log(data);
  const graph = [];

  for (const line of data) {
    const [device, outputs] = line.split(':');
    const deviceValue = device;
    const outputValues = outputs.trim().split(/\s+/);

    graph[deviceValue] = outputValues;
  }

  return DFSsearch(graph, "you");
}

await runSolution(day11a);