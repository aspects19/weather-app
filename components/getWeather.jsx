import data from "../dummy/dummy.json" with { type: "json"};

import getWeatherIcon from "./getWeatherIcon";
import getDescription from './getDescription';


const getWeatherAndForecast = async (place) => {
  const apiKey = process.env.EXPO_PUBLIC_TOMORROW_API
  
  const formattedLocation = place.trim().replace(" ", "_");

  const weatherUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${formattedLocation}&apikey=${apiKey}`;
  const forecastUrl =`https://api.tomorrow.io/v4/weather/forecast?location=${formattedLocation}&apikey=${apiKey}`;
    
  const formatTimeToEAT = (utcTime) => {
    const date = new Date(utcTime);
    date.setHours(date.getHours()); 
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  
  try {
    // const [weatherResponse, forecastResponse] = await Promise.all([
    //   fetch(weatherUrl, { method: 'GET' }),
    //   fetch(forecastUrl, { method: 'GET' }),
    // ]);
    
    // if (!weatherResponse.ok || !forecastResponse.ok) {
    //   throw new Error("Failed to fetch weather data");
    // }


    // const weatherData = await weatherResponse.json();
    // const forecastData = await forecastResponse.json();

    //  const weatherData = data.weather;
    //  const forecastData = data.forecast;

    const fullName = weatherData.location.name;
    const fullNameParts = fullName.split(",");
      const weatherInfo = {
        name  :fullNameParts[0],
        country : fullNameParts[fullNameParts.length - 1].trim(),
        description: getDescription(weatherData),
        icon: getWeatherIcon(weatherData.data, weatherData.time),
        temperature: weatherData.data.values.temperature,
        cloudCover : weatherData.data.values.cloudCover,
        humidity : weatherData.data.values.humidity,
        precipitationProbability : weatherData.data.values.precipitationProbability,
        pressure : weatherData.data.values.pressure,
        rainIntensity : weatherData.data.values.rainIntensity,
        visibility : weatherData.data.values.visibility,
        windDirection : weatherData.data.values.windDirection,
        windSpeed : weatherData.data.values.windSpeed, 
      };

    const hourlyForecasts = [];
    
    for (let i = 0; i < 8; i++) {
      const hourlyData = forecastData.timelines.hourly[i];
      const forecast = {
        time: i === 0 ? "Now" : formatTimeToEAT(hourlyData.time),
        rainIntensity: hourlyData.values.rainIntensity,
        cloudCover: hourlyData.values.cloudCover,
        windSpeed: hourlyData.values.windSpeed,
        temperature: hourlyData.values.temperature,
        icon: getWeatherIcon(hourlyData, hourlyData.time),
      };

      hourlyForecasts.push(forecast);
    }
    
    return {
      weatherInfo,
      hourlyForecasts
    };

  }catch (err) {
    console.log("Error fetching weather data:", err);
    throw new Error("Issue with calling");
  }
};

export default getWeatherAndForecast;
