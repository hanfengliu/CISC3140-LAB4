const searchButton = document.querySelector('.search-button');
const searchBar = document.querySelector('.search-bar');

function fetchWeather(city){
	const apiKey = "e9cef9e472090de1d78d02c83711a212";
	fetch(
		"https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey
		)
	.then((response) => {
		if(response.status === 200)
			return response.json();
		else
			throw new Error();
		})
	.then(data => {displayWeather(data)})
	.catch((error) => {
		alert("Check Your Spelling");
	});
}

function displayWeather(data){
	const {name} = data;
	const {icon, description} = data.weather[0];
	const {temp, humidity} = data.main;
	const {speed} = data.wind;
	document.querySelector(".city").innerHTML = "<h2><i class=\"fas fa-city\"></i></h2><p>Weather in "+ name+"</p>";     
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerHTML = "<h2>"+temp+" &deg;C</h2><p>Temperature</p>";
    document.querySelector(".humidity").innerHTML = "<h2>"+humidity+" <span>%</span></h2><p>Humidity</p>";
    document.querySelector(".wind").innerHTML = "<h2>"+speed+" <span>km/h</span></h2><p>Wind speed</p>";
    const elems=document.querySelectorAll(".bg");
    for (let index = 0; index < elems.length; index++) {
        elems[index].style.backgroundImage = "url('https://source.unsplash.com/1600x900/?weather " + humidity + "')";
    }
    document.querySelector('.search-bar').value="";
}

function search(){
	fetchWeather(searchBar.value);
}

searchButton.addEventListener('click', function(){
	search();
})

searchBar.addEventListener('keyup', function(event){
	if(event.key == 'Enter')
		search();
})

fetchWeather("New York");