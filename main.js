let APIKey = '9ef974f9625448ccb3615619231809';

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${location}`);
        const weatherData = await response.json();
        console.log(weatherData)
        return weatherData;
    } catch (error) {
        console.log(error);
    }
}

async function loadWeatherData(weatherData) {
    try {
        const condition = document.querySelector('.condition');
        const location = document.querySelector('.location');
        const temperature = document.querySelector('.temperature');
        const feelsLike = document.querySelector('.feels-like');
        const wind = document.querySelector('.wind');
        const humidity = document.querySelector('.humidity');

        // You can directly access properties from the weatherData object
        condition.innerHTML = weatherData.current.condition.text
        location.innerHTML = weatherData.location.name + ', ' + weatherData.location.region;
        temperature.innerHTML = weatherData.current.temp_c + "°C";
        feelsLike.innerHTML = "Feels like: " + weatherData.current.feelslike_c + "°C";
        wind.innerHTML = "Wind: " + weatherData.current.wind_kph + " km/h";
        humidity.innerHTML = "Humidity: " + weatherData.current.humidity + "%";
    } catch (error) {
        const location = document.querySelector('.location');
        location.innerHTML = error;
    }
}

const searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        try {
            let fetchedWeatherData = await fetchWeatherData(searchBar.value);
            loadWeatherData(fetchedWeatherData);
            searchBar.value = ''; // Use .value to clear the input field
        } catch (error) {
            console.log(error);
        }
    }
});

// Initial load for Chicago


(async () => {
    const initialWeatherData = await fetchWeatherData('Chicago');
    loadWeatherData(initialWeatherData);
})();

