const fs = require('fs');
const input = fs.readFileSync('input-3.txt', 'utf8').split('\n');

const getOccurences = input => {
  const occurences = [];
  const binaryNumbersLength = input[0].length;
  for (let i = 0; i < binaryNumbersLength; i++) {
    occurences.push({0: 0, 1: 0});
  }
  for (let i = 0; i < input.length; i++) {
    const binaryNumber = input[i];
    for (let y = 0; y < binaryNumber.length; y++) {
      const bit = binaryNumber[y];
      occurences[y][bit]++;
    }
  }
  return occurences;
};

const searchBinaryNumber = (input, searchCallback) => {
  const binaryNumbersLength = input[0].length;
  let filteredNumbers = input;
  let bitIndex = 0;
  while (filteredNumbers.length > 1 && bitIndex < binaryNumbersLength) {
    const occurences = getOccurences(filteredNumbers);
    const mostCommonBit = occurences[bitIndex][0] > occurences[bitIndex][1] ? '0' : '1';
    filteredNumbers = filteredNumbers.filter(binaryNumber => {
      const bitToCompare = binaryNumber[bitIndex];
      return searchCallback(mostCommonBit, bitToCompare);
    });
    bitIndex++;
  }
  return filteredNumbers[0];
};

const part1 = () => {
  const occurences = getOccurences(input);
  let gammaRate = '';
  let epsilonRate = '';
  for (let i = 0; i < occurences.length; i++) {
    const bitOccurences = occurences[i];
    if (bitOccurences[0] > bitOccurences[1]) {
      gammaRate += '0';
      epsilonRate += '1';
    } else {
      gammaRate += '1';
      epsilonRate += '0';
    }
  }
  const answer = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
  console.log('Part 1 Answer:', answer);
};

const part2 = () => {
  const oxygenGeneratorRating = searchBinaryNumber(
    input,
    (mostCommonBit, bitToCompare) => mostCommonBit === bitToCompare
  );
  const co2ScrubberRating = searchBinaryNumber(
    input,
    (mostCommonBit, bitToCompare) => mostCommonBit !== bitToCompare
  );

  const answer = parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);
  console.log('Part 2 Answer:', answer);
};

part1();
part2();
