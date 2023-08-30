let globalOutput;

const input = document.querySelector("#input-text");
let ul;
let li;

const button = document.querySelector("#enter");

const fetchCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const countries = await response.json() // deserialize json // wait for the process to finish then do whatever you have to do.
    console.log(countries);
    return countries;
}

// SetUp function
async function SetUp() {
    // Call your first function and store the output in the global variable
    globalOutput = await fetchCountries();
    addToList();

    const form = document.querySelector("#form");
    form.addEventListener("submit", handleSubmit);
}

function addToList(){
    ul = document.querySelector("ul");
    ul.innerHTML = ""; // to make it empty
    
    globalOutput.forEach(country =>{
        li = document.createElement("li");
        li.textContent = `${country.name.common} - Population ${country.population}`;
        ul.appendChild(li);
    })
}

// Function to handle form submit
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const inputValue = input.value.trim(); 

    if (inputValue === "") {
        console.log("enter a country name."); 
        return;
    }

    filterAndUpdateList(inputValue);
}

// Function to filter and update the country list -- NEEDED HELP FOR THIS PART WAS QUITE HARD
function filterAndUpdateList(query) {
    const filteredCountriesList = globalOutput.filter(country => {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(query.toLowerCase());
    });

    ul = document.querySelector("ul");
    ul.innerHTML = "";

    filteredCountriesList.forEach(country => {
        li = document.createElement("li");
        li.textContent = `${country.name.common} - Population: ${country.population}`;
        ul.appendChild(li);
    });
}


// Call the SetUp function when the webpage loads
window.onload = SetUp;
