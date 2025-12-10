import { runSolution } from '../utils.ts';

function extractData (line): { indicator, buttons } {
  const patternMatch = line.match(/\[([.#]+)\]/);
  const indicator = patternMatch ? patternMatch[1] : "";

  const buttonMatches = [...line.matchAll(/\(([0-9,]+)\)/g)];
  const buttons = buttonMatches.map(m =>
    m[1].split(",").map(n => parseInt(n, 10))
  );

  // console.log(indicator, buttons);
  return { indicator, buttons};
}


function calculateMinPresses(indicators: string, buttons: number[][]): number {

  let target = 0;
  for (let i = 0; i < indicators.length; i++) {
    if (indicators[i] === '#') {
      target |= (1 << i);
    }
  }
  console.log(indicators, target)

  const btnMasks: number[] = buttons.map(button => {
    let mask = 0;
    for (const idx of button) {
      if (idx >= 0 && idx < indicators.length) {
        mask |= (1 << idx);
      }
    }
    // console.log('MASK: ', mask)
    return mask;
  });
  console.log(btnMasks)

  const maxState = 1 << indicators.length;
  // console.log('max state: ', maxState)

  const dist = new Array(maxState).fill(-1); // how many steps we did to achieve the state we have
  const q: number[] = [];
  let head = 0;

  // bfs starts with all lights OFF (the mask is 0)
  dist[0] = 0;
  q.push(0);

  while (head < q.length) {
    const src = q[head++];
    if (src === target) {
      return dist[src];
    }
    for (let j = 0; j < buttons.length; j++) {
      const new_state = src ^ btnMasks[j]; // ^ - XOR

      // if we didn't visit the new_state yet, we mark it as visited
      if (dist[new_state] === -1) {
        dist[new_state] = dist[src] + 1;
        q.push(new_state);
      }
    }
  }

  return Infinity;
}

/** provide your solution as the return of this function */
export async function day10a(data: string[]) {
  // console.log(data);
  let result = 0;

  data.forEach((line) => {
    const lines = extractData(line);

    // console.log(indicatorCopy, buttons);

    // console.log(calculateMinPresses(lines.indicator, lines.buttons));
    result += calculateMinPresses(lines.indicator, lines.buttons)
  });

  return result;
}

await runSolution(day10a);