const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trimEnd();

const solve = (input, part) => {
  const [times, dists] =
    part === 1
      ? input.split('\n').map(line => line.match(/\d+/g).map(Number))
      : input.split('\n').map(line => [+line.match(/\d+/g).join('')]);

  let product = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const dist = dists[i];

    const minTime = Math.floor((time - Math.sqrt(time ** 2 - 4 * dist)) / 2);
    const nWays = time - 2 * minTime - 1;
    product *= nWays;
  }
  console.log(part, product);
};
solve(input, 1);
solve(input, 2);
