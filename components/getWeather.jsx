import getWeatherIcon from "./getWeatherIcon";
import icons from "../constants/icons";
import getDescription from './getDescription';

const getWeatherAndForecast = async (place) => {
  // const apiKey = process.env.EXPO_PUBLIC_TOMORROW_API
  // const formattedLocation = place.trim().replace(" ", "_");

  // const weatherUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${formattedLocation}&apikey=${apiKey}`;
  // const forecastUrl =`https://api.tomorrow.io/v4/weather/forecast?location=${formattedLocation}&apikey=${apiKey}`;
    
  // const formatTimeToEAT = (utcTime) => {
  //   const date = new Date(utcTime);
  //   date.setHours(date.getHours()); 
  //   return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  // };
  
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
        icon: getWeatherIcon(weatherData),
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

    // const mapForecastToIcon = (forecastData) => {
    //   const { rainIntensity, cloudCover } = forecastData;
    
    //   if (rainIntensity > 0) {
    //     return icons.drizzle;
    //   } else if (cloudCover > 50) {
    //     return icons.cloudy; 
    //   } else {
    //     return icons.clearday; 
    //   }
    // };
    
    const hourlyForecasts = [
      {
        time: "Now",
        temperature: 43,
        rainIntensity: 40,
        cloudCover: 44,
        windSpeed: 77,
        icon: icons.clearday,
      },
      {
        time: "8.00",
        temperature: 30,
        rainIntensity: 40,
        cloudCover: 44,
        windSpeed: 77,
        icon: icons.clearday,
      },
      {
        time: "9.00",
        temperature: 3,
        rainIntensity: 40,
        cloudCover: 44,
        windSpeed: 77,
        icon: icons.clearday,
      },
      {
        time: "10.00",
        temperature: 20,
        rainIntensity: 40,
        cloudCover: 44,
        windSpeed: 77,
        icon: icons.clearday,
      },
      {
        time: "11.00",
        temperature: 80,
        rainIntensity: 40,
        cloudCover: 44,
        windSpeed: 77,
        icon: icons.clearday,
      },
    ];
    
    // for (let i = 0; i < 8; i++) {
    //   const hourlyData = forecastData.timelines.hourly[i];
    //   const forecast = {
    //     time: i === 0 ? "Now" : formatTimeToEAT(hourlyData.time),
    //     rainIntensity: hourlyData.values.rainIntensity,
    //     cloudCover: hourlyData.values.cloudCover,
    //     windSpeed: hourlyData.values.windSpeed,
    //     icon: mapForecastToIcon(hourlyData.values),
    //   };
      
      
    //   hourlyForecasts.push(forecast);
    // }
    
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
