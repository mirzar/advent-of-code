const fs = require('fs');

const input = fs
  .readFileSync('input-2.txt', 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map(line => {
    let [movement, amount] = line.split(' ');
    amount = parseInt(amount, 10);
    return {
      movement,
      amount,
    };
  });

const part1 = () => {
  let horizontal = 0;
  let depth = 0;
  for (let {movement, amount} of input) {
    switch (movement) {
      case 'up':
        depth -= amount;
      case 'down':
        depth += amount;
      case 'forward':
        horizontal += amount;
      default:
      // throw new Error(`Unknown movement: ${movement}`);
    }
  }
  console.log(`Part 1 Solution is`, depth * horizontal);
};

const part2 = () => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  for (let {movement, amount} of input) {
    if (movement === 'up') {
      aim -= amount;
    } else if (movement === 'down') {
      aim += amount;
    } else if (movement === 'forward') {
      horizontal += amount;
      depth += aim * amount;
    }
  }
  console.log(`Part 2 Solution is`, depth * horizontal);
};

part1();
part2();
