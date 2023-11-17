// https://restcountries.com/v3.1/all

const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-button")
const resultTable = document.querySelector(".result-table")


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



// const countryName = ""

const showCountry = (countryData) => {
    // name, region, capital, flags, continents, regions, currencies, map

    countryData.forEach((country)=>{





        const {flags, name, region, capital, languages, borders , continents, currencies, maps, population} = country



        searchInput.addEventListener('input', function(){
            const userInput = searchInput.value.toLowerCase();
            const suggestions = getFilteredSuggestions(userInput)
        
            displaySuggestions(suggestions)
        })
        
        function getFilteredSuggestions(userInput) {
            return country.filter(item => item.name.toLowerCase().includes(userInput))
        }





        // console.log(flags, name, region, capital,);
        
        let countryName = name.common
        console.log(countryName);

        // searchInput.addEventListener("keydown", (e) =>{
        //         searchEvent()
        //     })
        searchBtn.addEventListener("click", () =>{
            console.log("clicked");
            console.log(searchInput.value);
            console.log(countryName);

            if(searchInput.value == countryName){
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

// console.log(countryName);

window.onload = () =>{
   fetchCountry() 
}




// SEARCHING

const searchEvent = (country) =>{
    console.log("clicked");
    console.log(name);
    country.filter( name => {
        
        return searchInput.value === name
    
    })
        
    
} 



