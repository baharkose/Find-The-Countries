// https://restcountries.com/v3.1/all

const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-button")
const resultTable = document.querySelector(".result-table")


const fetchCountry = async () => {
    try{
        const respose = await fetch("https://restcountries.com/v3.1/all")

        if(!respose.ok){
           throw new Error(`sth went wrong ${response.status}`) 
        }

        const data = await respose.json()
        console.log(data);
        showCountry(data)

    }
    catch (error){
        console.log(error);
    }
}


const showCountry = (country)=>{
    // name, region, capital, flags, continents, regions, currencies, map

    country.forEach((country)=>{

        const {flags, name, region, capital, languages, borders , continents, currencies, maps, population} = country

        // console.log(flags, name, region, capital,);
        

        resultTable.innerHTML = `
                <tr>
                <th colspan="2">
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
                        <th scope="row"><i class="fa-solid fa-landmark-flag"></i> Capitals</th>
                        <td>${capital}</td>

                    </tr>
                    <tr>
                        <th scope="row"><i class="fa-solid fa-comment-dots"></i> Languages</th>
                        <td colspan="2">${Object.keys(languages)}</td>
                    </tr>
                    <tr>
                        <th scope="row"> <i class="fa-solid fa-coins"></i> Currencies</th>
                        <td colspan="2">${Object.keys(currencies)}</td>
                    </tr>

                   

                    <tr>
                        <th scope="row"><i class="fa-solid fa-users-line"></i> Population</th>
                        <td colspan="2">${population}</td>
                    </tr>
                    <tr>
                        <th scope="row"><i class="fa-solid fa-road-barrier"></i> Borders</th>
                        <td colspan="2">${borders}</td>
                    </tr>
                    <tr>
                        <th scope="row"><i class="fa-solid fa-location-dot"></i> Maps</th>
                        <td colspan="2">
                        <a href="${maps.googleMaps}" target="_blank">Go to the google map <a/>
    
                        </td>
                    </tr>

    
    `
    
    
    })
    

    

}

window.onload = () =>{
   fetchCountry() 
}
