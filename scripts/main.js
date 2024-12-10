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
	if (selCategory == '-1') {
		result = ['Please select a category.', false];
	}

	return result; // send checking result
};

// produce object (fruits and vegetables)
const produce = {
	'Citrus': [
		{
			title: 'Mandarīni',
			country: 'Spānija',
			price: 8,
			count: 86,
			image: 'images/mandarini.jpg',
		},
		{
			title: 'Mandarīni2',
			country: 'Spānija',
			price: 8,
			count: 86,
			image: 'images/mandarini.jpg',
		},
	],
	'Kauleņi': [
		{
			title: 'Persiki',
			country: 'Latvija',
			price: 3,
			count: 65,
			image: 'images/persiki.jpg',
		},
		{
			title: 'Mango',
			country: 'Brazilija',
			price: 3,
			count: 65,
			image: 'images/mango.jpg',
		},
	],
	'Sakņu darzeņi': [
		{
			title: 'Bietes',
			country: 'Lietuva',
			price: 2,
			count: 244,
			image: 'images/bietes.jpg',
		},
		{
			title: 'Bietes2',
			country: 'Lietuva',
			price: 2,
			count: 244,
			image: 'images/bietes.jpg',
		},
	],
	'Ķirbis': [
		{
			title: 'Gurķi',
			country: 'Spain',
			price: 3,
			count: 99,
			image: 'images/gurki.jpg',
		},
		{
			title: 'Gurķi2',
			country: 'Spain',
			price: 3,
			count: 99,
			image: 'images/gurki.jpg',
		},
	],
};

// on page loading add locale data
document.addEventListener('DOMContentLoaded', () => {
	const newData = localStorage.getItem('object'); // get data
	if (newData) {
		parsedData = JSON.parse(newData); // JSON data parse to Object
		Object.assign(produce, parsedData);
	}
});

// solving function => solve defined task
const solving = () => {
	const selCategory = document.getElementById('selectCategory').value;
	const selProduct = document.getElementById('selectProduct').value;

	const start = Date.now();
	let result = 'Example...'; // initial result

	// if category is not selected
	if (selCategory == '-1') {
		const imgElement = document.querySelector('.textarea_block img');
		if (imgElement) {
			imgElement.src = '#';
			imgElement.setAttribute('alt', '');
		}

		// delete buttons if exists
		const deleteBtn = document.querySelector('.delete');
		if (deleteBtn) document.querySelector('.textarea_block').removeChild(deleteBtn);

		const addBtn = document.querySelector('.add');
		if (addBtn) document.querySelector('.textarea_block').removeChild(addBtn);

		// print all categories
		result = 'Produce categories:\n\n';
		// iterate each category key
		for (let i = 0; i < Object.keys(produce).length; i++) {
			result += `${Object.keys(produce)[i]};\n`; // add category to result
		}
		///////////////////////////////////////////////////////////////////

		// if category is selected, but product is not
	} else if (selCategory != '-1' && selProduct == '-1') {
		const imgElement = document.querySelector('.textarea_block img');
		if (imgElement) {
			imgElement.src = '';
			imgElement.setAttribute('alt', '');
		}
		// remove delete button if exists
		const deleteBtn = document.querySelector('.delete');
		if (deleteBtn) document.querySelector('.textarea_block').removeChild(deleteBtn);

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

		// add btn
		const btn = document.createElement('span');
		btn.className = 'add';
		btn.textContent = '+';

		const existsAdd = document.querySelector('.add');

		// clicking to the add btn
		btn.addEventListener('click', () => {
			// modal window open and body (y) overflow hide
			document.body.style.overflow = 'hidden';

			// modal block
			const modal = document.createElement('div');
			modal.className = 'modal';

			// modal container
			const modal_container = document.createElement('div');
			modal_container.classList = 'modal_container';

			// modal close btn
			const btn_close = document.createElement('span');
			btn_close.className = 'close';
			btn_close.textContent = 'X';

			modal_container.appendChild(btn_close); // add close btn to modal

			// clicking to the close btn
			btn_close.addEventListener('click', () => {
				document.body.style.overflow = ''; // refresh overflow (to allow scroll)
				document.querySelector('.main').removeChild(modal); // remove modal
			});

			// product name
			const input1 = document.createElement('input');
			input1.placeholder = 'ievadiet produkta nosaukumu';
			input1.type = 'text';

			// product country
			const input2 = document.createElement('input');
			input2.placeholder = 'ievadiet produkta valsti';
			input2.type = 'text';

			// product count
			const input3 = document.createElement('input');
			input3.placeholder = 'ievadiet produkta count';
			input3.type = 'number';

			// product price
			const input4 = document.createElement('input');
			input4.placeholder = 'ievadiet produkta cenu';
			input4.type = 'number';

			// product image
			const inputFile = document.createElement('input');
			inputFile.type = 'file';
			inputFile.accept = 'image/*'; // only images

			// block for correct position (textarea and input)
			const btn_block = document.createElement('div');
			btn_block.className = 'button_block';

			// btn for adding new product
			const btn_add = document.createElement('button');
			btn_add.textContent = 'Pievienot';

			// adding new product success
			const resArea = document.createElement('textarea');
			resArea.readOnly = true;

			btn_block.appendChild(btn_add); // add button
			btn_block.appendChild(resArea); // add textarea

			// clicking to the btn add product with specific values
			btn_add.addEventListener('click', () => {
				const file = inputFile.files[0];

				// data check
				const isTitleValid = input1.value.trim() !== ''; // input1 is not empty
				const isCountryValid = input2.value.trim() !== ''; // input2 is not empty
				const isCountValid = Number(input3.value) >= 1 && !isNaN(Number(input3.value)); // input3 is not less than 1
				const isPriceValid = Number(input4.value) >= 1 && !isNaN(Number(input4.value)); // input4 is not less than 1
				const isFileValid = Boolean(file); // input5 (image) is correct

				// if all data is correct -> add this product
				if (isTitleValid && isCountryValid && isCountValid && isPriceValid && isFileValid) {
					const reader = new FileReader(); // read file from user input
					reader.onload = () => {
						const len = Object.keys(produce[Object.keys(produce)[selCategory]]).length;

						// temporary object with product data
						const newProduct = {
							title: input1.value.trim(),
							country: input2.value.trim(),
							price: Number(input4.value),
							count: Number(input3.value),
							image: reader.result,
						};

						// add new product to the specific category
						produce[Object.keys(produce)[selCategory]].push(newProduct);

						// refresh list in select
						const selectProduct = document.getElementById('selectProduct');
						selectProduct.innerHTML = '<option value="-1">Choose product</option>'; // Refresh select
						const category = produce[Object.keys(produce)[selCategory]];

						// Update select by products
						for (let i = 0; i < Object.keys(category).length; i++) {
							const option = document.createElement('option');
							option.value = i;
							option.textContent = category[i].title;
							selectProduct.appendChild(option);
						}

						// correct
						resArea.value = 'Tika pievienots!';
						resArea.style.color = 'greenyellow';
						localStorage.setItem('object', JSON.stringify(produce)); // save in localStorage
					};
					reader.readAsDataURL(file); // read the file as URL
				} else {
					// If data is not correct -> send error message
					let errorMessage = 'Netika pievienots! Lūdzu ievadiet korektus datus:\n';

					resArea.value = errorMessage;
					resArea.style.color = 'red';
				}
			});

			// add to modal all inputs and btn with textarea
			modal_container.appendChild(input1);
			modal_container.appendChild(input2);
			modal_container.appendChild(input3);
			modal_container.appendChild(input4);
			modal_container.appendChild(inputFile);
			modal_container.appendChild(btn_block);

			modal.appendChild(modal_container); // add modal container to the modal block
			document.querySelector('.main').appendChild(modal); // add modal to the html
		});

		if (!existsAdd) {
			document.querySelector('.textarea_block').appendChild(btn);
		}
		///////////////////////////////////////////////////////////////////

		// if category is selected with product
	} else if (selCategory != '-1' && selProduct != '-1') {
		// remove add button if exists
		const addBtn = document.querySelector('.add');
		if (addBtn) document.querySelector('.textarea_block').removeChild(addBtn);

		const selectedCategory = produce[Object.keys(produce)[selCategory]]; // specific category
		const selectedProduct = selectedCategory[selProduct]; // get selected product
		result = `Product details:\n\n`;
		result += `Title: ${selectedProduct.title}\n`;
		result += `Country: ${selectedProduct.country}\n`;
		result += `Price: $${selectedProduct.price}\n`;
		result += `Count: ${selectedProduct.count}`;

		const imgElement = document.querySelector('.textarea_block img');
		imgElement.src = selectedProduct.image || '';
		imgElement.setAttribute('alt', 'Product');

		const btn = document.createElement('span');
		btn.className = 'delete';
		btn.textContent = '-';

		const existsDelete = document.querySelector('.delete');

		btn.addEventListener('click', () => {
			selectedCategory.splice(selProduct, 1);
			localStorage.setItem('object', JSON.stringify(produce));
			refreshSelect();
		});

		if (!existsDelete) {
			document.querySelector('.textarea_block').appendChild(btn);
		}
	}

	const millis = Date.now() - start;
	console.log(`seconds elapsed = ${millis}`);

	return result; // send solving result
};

const refreshSelect = () => {
	const selectProduct = document.getElementById('selectProduct');
	const selCategory = document.getElementById('selectCategory').value;
	selectProduct.innerHTML = '<option value="-1">Choose product</option>';
	const category = produce[Object.keys(produce)[selCategory]];
	for (let i = 0; i < category.length; i++) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = category[i].title;
		selectProduct.appendChild(option);
	}
};

// on change category refresh products select
document.getElementById('selectCategory').addEventListener('change', refreshSelect);

// refresh all data
const refresh = () => {
	document.getElementById('selectCategory').value = '-1'; // category select value
	document.getElementById('selectProduct').value = '-1'; // product select value
	document.getElementById('resultArea').innerHTML = '...'; // textarea

	const imgElement = document.querySelector('.textarea_block img');
	if (imgElement) {
		imgElement.src = '#';
		imgElement.setAttribute('alt', '');
	}

	// delete buttons if exists
	const deleteBtn = document.querySelector('.delete');
	if (deleteBtn) document.querySelector('.textarea_block').removeChild(deleteBtn);

	const addBtn = document.querySelector('.add');
	if (addBtn) document.querySelector('.textarea_block').removeChild(addBtn);

	refreshSelect();
};
