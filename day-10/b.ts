import { runSolution } from '../utils.ts';

type Machine = {
  buttons: number[][]
  voltageCounter: number[]
}

function parseMachineLine(line: string): Machine {

  // extract voltage counter (what is inside { })
  const counterMatch = line.match(/\{([^}]+)}/);

  const voltageCounter = counterMatch[1].split(",").map(Number);

  // extract all buttons (what is inside ( ))
  const buttonMatch = line.match(/\(([^)]+)\)/g) || [];

  const buttons = buttonMatch.map(btn =>
    btn
      .slice(1, -1) // remove ( )
      .split(",")
      .map(Number)
  );

  return { buttons, voltageCounter };
}


function minButtonPressesForMachine(buttons, voltageCounter) {
  const copyVoltageCounter = [...voltageCounter];

  // sort buttons from max length to min length
  buttons.sort((a, b) => b.length - a.length);

  let presses = 0;
  let changed = true;

  // loop continues until no button can be pressed anymore
  while (changed) {
    changed = false;

    // try each button
    for (const button of buttons) {
      let minValue = Number.MAX_SAFE_INTEGER;
      // console.log(button);

      for (const idx of button) {
        // console.log(idx);
        minValue = Math.min(minValue, copyVoltageCounter[idx]);
      }
      // console.log('\n');

      if (minValue > 0 && minValue < Number.MAX_SAFE_INTEGER) {
        presses += minValue;
        changed = true;

        for (const idx of button) {
          copyVoltageCounter[idx] -= minValue;
        }
      }
    }
  }

  for (let i = 0; i < copyVoltageCounter.length; i++) {
    presses += copyVoltageCounter[i];
  }

  return presses;
}


/** provide your solution as the return of this function */
export async function day10b(data: string[]) {
  let result = 0;

  data.forEach(line => {
    const { buttons, voltageCounter } = parseMachineLine(line);
    result += minButtonPressesForMachine(buttons, voltageCounter);
  });

  return result;
}

await runSolution(day10b);