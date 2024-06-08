const apiKey = '1f2af3e8641702e4667b7b3b5da750f'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const currentLocationBtn = document.getElementById('current-location-btn');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherByLocation(location);
    }
});

currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
        }, error => {
            console.error('Error getting location:', error);
            weatherInfo.innerHTML = '<p>Unable to retrieve your location. Please enter a location manually.</p>';
            weatherInfo.style.display = 'block';
        });
    } else {
        weatherInfo.innerHTML = '<p>Geolocation is not supported by your browser.</p>';
        weatherInfo.style.display = 'block';
    }
});

function fetchWeatherByLocation(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
            weatherInfo.style.display = 'block';
        });
}

function fetchWeatherByCoordinates(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
            weatherInfo.style.display = 'block';
        });
}

function displayWeather(data) {
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
            <p>Location: ${data.name}, ${data.sys.country}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherInfo.style.display = 'block';
    } else {
        weatherInfo.innerHTML = '<p>Location not found. Please try again.</p>';
        weatherInfo.style.display = 'block';
    }
}
