// main function
const main = () => {
	const resArea = document.getElementById('resultArea'); // textarea
	const selCategory = document.getElementById('selectCategory').value;
	const selProduct = document.getElementById('selectProduct').value;
	const check = checking(selCategory, selProduct); // check input values

	if (check[1]) {
		// if check is true
		const solve = solving(selCategory, selProduct); // solve task by user values

		resArea.style.color = '#046e04'; // valid color
		resArea.innerHTML = solve; // valid result
	} else {
		// if check is failed
		resArea.style.color = 'red'; // invalid color
		resArea.innerHTML = check[0]; // invalid result
	}
};

// checking function => check user values
const checking = (selCategory, selProduct) => {
	let result = ['', true]; // valid result

	// failed results
	// if (selCategory == '0' && selProduct == '0') {
	// 	result = ['Please select correct category or product.', false];
	// }

	return result; // send checking result
};

// solving function => solve defined task
const solving = (selCategory, selProduct) => {
	let result = 'Example...'; // initial result

	// produce object (fruits and vegetables)
	const produce = {
		Citrus: {
			0: {
				title: 'Mandarīni',
				country: 'Spānija',
				price: 8,
				count: 86,
			},
			1: {
				title: 'Mandarīni2',
				country: 'Spānija',
				price: 8,
				count: 86,
			},
		},
		Kauleņi: {
			0: {
				title: 'Persiki',
				country: 'Latvija',
				price: 3,
				count: 65,
			},
			1: {
				title: 'Mango',
				country: 'Brazilija',
				price: 3,
				count: 65,
			},
		},
		'Sakņu darzeņi': {
			0: {
				title: 'Bietes',
				country: 'Lietuva',
				price: 2,
				count: 244,
			},
			1: {
				title: 'Bietes2',
				country: 'Lietuva',
				price: 2,
				count: 244,
			},
		},
		Ķirbis: {
			0: {
				title: 'Gurķi',
				country: 'Spain',
				price: 3,
				count: 99,
			},
			1: {
				title: 'Gurķi2',
				country: 'Spain',
				price: 3,
				count: 99,
			},
		},
	};

	// if category is not selected
	if (selCategory == '-1') {
		// print all categories
		result = 'Produce categories:\n\n';
		// iterate each category key
		for (let i = 0; i < Object.keys(produce).length; i++) {
			result += `${Object.keys(produce)[i]};\n`; // add category to result
		}

		// if category is selected, but product is not
	} else if (selCategory != '-1' && selProduct == '-1') {
		result = `${JSON.stringify(Object.keys(produce)[selCategory])} products:\n\n`;
		const categoryLength = Object.keys(produce[Object.keys(produce)[selCategory]]).length; // get selected produce category length

		//iterate each selected category product
		for (let i = 0; i < categoryLength; i++) {
			result += `${JSON.stringify(Object.values(produce)[selCategory][i].title)};\n`; // add product to result
		}

		const selectProduct = document.getElementById('selectProduct'); // select tag

		if (selectProduct.options.length <= 1) {
			// iterate each object product by category and add it to the products select
			for (let i = 0; i < categoryLength; i++) {
				const product = produce[Object.keys(produce)[selCategory]][i]; // product
				const option = document.createElement('option'); // create option
				option.value = i; // set value for option
				option.textContent = product.title; // add product title
				selectProduct.appendChild(option); // add option with all parameters to the select of products
			}
		}
	} else if (selCategory != '-1' && selProduct != '-1') {
		const selectedProduct = produce[Object.keys(produce)[selCategory]][selProduct]; // get selected product
		result = `Product details:\n\n`;
		result += `Title: ${selectedProduct.title}\n`;
		result += `Country: ${selectedProduct.country}\n`;
		result += `Price: $${selectedProduct.price}\n`;
		result += `Count: ${selectedProduct.count}`;
	}

	return result; // send solving result
};

// on change category refresh products select
document.getElementById('selectCategory').addEventListener('change', () => {
	const selectProduct = document.getElementById('selectProduct'); // get select
	selectProduct.value = '-1'; // refresh select
	selectProduct.innerHTML = '<option value="-1">Choose product</option>'; // set default option
});

// refresh all data
const refresh = () => {
	document.getElementById('selectCategory').value = '-1'; // category select value
	document.getElementById('selectProduct').value = '-1'; // product select value
	document.getElementById('resultArea').innerHTML = '...'; // textarea
};
