import { runSolution } from '../utils.ts';

function mergeIntervals(intervals) {
  const result = [];
  let [currentStart, currentEnd] = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if(start <= currentEnd) {
      currentEnd = Math.max(currentEnd, end);
    } else {
      result.push([currentStart, currentEnd]);
      currentStart = start;
      currentEnd = end;
    }
  }

  // adaugam si ultimul interval
  result.push([currentStart, currentEnd]);
  return result;
}


/** provide your solution as the return of this function */
export async function day5b(data: string[]) {
  // console.log(data);

  const freshItems = [];
  let result = 0;

  data.forEach(interval => {
    if(!interval) return;

    const item = interval.split('-').map(Number);

    // luam in considerare doar intervalele
    if(item.length === 2) {
      let [first, second] = item;

      if (first > second) {
        [first, second] = [second, first];
      }
      freshItems.push([first, second]);

    }
  })
  // console.log(freshItems);

  freshItems.sort((first, second) => first[0] - second[0]);
  const mergedItems = mergeIntervals(freshItems);
  // console.log(mergedItems);

  for (const [start, end] of mergedItems) {
     // console.log([start, end]);
     // for (let i = start; i <= end; i++) {
     //   result ++;
     // }

    result += (end-start+1);
  }

  return result;
}

await runSolution(day5b);