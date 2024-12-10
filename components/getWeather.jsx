import getWeatherIcon from "./getWeatherIcon";
import icons from "../constants/icons";
import getDescription from './getDescription';

const getWeatherAndForecast = async (place) => {
  // const apiKey = process.env.EXPO_PUBLIC_TOMORROW_API
  // const formattedLocation = place.trim().replace(" ", "_");

  // const weatherUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${formattedLocation}&apikey=${apiKey}`;
  // const forecastUrl =`https://api.tomorrow.io/v4/weather/forecast?location=${formattedLocation}&apikey=${apiKey}`;
    
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
    // const fullName = weatherData.location.name;
    // const fullNameParts = fullName.split(",");
      // const weatherInfo = {
      //   name  :fullNameParts[0],
      //   country : fullNameParts[fullNameParts.length - 1].trim(),
      //   cloudCover : weatherData.data.values.cloudCover,
      //   humidity : weatherData.data.values.humidity,
      //   precipitationProbability : weatherData.data.values.precipitationProbability,
      //   pressure : weatherData.data.values.pressure,
      //   rainIntensity : weatherData.data.values.rainIntensity,
      //   visibility : weatherData.data.values.visibility,
      //   windDirection : weatherData.data.values.windDirection,
      //   windSpeed : weatherData.data.values.windSpeed, 
      // };

      const weatherData = {
        time: "2021-09-15T12:00:00Z",
        data: {
          values: {
            cloudCover: 50,
            humidity: 50,
            precipitationProbability: 300,
            pressure: 103,
            rainIntensity: 3,
            visibility: 10,
            windDirection: 180,
            windSpeed: 5,
          },
        },
      };

      const weatherInfo = {
        name: place,
        description: getDescription(weatherData),
        icon: getWeatherIcon(weatherData.data, weatherData.time),
        temperature: 25,
        country: "Kenya",
        cloudCover: 0,
        humidity: 50,
        precipitationProbability: 300,
        pressure: 103,
        rainIntensity: 0,
        visibility: 10,
        windDirection: 180,
        windSpeed: 5,
      };


    const forecastData = {
      timelines: {
        hourly: [
          {
            time: "2021-09-15T12:00:00Z",
            values: {
              rainIntensity: 0,
              cloudCover: 0,
              windSpeed: 0,
              temperature: 25,
            },
          },
          {
            time: "2021-09-15T13:00:00Z",
            values: {
              rainIntensity: 0,
              cloudCover: 0,
              windSpeed: 0,
              temperature: 25,
            },
          },
          {
            time: "2021-09-15T14:00:00Z",
            values: {
              rainIntensity: 0,
              cloudCover: 0,
              windSpeed: 0,
              temperature: 25,
            },
          },
          {
            time: "2021-09-15T15:00:00Z",
            values: {
              rainIntensity: 0,
              cloudCover: 0,
              windSpeed: 0,
              temperature: 25,
            },
          },
          {
            time: "2021-09-15T16:00:00Z",
            values: {
              rainIntensity: 0,
              cloudCover: 0,
              windSpeed: 0,
              temperature: 25,
            },
          },
          {
            time: "2021-09-15T17:00:00Z",
            values: {
              rainIntensity: 0,
              cloudCover: 0,
              windSpeed: 0,
              temperature: 25,
            },
          },
          {
            time: "2021-09-15T18:00:00Z",
            values: {
              rainIntensity: 0,
              cloudCover: 0,
              windSpeed: 0,
              temperature: 25,
            },
          },
          {
            time: "2021-09-15T19:00:00Z",
            values: {
              rainIntensity: 0,
              cloudCover: 0,
              windSpeed: 0,
              temperature: 25,
            },
          },
        ],
      },
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

  }catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Issue with calling");
  }
};

export default getWeatherAndForecast;
