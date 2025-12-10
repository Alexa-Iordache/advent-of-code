import { runSolution } from '../utils.ts';


function extractData (line): { buttons, voltage } {
  const buttonMatches = [...line.matchAll(/\(([0-9,]+)\)/g)];
  const buttons = buttonMatches.map(m =>
    m[1].split(",").map(num => parseInt(num, 10))
  );

  const voltageMatch = line.match(/\{([0-9,]+)\}/);
  const voltage = voltageMatch
    ? voltageMatch[1].split(",").map(num => parseInt(num, 10))
    : [];

  return { buttons, voltage}
}

function calculateMinPresses(buttons: number[][], voltage: number[]): number {
  const start = Array(voltage.length).fill(0);

  // state - current value, presses - how many times we clicked on the button
  const queue: { state: number[], presses: number }[] = [{ state: start, presses: 0 }];
  const visited = new Set<string>();
  visited.add(start.join(','));

  while (queue.length > 0) {
    const { state, presses } = queue.shift()!;

    // check if the target was reached
    if (state.every((v, i) => v === voltage[i])) {
      console.log(presses)
      return presses;
    }

    for (const button of buttons) {
      const newState = state.slice(); // make a copy of the current state
      for (const idx of button) {
        // we increment the state of the voltage based on the button pressing, but without exceeding the desired voltage
        newState[idx] = Math.min(voltage[idx], newState[idx] + 1);
      }

      const key = newState.join(',');
      if (!visited.has(key)) {
        visited.add(key);
        queue.push({ state: newState, presses: presses + 1 });
      }
    }
  }

  return Infinity;
}

/** provide your solution as the return of this function */
export async function day10b(data: string[]) {
  // console.log(data);
  let result = 0;

  data.forEach((line) => {
    const lines = extractData(line);

    console.log(lines.buttons, lines.voltage);

    // console.log(calculateMinPressesJoltage(lines.buttons, lines.voltage));
    result += calculateMinPresses(lines.buttons, lines.voltage)
  });

  return result;
}

await runSolution(day10b);