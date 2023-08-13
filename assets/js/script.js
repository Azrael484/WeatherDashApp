var lastCitySearchEl = document.querySelector(".card-header");
var currentDateEl = document.getElementById("current-day");
var currentIcon = document.querySelector("#current-icon");
var cityTemp = document.querySelector("#current-temp");
var cityWind = document.querySelector("#current-wind");
var cityHumidity = document.querySelector("#current-humidity");

var recentHistEl = document.querySelector("#recent-history");

var futureDaysWeather = [];

for(let i=0; i<5; i++){

    //Getting the HTML elements where the info will be displayed

    var Day = document.getElementById("day-"+i);
    console.log(Day);
    var Temp =document.getElementById("temp-"+i);
    var Humid = document.getElementById("humidity-"+i);
    var Wind = document.getElementById("wind-"+i);
    var Icon = document.getElementById("icon-"+i);
    
    //Storing the references to the display elements in an object

    var forecastedWeather = {
        day: Day,
        temp: Temp,
        humid: Humid,
        wind: Wind,
        icon: Icon
    }
    futureDaysWeather.push(forecastedWeather);

    };

    console.log(futureDaysWeather[0]);

    /*
function displayWeatherPron(){

    var lastCitySearched = document.createElement("div");
    lastCitySearched.classList.add("col-12", "col-md-6");
    document.body.children[2].appendChild(lastCitySearched);

    var lastCityTitle = document.createElement("h1");
    lastCityTitle.textContent = "Last City Searched";
    lastCitySearched.appendChild(lastCityTitle);

    var lastCityCard = document.createElement("div");
    lastCityCard.setAttribute("class", "card");
    lastCitySearched.appendChild(lastCityCard);

    var lastCityCardHeader = document.createElement("h5");
    lastCityCardHeader.setAttribute("class", "card-header");
    lastCityCardHeader.textContent = requestedCity.name;

    lastCityCard.appendChild(lastCityCardHeader);

    var lastCityBody = document.createElement ("div");
    lastCityBody.setAttribute("class", "card-body");
    lastCityCard.appendChild(lastCityBody);

    var lastCityDate = document.createElement ("h5");
    lastCityCardHeader.setAttribute("class", "card-title");
    lastCityDate.textContent = "Today is 2023-08-09";
    lastCityBody.appendChild(lastCityDate);

    var lastCityList = document.createElement("ul");
    lastCityList.classList.add("list-group","col","col-md-3");
    lastCityBody.appendChild(lastCityList);

    for (let k=0; k<3; k++){
        var lastCityListItem = document.createElement("li");
        lastCityListItem.textContent = weatherFactors[k] + weatherConditions[k];
        lastCityListItem.classList.add("list-group-item","text-bold");
        lastCityList.appendChild(lastCityListItem);
    }

    var weatherPron = document.createElement("div");
    weatherPron.className = "row justify-content-around";
    document.body.children[2].appendChild(weatherPron);


    var pronTitle = document.createElement("h5");
    pronTitle.textContent = "Pronostics For the Next 5 Days";
    weatherPron.appendChild(pronTitle);

    for(let i=0; i<5; i++){

    var pronCard = document.createElement("div");
    pronCard.className = "card col-12 col-md-3 col-lg-2 my-3"
    weatherPron.appendChild(pronCard);


    var pronCardBody = document.createElement("div");
    pronCardBody.setAttribute ("class", "card-body");
    pronCard.appendChild(pronCardBody);

    var pronCardDate = document.createElement("h5");
    pronCardDate.setAttribute("class", "card-title");
    pronCardDate.textContent = requestedCity.date_of_request;
    pronCardBody.appendChild(pronCardDate);

    var weatherList = document.createElement("ul");
    weatherList.className = "list-group col mx-auto";
    pronCardBody.appendChild(weatherList);

    for (let j=0; j<3; j++){
        var weatherListItem = document.createElement("li");
        weatherListItem.setAttribute("class","list-group-item");
        weatherListItem.textContent = weatherFactors[j] + weatherConditions[j];
        weatherList.appendChild(weatherListItem);
        }

    }
}
*/
//displayWeatherPron();

const openWeatherAPIKey = "c78a2807f103a8edbc1b0bba2c9c1d8d";
const countryCode = "ISO 3166-2:US";

var statesArray = ['AL', 'AK', 'AZ', 'AR','CA', 
                   'CO','CT','DE', 'DC', 'FL',
                   'GA','HI','ID','IL','IN',
                   'IA','KS','KY','LA','ME',
                   'MD', 'MA','MI','MN','MS',
                   'MO','MT','NE','NV','NH',
                   'NJ','NM','NY','NC','ND',
                   'OH','OK','OR','PA', 'PR',
                   'RI', 'SC','SD','TN','TX',
                   'UT','VT','VA','VI','WA',
                   'WV','WI','WY'];

var stateNamesArray = ['Alabama', 'Arkansas', 'Arizona', 'Arkansas', 'California',
                       'Colorado', 'Connecticut','Delaware','District of Columbia','Florida',
                       'Georgia', 'Hawaii', 'Idaho', 'Illinois','Indiana',
                       'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
                       'Maryland', 'Massachussets', 'Michigan', 'Minnesota','Mississippi',
                       'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                       'New Jersey', 'New Mexico','New York','North Carolina','North Dakota',
                       'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico',
                       'Rhode Island', 'South Carolina', 'South Dakota','Tennessee', 'Texas',
                       'Utah', 'Vermont', 'Virginia', 'Virgin Islands', 'Washington',
                       'West Virginia', 'Wisconsin', 'Wyoming'];

const stateInputEl = document.querySelector('#state-input');
const stateInputBtn = document.querySelector('#state-btn');

const cityInputEl = document.querySelector("#city-input");
const cityInputBtn = document.querySelector("#city-btn")

var cityInput;
var stateInput;

cityInputBtn.addEventListener('click', ()=>{

     cityInput = cityInputEl.value;
    console.log("hello");
    console.log(cityInput);
    if(stateInput=== undefined || cityInput=== undefined){
        alert("Remember that both inputs are required.");
    }else{
        findCityCoordinates(cityInput, stateInput);
    };

})

stateInputBtn.addEventListener('click', ()=>{
    var state = stateInputEl.value.toUpperCase();
    for(let i=0; i<53;i++){
        if(state === stateNamesArray[i].toUpperCase()){
            stateInput = statesArray[i];
        }
    };
    console.log("Hello");
    console.log(stateInput);
    if(cityInput=== undefined || stateInput=== undefined){
        alert("Remember that both inputs are required.");
    }else{
        findCityCoordinates(cityInput, stateInput);
    };
    
});


var cityIsInState;

var cityCoord = new Array(2);

var searchedCities = [];

function findCityCoordinates(city,state) {

var geoCodeAPIUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city+ "," + state + ", " + countryCode +"&limit=1&appid="+ openWeatherAPIKey; 

fetch(geoCodeAPIUrl)
.then(function(response){
if (!response.ok){
    return response.statusText;
}

    return response.json()
})
.then(function(data){
    if(!data){
        return;
    }

    console.log(data);
    cityIsInState = data.length;
    console.log(Boolean(cityIsInState));

    if(Boolean(cityIsInState)){ //Verifies if the city entered is in the given U.S. territory

    cityCoord[0] = data[0].lat ;
    cityCoord[1] = data[0].lon;

    lastCitySearchEl.textContent = cityInput.toUpperCase() + " , " + stateInput;

    findCurrentWeather(cityCoord[0],cityCoord[1]);
    findNextFiveForecasts(cityCoord[0],cityCoord[1]);

    var currentCity = {

        name: cityInput,
        state: stateInput,
        lat: cityCoord[0],
        lon: cityCoord[1]

    }
     
    if (!searchedCities.includes(currentCity)){ 

        searchedCities.push(currentCity);
    }

    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
    console.log(localStorage);

    }else{
        alert("The chosen city is not in the selected U.S. territory.")
    }
});
}

function findCurrentWeather(lat,lon){

    var findCurrentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + openWeatherAPIKey;
    
            fetch(findCurrentWeatherUrl)
            .then(function(response){
                if (!response.ok){
    
                    return response.statusText;
                }
                
                return response.json();
    
            }).then(function(data){
                if(!data){
                    return;
                }

                //Updating the info on the card corresponding to the last city searched

                var currentIconUrl = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                currentIcon.setAttribute("src", currentIconUrl);

                currentDateEl.textContent = dayjs.unix(data.dt); // ToDo: Take the hour out
                cityTemp.textContent = data.main.temp + 'F degrees';
                cityWind.textContent = data.wind.speed + 'mph';
                cityHumidity.textContent = data.main.humidity + '%';
             
            });
    }
    

function findNextFiveForecasts(lat,lon){

var fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + openWeatherAPIKey;

        fetch(fiveDayForecastUrl)
        .then(function(response){
            if (!response.ok){

                return;
            }
            
            return response.json();

        }).then(function(data){
            if(!data){
                return;
            }
            console.log(data.list);//An object with weather forecasts for each 3 hour period during the next five days. 
            
            for (let i=0; i<5; i++){

                var weatherForecast = data.list[2 + i*8]; //We choose to display the forecast for the weather conditions at 0:00 AM of every day

                futureDaysWeather[i].day.textContent = weatherForecast.dt_txt;
                futureDaysWeather[i].temp.textContent= weatherForecast.main.temp;
                futureDaysWeather[i].wind.textContent= weatherForecast.wind.speed;
                futureDaysWeather[i].humid.textContent= weatherForecast.main.humidity;  
                futureDaysWeather[i].icon.src = "https://openweathermap.org/img/w/" + weatherForecast.weather[0].icon + ".png";

            };
        });
}


