import { runSolution } from '../utils.ts';


// !!! TIMELINE = one possible version of the particle's journey

// daca aveam {2: 2} si se splituiese in col 1 si col 3, ambele coloane mostenesc cate 2 timeline-uri: {1:2} {3:2}


/** provide your solution as the return of this function */
export async function day7b(data: string[]) {
  // console.log(data);

  // gasim pozitia de plecare
  let startCol = 0;
  for (let i = 0; i < data.length; i++) {
    startCol = data[i].indexOf('S');
    break;
  }
  // console.log(startRow, startCol);


  // facem mapari: numar coloana - numarul de timeline uri pentru acea coloana
  let counts = new Map<number, number>();

  // avem un timeline pentru pozitia initiala
  counts.set(startCol, 1);

  // pentru fiecare rand in parte
  for (let i = 1; i < data.length; i++) {
    const currentRow = data[i];
    const next = new Map<number, number>();

    // verificam coloanele care au deja timeline
    for (const [col, timelineCount] of counts.entries()) {
      if (currentRow[col] === "^") {
        // left
        if (col - 1 >= 0) {
          // daca coloana nu exista, atunci punem 0
          next.set(col - 1, (next.get(col - 1) || 0) + timelineCount);
        }

        // right
        if (col + 1 < data[0].length) {
          next.set(col + 1, (next.get(col + 1) || 0) + timelineCount);
        }

      } else {
        // straight down
        next.set(col, (next.get(col) || 0) + timelineCount);
      }
    }

    // ne mutam la randul urmator
    counts = next;
  }

// sum all timelines
  let total = 0;
  for (const count of counts.values()) {
    total += count;
  }

  return total;
}

await runSolution(day7b);