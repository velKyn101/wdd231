const currentTemp = document.querySelector("#currentTemp");
const description = document.querySelector('#description');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windSpeed');
const forecastToday = document.querySelector('#today');
const forecastYesterday = document.querySelector('#yesterday');
const forecastBefore = document.querySelector('#dayBefore');


async function apiFetch() {
    try { 
        const weatherResponse = await fetch(weatherURL);
        const forecastResponse = await fetch(forecastURL);

        if (weatherResponse.ok && forecastResponse.ok) {
            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();

            console.log("Forecast Data:", forecastData); // Debugging purposes

            // Display current weather
            displayCurrentWeather(weatherData);

            // Display next three days of forecast
            displayForecast(forecastData);
        } else {
            console.error("Failed to fetch data");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayCurrentWeather(data) {
    currentTemp.textContent = `${data.main.temp.toFixed(0)} °F`;
    description.textContent = `${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity.toFixed(0)}%`;
    windSpeed.textContent = `${data.wind.speed.toFixed(0)} mph`;
}

function displayForecast(data) {
    // Group forecast data by day
    const forecastByDay = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString(); // Convert timestamp to date
        if (!forecastByDay[date]) {
            forecastByDay[date] = [];
        }
        forecastByDay[date].push(item);
    });

    // Extract data for the next three days
    const forecastDays = Object.keys(forecastByDay).slice(1, 4); // Skip current day

    // Display the forecast for each day
    forecastToday.innerHTML = `<strong>Today:</strong> ${formatForecast(forecastByDay[forecastDays[0]])}`;
    forecastYesterday.innerHTML = `<strong>Tomorrow:</strong> ${formatForecast(forecastByDay[forecastDays[1]])}`;
    forecastBefore.innerHTML = `<strong>Day After Tomorrow:</strong> ${formatForecast(forecastByDay[forecastDays[2]])}`;
}

function formatForecast(dayData) {
    // Calculate average temperature and get the main weather description for the day
    const avgTemp = (
        dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length
    ).toFixed(0);

    const description = dayData[0].weather[0].description; // Use the first description of the day
    return `${description}, Avg Temp: ${avgTemp} °F`;
}

// Fetch the weather data
apiFetch();
