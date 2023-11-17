// https://restcountries.com/v3.1/all

const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-button")
const resultTable = document.querySelector(".result-table")
const suggesstionList = document.getElementById("suggesstion-list")


// FETCHING 

const fetchCountry = async () => {
    try{
        const response = await fetch("https://restcountries.com/v3.1/all")
        if(!response.ok){
           throw new Error(`sth went wrong ${response.status}`) 
        }
        const data = await response.json()
        console.log(data);
        showCountry(data)
    }
    catch (err){
        console.log(err);
    }
}


// SHOW COUNTRIES

const showCountry = (countryData) => {
    countryData.forEach((country)=>{

        const {flags, name, region, capital, languages, borders , continents, currencies, maps, population} = country

        // console.log(flags, name, region, capital,);
        let countryName = name.common.toLowerCase();
        console.log(countryName);
        // INPUT PROCESS

        searchInput.addEventListener("input", function(event) {
            //  Assign suggestions with filtered
            const suggesstions = getFilteredSuggesstions(event.target.value, countryData)
            // display filtred suggestions
            displaySuggestions(suggesstions);

        })   
        searchBtn.addEventListener("click", () =>{
            const searchInputA = searchInput.value.toLowerCase().trim();

            console.log("clicked");
            console.log(searchInput.value);
            console.log(countryName);

            if(searchInputA == countryName){
                        resultTable.innerHTML = `
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

                `

            }

            // searchEvent(countryName)
        })   
        


       
    
    })

   

    

}



window.onload = () =>{
   fetchCountry() 
   searchInput.focus()
}





//  filtered suggessions

function getFilteredSuggesstions(searchInput, countryData) {
    return countryData.filter(country => country.name.common.toLowerCase().includes(searchInput));

}


// displaying

function displaySuggestions(suggestions){
    suggesstionList.innerHTML = "";
    suggestions.forEach((suggestion) =>{
        const li = document.createElement("li");
        li.textContent = suggestion.name.common;
        li.addEventListener("click",()=>{
            searchInput.value = suggestion.name.common;
            suggesstionList.innerHTML = "";
        });
        suggesstionList.appendChild(li);
    })
}







