const fs = require('fs');

const parseLines = fileName => {
  const fileContents = fs.readFileSync(fileName);
  return fileContents
    .toString()
    .split('\n')
    .map(x => x.trim());
};

const input = parseLines('inputs/day4.txt');

let result1 = 0;
let result2 = 0;

function isFullyContained(a, b) {
  const [underA, overA] = [parseInt(a.split('-')[0]), parseInt(a.split('-')[1])];
  const [underB, overB] = [parseInt(b.split('-')[0]), parseInt(b.split('-')[1])];

  return (underA <= underB && overA >= overB) || (underA >= underB && overA <= overB);
}

function overlap(a, b) {
  const [underA, overA] = [parseInt(a.split('-')[0]), parseInt(a.split('-')[1])];
  const [underB, overB] = [parseInt(b.split('-')[0]), parseInt(b.split('-')[1])];

  return !(overA < underB || underA > overB);
}

input.forEach(line => {
  if (isFullyContained(...line.split(','))) {
    result1++;
  }
  if (overlap(...line.split(','))) {
    result2++;
  }
});

console.log('Part One:', result1);
console.log('Part Two:', result2);
