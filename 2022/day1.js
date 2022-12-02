const fs = require("fs");
const input = fs.readFileSync("inputs/day1.txt", "utf8");

// Part One
const groups = input.split(/\n\s*\n/);
const items = groups.map((x) =>
  x
    .split(/\r?\n|\r|\n/g)
    .map((y) => Number(y))
    .reduce((sum, a) => sum + a, 0)
);
const answer = Math.max(...items);
console.log("Part One:",answer);


// Part Two
const items2 = groups.map((x) =>
  x
    .split(/\r?\n|\r|\n/g)
    .map((y) => Number(y))
    .reduce((sum, a) => sum + a, 0)
);
items2.sort((a, b) => b - a);
const answer2 = items2.slice(0, 3).reduce((sum, a) => sum + a, 0);
console.log("Part Two:", answer2);
