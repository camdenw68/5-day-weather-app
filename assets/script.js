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
function fiveDay (lat, lon){
var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`
fetch (url)
.then(function(response){
   // console.log(response)
    return response.json()
})
.then(function(data){
    console.log(data)
    // access to 5 day forecast
    for (var i = 0; i < 5; i++){
        var days = [data.list[4],data.list[12],data.list[20],data.list[28],data.list[36]]
    }
})
};
