// import { runSolution } from '../utils.ts';
//
// type Machine = {
//   buttons: number[][]
//   voltageCounter: number[]
// }
//
// function parseMachineLine(line: string): Machine {
//
//   // extract voltage counter (what is inside { })
//   const counterMatch = line.match(/\{([^}]+)}/);
//
//   const voltageCounter = counterMatch[1].split(",").map(Number);
//
//   // extract all buttons (what is inside ( ))
//   const buttonMatch = line.match(/\(([^)]+)\)/g) || [];
//
//   const buttons = buttonMatch.map(btn =>
//     btn
//       .slice(1, -1) // remove ( )
//       .split(",")
//       .map(Number)
//   );
//
//   return { buttons, voltageCounter };
// }
//
// type MachineState = {
//   state: number[];
//   presses: number;
// };
//
// function minButtonPressesOptimized(buttons: number[][], counters: number[]): number {
//   const n = counters.length;
//   const target = counters;
//
//   // Priority queue implemented with a simple array (can replace with heap for large inputs)
//   const queue: MachineState[] = [{ state: Array(n).fill(0), presses: 0 }];
//   const seen = new Set<string>();
//   seen.add(Array(n).fill(0).toString());
//
//   while (queue.length > 0) {
//     // Always pick state with smallest presses
//     queue.sort((a, b) => a.presses - b.presses);
//     const { state, presses } = queue.shift()!;
//
//     // Check if target reached
//     if (state.every((v, i) => v === target[i])) return presses;
//
//     for (const btn of buttons) {
//       const newState = [...state];
//
//       let valid = true;
//       for (const idx of btn) {
//         newState[idx]++;
//         // Prune states exceeding target
//         if (newState[idx] > target[idx]) {
//           valid = false;
//           break;
//         }
//       }
//
//       if (!valid) continue;
//
//       const key = newState.toString();
//       if (!seen.has(key)) {
//         seen.add(key);
//         queue.push({ state: newState, presses: presses + 1 });
//       }
//     }
//   }
//
//   return -1; // no solution
// }
//
// // Adapted main function
// export async function day10b(data: string[]) {
//   let result = 0;
//
//   for (const line of data) {
//     const { buttons, voltageCounter } = parseMachineLine(line);
//     const presses = minButtonPressesOptimized(buttons, voltageCounter);
//     result += presses;
//   }
//
//   return result;
// }
//
//
// await runSolution(day10b);