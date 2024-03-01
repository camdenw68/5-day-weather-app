var apikey =  '33b4beddff4f21f87ca55b312f8cff08'
var searchinput = document.getElementById('search-bar')
var searchbtn = document.getElementById('search-button')
searchbtn.addEventListener('click', function() {
console.log(searchinput.value)
geocode(searchinput.value)
}
)
function geocode (city){
var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`
fetch (url)
.then(function(response){
   // console.log(response)
    return response.json()
})
.then(function(data){
   // console.log(data)
    var lat = data[0].lat
    var lon = data[0].lon
    currWeather(lat, lon)
    fiveDay(lat, lon)
})
};

function showWeather(city) {
    geocode(city);
}

function currWeather (lat, lon){
var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`
fetch (url)
.then(function(response){
   // console.log(response)
    return response.json()
})
.then(function(data){
    console.log(data)
    var container = document.getElementById('container')
    var wrapper = document.createElement('div')
    wrapper.style.border = '2px solid black'
    wrapper.style.display = 'flex'
    wrapper.style.gap = '15px'
    
    var temp = document.createElement('p')
    temp.textContent = `temp ${data.main.temp} F`
    var humidity = document.createElement('p')
    humidity.textContent = `humidity is ${data.main.humidity}%`
    var speed = document.createElement('p')
    speed.textContent = `windspeed is ${data.wind.speed}`
    var city = document.createElement('h2')
    city.style.fontSize = '50px'

    city.textContent = data.name
    container.append(city, temp, humidity, speed)
    container.append(wrapper)
})
};
function fiveDay(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           // console.log(data);
            var container = document.getElementById('container');

            // Create a wrapper div for all forecast cards
            var wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.flexWrap = 'wrap'; 

            // Loop through the forecast data
            for (var i = 0; i < data.list.length; i++) {
                var forecast = data.list[i];
                var dateTime = new Date(forecast.dt * 1000); 

                // Check if the time is at noon (12:00 PM) and if it's the first forecast for the day
                if (dateTime.getUTCHours() === 12 && dateTime.getUTCMinutes() === 0 && dateTime.getUTCSeconds() === 0) {
                    var card = document.createElement('div');
                    card.style.border = '1px solid black';
                    card.style.padding = '10px';
                    card.style.minWidth = '200px'; 
                    
                    // puts all requirements in the cards
                    var date = dateTime.toDateString();
                    var temp = document.createElement('p');
                    temp.textContent = `Temperature: ${forecast.main.temp} F`;

                    var humidity = document.createElement('p');
                    humidity.textContent = `Humidity: ${forecast.main.humidity}%`;

                    var windSpeed = document.createElement('p');
                    windSpeed.textContent = `Wind Speed: ${forecast.wind.speed} mph`;

                    var icon = document.createElement('img');
                    icon.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
                    icon.alt = forecast.weather[0].description;

                    // Append date temperature humidity wind speed and icon to the card
                    card.textContent = `${date}, 12:00 PM`;
                    card.appendChild(temp);
                    card.appendChild(humidity);
                    card.appendChild(windSpeed);
                    card.appendChild(icon);

                    // Append card to the wrapper
                    wrapper.appendChild(card);
                }
            }
            container.appendChild(wrapper);
        });
}
