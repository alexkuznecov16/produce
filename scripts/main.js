// main function
const main = () => {
	const opt = document.getElementById('options').value; // select value
	const inp1 = Number(document.getElementById('data1').value); // input1 value
	const inp2 = Number(document.getElementById('data2').value); // input2 value
	const resArea = document.getElementById('resultArea'); // textarea
	const check = checking(inp1, inp2, opt); // check input values

	if (check[1]) {
		// if check is true
		const solve = solving(inp1, inp2, opt); // solve task by user values

		resArea.style.color = '#046e04'; // valid color
		resArea.innerHTML = solve; // valid result
	} else {
		// if check is failed
		resArea.style.color = 'red'; // invalid color
		resArea.innerHTML = check[0]; // invalid result
	}
};

// checking function => check user values
const checking = (val1, val2, selected) => {
	let result = ['', true]; // valid result

  // failed results
	if (isNaN(val1) || isNaN(val2)) {
		result = ['Please enter valid numbers.', false];
	} else if (selected < 1 || selected > 4) {
		result = ['Please choose valid operation.', false];
	} else if (selected == 4 && val2 == 0) {
		result = ['You cannot divide by 0.', false];
	}

	return result; // send checking result
};

// solving function => solve defined task
const solving = (val1, val2, selected) => {
	let result = 'Example...'; // initial result

  // set result by selected option
	if (selected == 1) {
		result = `Addition of ${val1} + ${val2} = ${val1 + val2}`;
	} else if (selected == 2) {
		result = `Subtraction of ${val1} - ${val2} = ${val1 - val2}`;
	} else if (selected == 3) {
		result = `Multiplication of ${val1} * ${val2} = ${val1 * val2}`;
	} else if (selected == 4) {
		result = `Division of ${val1} : ${val2} = ${val1 / val2}`;
	}

	return result; // send solving result
};

// refresh all data
const refresh = () => {
	const opt = (document.getElementById('options').value = 0); // select value
	const inp1 = (document.getElementById('data1').value = 0); // input1 value
	const inp2 = (document.getElementById('data2').value = 0); // input2 value
	const resArea = (document.getElementById('resultArea').innerHTML = ''); // textarea
};
