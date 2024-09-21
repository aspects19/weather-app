const getWeather= async (place) => {
  const apiKey = process.env.EXPO_PUBLIC_TOMORROW_API;
  
  const formatedLocation = place.replace(" ","_")
  const url = `https://api.tomorrow.io/v4/weather/realtime?location=${formatedLocation}&apikey=${apiKey}`;

  try {
    const WeatherRequestResponse = await fetch(url, {method: 'GET'});

    if(!WeatherRequestResponse.ok) {
      throw new Error("Failed to fetch weather data");
    };

    const weatherData = await WeatherRequestResponse.json();
    
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

    
    return weatherInfo;
    
  } catch (error) {
    throw error;
  }

}


export default getWeather;