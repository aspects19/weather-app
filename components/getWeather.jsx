const getWeatherAndForecast = async (place) => {
  const apiKey = process.env.EXPO_PUBLIC_TOMORROW_API;
  const formattedLocation = place.replace(" ", "_");

  const weatherUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${formattedLocation}&apikey=${apiKey}`;
  const forecastUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${formattedLocation}&apikey=${apiKey}`;

  const formatTimeToEAT = (utcTime) => {
    const date = new Date(utcTime);
    date.setHours(date.getHours() + 3); 
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl, { method: 'GET' }),
      fetch(forecastUrl, { method: 'GET' })
    ]);

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }
    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    const fullName = weatherData.location.name;
    const fullNameParts = fullName.split(",");
    const name = fullNameParts[0];
    const country = fullNameParts[fullNameParts.length - 1].trim();
    const cloudCover = weatherData.data.values.cloudCover;
    const humidity = weatherData.data.values.humidity;
    const precipitationProbability = weatherData.data.values.precipitationProbability;
    const pressure = weatherData.data.values.pressure;
    const rainIntensity = weatherData.data.values.rainIntensity;
    const temperature = weatherData.data.values.temperature;
    const visibility = weatherData.data.values.visibility;
    const windDirection = weatherData.data.values.windDirection;
    const windSpeed = weatherData.data.values.windSpeed;

    const weatherInfo = {
      name,
      country,
      cloudCover,
      humidity,
      precipitationProbability,
      pressure,
      rainIntensity,
      temperature,
      visibility,
      windDirection,
      windSpeed,
    };

    const hourlyForecasts = [];
    for (let i = 0; i < 8; i++) {
      const hourlyData = forecastData.timelines.hourly[i];
      const forecast = {
        time: index===0 ? "Now" : formatTimeToEAT(hourlyData.time),
        temperature: hourlyData.values.temperature,
        rainIntensity: hourlyData.values.rainIntensity,
        cloudCover: hourlyData.values.cloudCover,
        windSpeed: hourlyData.values.windSpeed
      };
      hourlyForecasts.push(forecast);
    }

    return {
      weatherInfo,
      hourlyForecasts
    };

  } catch (error) {
    throw new Error("An unexpected fetching error occurred: " );
  }
};

export default { getWeatherAndForecast };
