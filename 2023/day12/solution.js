const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trimEnd();

const countArrangements = (
    springs,
    groups,
    springIdx = 0,
    groupIdx = 0,
    memo = {}
) => {


  const memoize = (result) => {
    memo[springIdx] ??= {};
    memo[springIdx][groupIdx] = result;
    return result;
  }

  if (memo[springIdx]?.[groupIdx] !== undefined) {
    return memo[springIdx][groupIdx];
  }

  if (springIdx >= springs.length) {
    return +(groupIdx === groups.length);
  }
  if (groupIdx === groups.length) {
    return +(springs.indexOf('#', springIdx) === -1);
  }

  if (springs[springIdx] === '.') {
    // move to next non-operational spring
    return memoize(
      countArrangements(springs, groups, springIdx + 1, groupIdx, memo)
    );
  }

  if (springs[springIdx] === '#') {
    if (
      // remaining springs smaller than current group
      springs.length - springIdx < groups[groupIdx] ||
      // impossible to fit current group in current index
      springs.substring(springIdx, springIdx + groups[groupIdx]).match(/\./) ||
      springs[springIdx + groups[groupIdx]] === '#'
    ) {
      return memoize(0);
    }

    // move to next group
    return memoize(
      countArrangements(
        springs,
        groups,
        springIdx + groups[groupIdx] + 1,
        groupIdx + 1,
        memo
      )
    );
  }

  if (springs[springIdx] === '?') {
    // result for '.'
    const result = countArrangements(
      springs,
      groups,
      springIdx + 1,
      groupIdx,
      memo
    );

    if (
      // remaining springs smaller than current group
      springs.length - springIdx < groups[groupIdx] ||
      // impossible to fit current group in current index
      springs.substring(springIdx, springIdx + groups[groupIdx]).match(/\./) ||
      springs[springIdx + groups[groupIdx]] === '#'
    ) {
      return memoize(result);
    }

    // result for '.' or '#'
    return memoize(
      result +
        countArrangements(
          springs,
          groups,
          springIdx + groups[groupIdx] + 1,
          groupIdx + 1,
          memo
        )
    );
  }
}


const solve = (input, nCopies) => {
  let sum = 0;
  for (const line of input.split('\n')) {
    let [springs, groups] = line.split(' ');
    springs = Array(nCopies).fill(springs.replace(/\.\.+/g, '.')).join('?');
    groups = Array(nCopies).fill(groups.split(',')).flat().map(Number);

    const nArrangements = countArrangements(springs, groups);
    sum += nArrangements;
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 5);