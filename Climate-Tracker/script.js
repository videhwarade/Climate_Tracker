const weatherApiKey = "7026e17d8b097b55b05f07cd757ccb44"; // Use your OpenWeatherMap API Key

async function fetchWeather() {
  const city = document.getElementById("city-input").value;
  if (!city) {
    alert("City name is required!");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const weatherData = await response.json();

    if (weatherData.cod !== 200) {
      alert("City not found, please try again!");
      return;
    }

    const location = weatherData.name;
    const temperature = `${weatherData.main.temp}°C`;
    const weatherDesc = weatherData.weather[0].description;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;

    // Define weather icons with emoji representations
    const weatherIcons = {
      clear: "🌞",
      clouds: "☁️",
      rain: "🌧️",
      snow: "❄️",
      thunderstorm: "⚡",
      mist: "🌫️",
    };

    let weatherEmoji = "🌤️"; // Default emoji
    let backgroundColor = "#87CEEB"; // Default background color (light blue for day)

    // Determine if it's day or night
    const currentHour = new Date().getHours();
    const isDaytime = currentHour >= 6 && currentHour < 18; // Daytime is from 6 AM to 6 PM

    // Adjust background color based on time of day
    if (!isDaytime) {
      backgroundColor = "#2C3E50"; // Dark background for night
    }

    // Adjust background and weather emoji based on weather conditions
    if (weatherDesc.includes("clear")) {
      weatherEmoji = weatherIcons.clear;
      backgroundColor = isDaytime ? "#FFCC00" : "#1F3A1F"; // Sunny (day) or clear night
    } else if (weatherDesc.includes("cloud")) {
      weatherEmoji = weatherIcons.clouds;
      backgroundColor = isDaytime ? "#B0C4DE" : "#2F4F4F"; // Cloudy (day) or night
    } else if (weatherDesc.includes("rain")) {
      weatherEmoji = weatherIcons.rain;
      backgroundColor = isDaytime ? "#ADD8E6" : "#3E4E66"; // Rainy (day) or rainy night
    } else if (weatherDesc.includes("snow")) {
      weatherEmoji = weatherIcons.snow;
      backgroundColor = isDaytime ? "#FFFFFF" : "#A9A9A9"; // Snowy (day) or snowy night
    } else if (weatherDesc.includes("thunderstorm")) {
      weatherEmoji = weatherIcons.thunderstorm;
      backgroundColor = isDaytime ? "#FFD700" : "#4B0082"; // Thunderstorm (day) or night
    } else if (weatherDesc.includes("mist")) {
      weatherEmoji = weatherIcons.mist;
      backgroundColor = isDaytime ? "#D3D3D3" : "#696969"; // Misty (day) or misty night
    }

    // Apply background color and weather icon changes
    document.body.style.backgroundColor = backgroundColor;

    // Display the fetched weather data
    document.getElementById("location-name").textContent = location;
    document.getElementById("temp").textContent = temperature;
    document.getElementById("weather-description").textContent =
      weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
    document.getElementById("humidity-percentage").textContent = `${humidity}%`;
    document.getElementById("wind-velocity").textContent = `${windSpeed} m/s`;
    document.getElementById("weather-symbol").textContent = weatherEmoji;
  } catch (error) {
    alert("An error occurred while fetching weather data. Please try again.");
  }
}
