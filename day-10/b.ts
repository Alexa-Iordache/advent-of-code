import { runSolution } from '../utils.ts';
import { init } from "z3-solver";

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

// A * x = T
// x[j] - de cate ori a fost apasat butonul j
// A[i][j] = 1 daca butonul j afecteaza contorul i
// T[i] - valoarea pentru contorul i
// T - array-ul de voltages

async function minButtonPressesForMachine(buttons, voltageCounter) {
  const { Context } = await init();
  const context = Context();
  const optimize = new context.Optimize();

  // create int variable for each button
  const x = buttons.map((_, j) =>
    context.Int.const(`x_${j}`)
  );

  for (const button of x) {
    // button.ge(0) - numarul de apasari ale butonului trebuie sa fie >= 0 (x[i] >= 0)
    optimize.add(button.ge(0)); // adaugam fiecare constragere de acest tip la sistem
  }

  // sum x[j] = voltageCounter[i]
  // un rand din A inmultit cu x trebuie sa fie egal cu valoarea corespunzatoare din array-ul de voltages
  for (let i = 0; i < voltageCounter.length; i++) {

    const affectingButtons = []; // terms = {x[j] | butonul j afecteaza counter-ul i}

    for (let j = 0; j < buttons.length; j++) {
      if (buttons[j].includes(i)) {
        affectingButtons.push(x[j]);
      }
    }

    if(affectingButtons.length > 0) {
      optimize.add(context.Sum(...affectingButtons).eq(voltageCounter[i]));
    }
  }

  // totalPresses = x[0] + x[1] + ... x[j]
  const totalPresses = context.Sum(...x);
  optimize.minimize(totalPresses); // minimizeaza solutia

  // verifica daca gaseste solutia optima
  const status = await optimize.check();
  if (status !== "sat") {
    return;
  }

  // se extrage solutia
  const solution = optimize.model();

  // returneaza totalPresses ca numar
  return Number(solution.eval(totalPresses).toString());
}

export async function day10b(data: string[]) {
  let result = 0;

  for (const line of data) {
    const { buttons, voltageCounter } = parseMachineLine(line);
    const presses = await minButtonPressesForMachine(
      buttons,
      voltageCounter
    );
    result += presses;
  }

  return result;
}


await runSolution(day10b);