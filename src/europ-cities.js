console.log("Hallo from europ-cities.js");

/**
 * ✅ 1. Daten holen   JSON von NodeJS (auspacken ?)
 * ✅ 1.5 Klasse Glit definieren zur Verwendung
 * ✅ 2. Daten aufbereiten
 * ✅ 3. Card erzeugen
 * ✅ 4. Card anzeigen
 */

/**
 * id: userID
 * user: string
 * text: string
 * datetime: datetime / string 
 */

class City {
    // id: number;
    name;
    country;
    population;
    average_age;
    area;
    founding_year;
    population_density;
    districts;
    // geography": {
    latitude;
    longitude;
    //     "nearest_city_distance_km": {
    //         "value": 10.5    
    //         "unit": "kilometers"
    //     },
    //     "rivers": [
    //         "Semani"
    //     ],
    //     "elevation_meters": 30,
    //     "max_daily_temperature_celsius": 33.1,
    //     "min_daily_temperature_celsius": 8.6,
    //     "precipitation": "low",
    //     "rainy_days": 80,
    //     "monthly_sunshine_hours": 230
    // ,
    coat_of_arms_image_path;

    constructor(data) {
        // this.id = data.id;
        this.name = data.name;
        this.country = data.country;
        this.population = data.population;
        this.average_age = data.average_age;
        this.area = data.area;
        this.founding_year = data.founding_year;
        this.population_density = data.population_density;
        this.districts = data.districts;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.coat_of_arms_image_path = data.coat_of_arms_image_path;
    }
}

function renderCity(city) {

    return `  
    <div class="uk-card uk-card-default uk-width-1-2@m gl-container-center" style="margin-bottom: 30px;">
        <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-expand">
                    <h3 class="uk-card-title uk-margin-remove-bottom">${city.name}</h3>
                </div>
                <div>
                    <p class="uk-text-meta uk-margin-remove-top"><time>${city.country}</time></p>
                </div>
            </div>
        </div>
        <div class="uk-card-body">
            <p>${city.latitude}</p>
            <p>${city.longitude}</p>
        </div>
    </div>
    `
}



function getCitiesFromBackend() {
    fetch("https://abh754ur8d.execute-api.eu-central-1.amazonaws.com/cities")
        // .then(res => console.log(res))
        .then(res => res.json())
        // .then(json => console.log(json))
        .then(json => appendData(json))
        // .then(json => console.log(json.map(json)))

        // Djordje's Version
        // .then(json => {
        //     const glitts = json.map(glitt => new Glitt(glitt))
        //     displayGlitts(glitts)

        document.getElementById("ec-container").innerHTML = ""; 
        
        function appendData(data) {
            let glit: Glit;
            let Glits: Array<Glit> = [];
            let glitRender: string;
            for (var i = 0; i < data.length; i++) {
                glit = new Glit(data[i]);     // write to JS object
                Glits.push(glit);
                // console.log("Hello from appendData - handling: ");
                // console.log(glit);
                glitRender = renderCard(glit);
                document.getElementById("ec-container").innerHTML += renderCity; 
            }        
        }
}

function saveCity() {
    // const city = JSON.loads((document.getElementById("ec-citytext")).value);
    const cityJson = JSON.parse((document.getElementById("ec-citytext")).value);
    console.log(cityJson)
    const city = new City(cityJson);
    console.log(city)
    postCityToBackend(city);
}

function resetFormElement(elementId) {
    // const formElement = document.getElementById(elementId) as HTMLInputElement;
    // console.log("Formelement Value: " + formElement + formElement.value)
    // // if (formElement) { formElement.value == ""; }
    // formElement.value == "";
};

function resetForm() {
    // const textElement = document.getElementById(
    //   "gl-glittext"
    // ) as HTMLInputElement;
    // const nameElement = document.getElementById(
    //   "gl-glituser"
    // ) as HTMLInputElement;
  
    // if (textElement && nameElement) {
    //   textElement.value = "";
    //   nameElement.value = "";
    // }
  }

function hideModal( modalName) {
    const modalElement = document.getElementById(modalName);
    // @ts-ignore
    UIkit.modal(modalElement).hide();
};

function submitUserlogin() {
    const loginUser = document.getElementById("login-username");
    const loginPassword = document.getElementById("login-password");

    if (loginUser && loginPassword) {
        postLoginToBackend(loginUser.value,loginPassword.value)
    }
}

function postLoginToBackend(loginUser, loginPassword) {
    // fetch("http://localhost:4000/sessions", {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type':'application/json'
    //     },
    //     body: JSON.stringify({
    //         username: loginUser,
    //         password: loginPassword
    //     })
    // })
    // .then(res => res.json())
    // // .then(json => console.log("Json Token : " + json.token));
    // .then(json => localStorage.setItem('glittertoken', json.token));
    //     // console.log(res)
    // // }
}

function postCityToBackend(city) {

    fetch('https://abh754ur8d.execute-api.eu-central-1.amazonaws.com/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        // body: {
                name: city.name,
                country: city.country,
                population: city.population,
                average_age: city.average_age,
                area: city.area,
                founding_year: city.founding_year,
                population_density: city.population_density,
                districts: city.districts,
                latitude: city.latitude,
                longitude: city.longitude,
                coat_of_arms_image_path: city.coat_of_arms_image_path
        })
    })
    // console.log(JSON.stringify({
    //     // body: {
    //             name: name,
    //             country: country,
    //             population: population,
    //             average_age: average_age,
    //             area: area,
    //             founding_year: founding_year,
    //             population_density: population_density,
    //             districts: districts,
    //             latitude: latitude,
    //             longitude: longitude,
    //             coat_of_arms_image_path: coat_of_arms_image_path
    //     }))
    // .then(res => console.log(res))
    // .then(res => res.json())
    // .then(res => console.log(JSON.stringify(res)))
    .then((res) => {
        if (res.status === 201) {
            // @ts-ignore
            UIkit.notification({
                message: "City created!",
                status: "success",
                pos: "bottom-center",
                timeout: 2_200
            // console.log(res.token)
            // window.localStorage.setItem('glittertoken','xyz');
            });
        getCitiesFromBackend();
        // resetFormElement("gl-glittext");
        // resetFormElement("gl-glituser");
        resetForm();
        console.log("getCitiesFromBackend");
        hideModal('ec-create-city-modal');
        }
    })   
}


// Main
getCitiesFromBackend()