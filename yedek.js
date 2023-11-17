const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");
const resultTable = document.querySelector(".result-table");
const suggesstionList = document.getElementById("suggesstion-list");

let allCountries = [];  // Initialize as an empty string

const fetchCountry = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
            throw new Error(`sth went wrong ${response.status}`);
        }
        const data = await response.json();
        allCountries = data;
        showCountry(data, "Turkey");
    } catch (err) {
        console.log(err);
    }
};



const showCountry = (countries) => {

    resultTable.innerHTML = "";

    countries.forEach((country) => {
        const { flags, name, region, capital, languages, borders, continents, currencies, maps, population } = country;

        resultTable.innerHTML += `
            <!-- Your HTML for displaying country information -->
            <tr>
                <th colspan="2" class="resim">
                    <img src="${flags.png}"/>
                </th>
            </tr>
            <tr>
                <th colspan="2" class="h2 text-center">${name.common}</th>
            </tr>
            <tr>
                <th><i class="fa-solid fa-earth-americas"></i> Region:</th>
                <td>${region}</td>
            </tr>
            <tr>
            <th scope="row"><i class="fa-solid fa-landmark-flag"></i> Capitals:</th>
            <td>${capital}</td>
            </tr>
            <tr>
                <th scope="row"><i class="fa-solid fa-comment-dots"></i> Languages:</th>
                <td colspan="2">${Object.keys(languages)}</td>
            </tr>
            <tr>
                <th scope="row"> <i class="fa-solid fa-coins"></i> Currencies:</th>
                <td colspan="2">${Object.keys(currencies)}</td>
            </tr>
            <tr>
                <th scope="row"><i class="fa-solid fa-users-line"></i> Population:</th>
                <td colspan="2">${population}</td>
            </tr>
            <tr>
                <th scope="row"><i class="fa-solid fa-road-barrier"></i> Borders:</th>
                <td colspan="2" class="brdr text-truncate">${borders}</td>
            </tr>
            <tr>
                <th scope="row"><i class="fa-solid fa-location-dot"></i> Maps:</th>
                <td colspan="2">
                <a href="${maps.googleMaps}" target="_blank">Go to the google map <a/>

                </td>
            </tr>


        `;
    });
};

const findCountry = (inputCountryName) => {
    const filteredCountries = allCountries.filter((country) => {
        const countryName = country.name.common.toLowerCase();
        return countryName.startsWith(inputCountryName);
    });

    showCountry(filteredCountries);
};

searchInput.addEventListener('input', () => {
    const inputCountryName = searchInput.value.trim().toLowerCase();
    findCountry(inputCountryName);
});


searchBtn.addEventListener('click', () => {
    const inputCountryName = searchInput.value.trim().toLowerCase();
    findCountry(inputCountryName);
})

window.addEventListener("load", () => {
    fetchCountry();
  })
fetchCountry();