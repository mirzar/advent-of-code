const fs = require("fs");

const sum = (...args) => {
  return args.reduce((a, b) => a + b);
};

const splitByValue = (arr, val) => {
  const result = [[]];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      result.push([]);
    } else {
      result[result.length - 1].push(arr[i]);
    }
  }

  return result;
};

const parseLines = (fileName) => {
  const fileContents = fs.readFileSync(fileName);
  return fileContents
    .toString()
    .split("\n")
    .map((x) => x.trim());
};


const lines = parseLines("inputs/day2.txt").map((x) =>
  x.replace(" ", "")
);

// Lazy Man Solution
let outcomes = {
  AZ: 3,
  AX: 4,
  AY: 8,
  BZ: 9,
  BX: 1,
  BY: 5,
  CZ: 6,
  CX: 7,
  CY: 2
};

// Part 1

let res = sum(...lines.map((x) => outcomes[x]));
console.log(res);

// Part 2

outcomes = { ...outcomes, AZ: 8, AX: 3, AY: 4, CZ: 7, CX: 2, CY: 6 };

res = sum(...lines.map((x) => outcomes[x]));
console.log(res);


