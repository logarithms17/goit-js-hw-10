import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelectEl = document.querySelector(".breed-select");
const catInfoEl = document.querySelector(".cat-info");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");

errorEl.classList.add("is-hidden"); //hide the error message
breedSelectEl.classList.add("is-hidden"); // hide the select tag during loading

//CREATE THE OPTIONS
function chooseBreed() {
	
	fetchBreeds()
		.then((data) => { //fetching data using .then
			loaderEl.classList.replace("loader", "is-hidden"); //hide loading message once successful fetching of data

			let optionsMarkup = data.map(({ name, id }) => { // loops the entire data from fetched data and using destructure to get the specific info needed which is name and id
				return `<option value=${id}>${name}</option>`; //creates an elemeent option with the info that was fetched
				//<option value={catId} >Cat Name</option>
			});
			breedSelectEl.insertAdjacentHTML("beforeend", optionsMarkup); // added the created option elements stored in optionsMarkup to the select element with a variable breedSelectEl
			breedSelectEl.classList.remove("is-hidden"); // unhide the select tag after all the fetching process
		})
		.catch(onError); // unhide error message when failed in fetching data
}

chooseBreed(); //calls the function chooseBreed



breedSelectEl.addEventListener("change", (e) => { //addEventListener functions when selecting an option
	//show loader while loading.

	loaderEl.classList.replace("is-hidden", "loader"); // loading message appears after selecting an option of breed type. 

	//hide select element and cat info while loading.

	// catInfoEl.classList.add("is-hidden"); // this is not needed because catinfo is still not yet existed during this time

	let breedId = e.target.value; // this targets the value of the selected option or breed of cat
	fetchCatByBreed(breedId) //using the data of the selected option or cat breed
		.then((data) => { //using .then to fetch the data of the cat breed
			const { url, breeds } = data[0]; // choose only the url and breed from the array data of index[0]
			const { name, description, temperament } = breeds[0]; //chose only the name, description and temperament from the array of breeds with the index[0]

			catInfoEl.innerHTML = ` 
            <img src='${url}' alt='{name}' width="400"/>
            <div class='box'>
                <h2>${name}</h2>
                <p>${description}</p>
                <p>${temperament}</p>
            </div>
        `; // this creates a markup of html that is inserted in the element div with the class of cat-info that is stored in catInfoEl
			// catInfoEl.classList.remove("is-hidden");
			loaderEl.classList.add("is-hidden"); // loading message is hidden after successfully fetching the data
		})
		.catch(onError); //shows error message once fetching failed
});

function onError() {
	//Show error message
	errorEl.classList.remove("is-hidden"); // unhides the error message once fetching failed

	//hide select element
	breedSelectEl.classList.add("is-hidden"); //select tag is hidden when there is an error
}
