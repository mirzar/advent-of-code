const fs = require('fs');

const parseLines = fileName => {
  const fileContents = fs.readFileSync(fileName);
  return fileContents
    .toString()
    .split('\n')
    .map(x => x.trim());
};

const input = parseLines('inputs/day3.txt').map(x => x.replace(' ', ''));

const capitalLetters = 38;
const lowerLetters = 96;

const calculateLetter = letter => {
  if (letter == letter.toUpperCase()) {
    return parseInt(letter.charCodeAt(0) - capitalLetters);
  } else if (letter == letter.toLowerCase()) {
    return parseInt(letter.charCodeAt(0) - lowerLetters);
  }
};

const checkSameLetter = (first, second, third = '') => {
  let letter = '';
  for (const char of first) {
    if (second.search(char) !== -1) {
      if (third === '' || third.search(char) !== -1) {
        letter = char;
        break;
      }
    }
  }
  return letter;
};

const part1 = () => {
  let sum = 0;
  let sameLetter = '';
  let first = '';
  let second = '';

  input.forEach(line => {
    [first, second] = [line.slice(0, line.length / 2), line.slice(line.length / 2)];
    sameLetter = checkSameLetter(first, second);

    sum += calculateLetter(sameLetter);
  });
  return sum;
};

const part2 = () => {
  let sum = 0;
  let sameLetter = '';
  let first = '';
  let second = '';
  let third = '';

  for (let i = 0; i < input.length; i += 3) {
    [first, second, third] = [input[i], input[i + 1], input[i + 2]];
    sameLetter = checkSameLetter(first, second, third);

    sum += calculateLetter(sameLetter);
  }
  return sum;
};

console.log('Part One:', part1());
console.log('Part Two:', part2());
