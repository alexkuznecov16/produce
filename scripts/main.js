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
	if (selected < 0 || selected > 4) {
		result = ['Please choose valid operation.', false];
	}

	return result; // send checking result
};

// solving function => solve defined task
const solving = (val1, val2, selected) => {
	let result = '';

	class Person {
		constructor(name, surname, old, location) {
			this.firstName = name,
			this.secondName = surname,
			this.age = old,
			this.city = location
			this.getFullName = () => {
				return this.firstName + ' ' + this.secondName
			}
		}
	}

	// function Person(name, surname, old, location) {
	// 	this.firstName = name,
	// 	this.secondName = surname,
	// 	this.age = old,
	// 	this.city = location
	// }

	user_name = window.prompt('Enter your first name: ', 'John');
	user_surname = window.prompt('Enter your second name: ', 'Doe');
	user_age = window.prompt('Enter your age: ', '28');
	user_location = window.prompt('Enter your location city: ', 'Riga');

	const person1 = new Person(user_name, user_surname, user_age, user_location)

	console.log(person1);
	console.log(person1.getFullName()); // John Doe

	return result; // send solving result
};

// refresh all data
const refresh = () => {
	const opt = (document.getElementById('options').value = 0); // select value
	const inp1 = (document.getElementById('data1').value = 0); // input1 value
	const inp2 = (document.getElementById('data2').value = 0); // input2 value
	const resArea = (document.getElementById('resultArea').innerHTML = ''); // textarea
};
