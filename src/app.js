function formatDate(date) {
	let now = new Date();
	let time = now.getHours();
	let minutes = (`0` + now.getMinutes()).slice(-2);

	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let day = days[now.getDay()];

	let today = document.querySelector("#day-time");

	return `${day}, ${time}:${minutes}`;
}

function displayWeatherCondition(response) {
	console.log(response.data);
	document.querySelector(".city").innerHTML = response.data.name;
	document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
	document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
	document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
	document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
	let units = "metric";
	let apiKey = "ce144f0cf51fa43f03431f0488a36728";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
	event.preventDefault();
	let city = document.querySelector("#exampleInputEmail1").value;
	searchCity(city);
}

function searchCurrentLocation(position) {
	console.log(position);
	let units = "metric";
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiKey = "ce144f0cf51fa43f03431f0488a36728";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
	console.log(apiUrl);

	axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
	event.preventDefault();
	console.log(event);
	navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let today = document.querySelector("#day-time");
let now = new Date();
today.innerHTML = formatDate(now);

let searchBar = document.querySelector("#cityInput");
searchBar.addEventListener("submit", handleSubmit);

//let celcius = document.querySelector(".celcius");
//celcius.addEventListener("click", replaceCity);

//let fahrenheit = document.querySelector(".fahrenheit");
//fahrenheit.addEventListener("click", showFahrenheit);

let buttonCurrentLocation = document.querySelector("#current-location-button");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);

searchCity("Amsterdam");
