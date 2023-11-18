document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-button");
    const resultTable = document.querySelector(".result-table");
    let suggestionList = document.getElementById("suggesstion-list");

    let allCountries = [];

    const fetchCountry = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            if (!response.ok) {
                throw new Error(`Something went wrong: ${response.status}`);
            }
            const data = await response.json();
            allCountries = data;
            showCountry("Turkey");
        } catch (err) {
            console.log(err);
        }
    };

    const showCountry = (targetCountryName) => {
        resultTable.innerHTML = "";

        const targetCountry = allCountries.find(country => country.name.common === targetCountryName);

        if (targetCountry) {
            const { flags, name, region, capital, languages, borders, currencies, maps, population } = targetCountry;

            resultTable.innerHTML += `
                     <tr>
            <th colspan="2" class=""resim>
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
        }
    };

    const findCountry = (inputCountryName) => {
        const filteredCountries = allCountries.filter(country => {
            const countryName = country.name.common.toLowerCase();
            return countryName.startsWith(inputCountryName);
        });

        showCountry(filteredCountries.length > 0 ? filteredCountries[0].name.common : "");
    };

    searchInput.addEventListener("input", () => {
        const inputCountryName = searchInput.value.trim().toLowerCase();
        findCountry(inputCountryName);
    });

    searchBtn.addEventListener("click", () => {
        const inputCountryName = searchInput.value.trim().toLowerCase();
        findCountry(inputCountryName);
    });

    // filtered suggestions
    function getFilteredSuggestions(searchInput, allCountries) {
        return allCountries.filter(country => country.name.common.toLowerCase().includes(searchInput));
    }

    // displaying suggestions
    function displaySuggestions(suggestions) {
        console.log("Displaying suggestions:", suggestions);

    if (suggestionList) {
        suggestionList.style.display="block"
        // Clear previous suggestions
        suggestionList.innerHTML = "";

        // Create and append new li elements
        suggestions.forEach((suggestion) => {
            const li = document.createElement("li");
            li.textContent = suggestion.name.common;

            // Add a click event listener to set the input value and clear the suggestion list
            li.addEventListener("click", (event) => {
                searchInput.value = event.target.textContent;
                suggestionList.style.display = "none";
                showCountry(searchInput.value)
            });

            suggestionList.appendChild(li);
        });

        // Remove the "hidden" class to show the suggestion list
      
    }
    }

    searchInput.addEventListener("input", function (event) {
        console.log("Input changed:", event.target.value);

        // Assign suggestions with filtered
        let suggestions = getFilteredSuggestions(event.target.value, allCountries);
        // display filtered suggestions
        displaySuggestions(suggestions);
    });

    fetchCountry();
});
