const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trimEnd();

function gcd(...nums) {
  return nums.reduce((acc, n) => (!n ? acc : gcd(n, acc % n)));
}

function lcm(...nums) {
  return nums.reduce((acc, n) => (acc * n) / gcd(acc, n));
}

const solvePart1 = input => {
  let [instr, lines] = input.split('\n\n');
  instr = instr.split('').map(char => +(char === 'R'));

  const map = {};
  for (const line of lines.split('\n')) {
    let [left, right] = line.split(' = ');
    right = right.match(/\w+/g);
    map[left] = right;
  }

  let curr = 'AAA';
  let i = 0;
  while (curr !== 'ZZZ') {
    curr = map[curr][instr[i++ % instr.length]];
  }
  console.log('Part Two', i);
};
solvePart1(input);

const solvePart2 = input => {
  let [instr, lines] = input.split('\n\n');
  instr = instr.split('').map(char => +(char === 'R'));

  const map = {};
  for (const line of lines.split('\n')) {
    let [left, right] = line.split(' = ');
    right = right.match(/\w+/g);
    map[left] = right;
  }

  let curr = Object.keys(map).filter(key => key.endsWith('A'));
  let i = 0;
  const loopLens = curr.map(() => null);
  while (!loopLens.every(Boolean)) {
    for (let j = 0; j < curr.length; j++) {
      if (loopLens[j]) continue;

      const key = curr[j];
      if (key.endsWith('Z')) {
        loopLens[j] = i;
        continue;
      }

      curr[j] = map[key][instr[i % instr.length]];
    }
    i++;
  }
  console.log('Part Two', lcm(...loopLens));
};
solvePart2(input);
