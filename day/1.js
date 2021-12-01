const fs = require("fs");
const inputFile = "input-1.txt";

const part1 = () => {
	fs.readFile(inputFile, "utf-8", function (err, data) {
		data = data.split("\n");
		data = data.map((x) => parseInt(x));
		var output = 0;
		var prev = undefined;
		for (i in data) {
			if (prev !== undefined && data[i] > prev) {
				output += 1;
			}
			prev = data[i];
		}
		console.log(`Part 1 Answer: ${output}`);
	});
};

const part2 = () => {
	fs.readFile(inputFile, "utf-8", function (err, data) {
		data = data.split("\n");
		data = data.map((x) => parseInt(x));
		output = inputToOutput(data);
		console.log(`Part 2 Answer: ${output}`);
	});
};

const inputToOutput = (input) => {
	var output = 0;
	var prev = undefined;
	for (var i = 0; i < input.length; i += 1) {
		var window = input[i] + input[i + 1] + input[i + 2];

		if (prev !== undefined && window > prev) {
			output += 1;
		}
		prev = window;
	}
	return output;
};

part1();
part2();
