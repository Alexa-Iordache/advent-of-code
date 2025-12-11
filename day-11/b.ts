import { runSolution } from '../utils.ts';

function countPaths(node, graph, hasFFT: boolean, hasDAC: boolean, cache): number {
  let total = 0;

  if (node === 'out') {
    return hasFFT && hasDAC ? 1 : 0;
  }

  if (node === 'fft') hasFFT = true;
  if (node === 'dac') hasDAC = true;

  const fftKey = hasFFT ? 'true' : 'false';
  const dacKey = hasDAC ? 'true' : 'false';

  if (!cache[node]) {
    cache[node] = {};
  }
  if (!cache[node][fftKey]) {
    cache[node][fftKey] = {};
  }

  if (cache[node][fftKey][dacKey] !== undefined) {
    return cache[node][fftKey][dacKey];
  }

  for (const next of graph[node]) {
    total += countPaths(next, graph, hasFFT, hasDAC, cache);
  }

  // store in cache
  cache[node][fftKey][dacKey] = total;
  return total;
}


/** provide your solution as the return of this function */
export async function day11b(data: string[]) {
  const graph: Record<string, string[]> = {};
  for (const line of data) {
    if (!line || !line.includes(':')) continue;
    const [device, outputs] = line.split(':');
    const name = device.trim();
    const outs = (outputs ?? '').trim();
    graph[name] = outs ? outs.split(/\s+/).filter(Boolean) : [];
  }

  // cache the result for every possible combination of node + flags,
  const cache = {};
  return countPaths('svr', graph, false, false, cache);
}

await runSolution(day11b);