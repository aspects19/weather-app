async function getWeather(city) {
  const apiKey = '6mpZZtciBcgpL9V6E26ajnx9E23YpMsA'; 
  const autocompleteUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
  const currentConditionsUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';

  try {
    const placeIdResponse = await fetch(`${autocompleteUrl}?apikey=${apiKey}&q=${city}`, {
      method: 'GET',
    });

    if (!placeIdResponse.ok) {
      throw new Error(`HTTP error during autocomplete! Status: ${placeIdResponse.status}`);
    }

    const placeIdData = await placeIdResponse.json();

    if (placeIdData.length === 0) {
      throw new Error('No location found for the given city.');
    }

    const locationKey = placeIdData[0].Key;
    const localizedName = placeIdData[0].LocalizedName;
    const countryName = placeIdData[0].Country.LocalizedName;

    const weatherResponse = await fetch(`${currentConditionsUrl}${locationKey}?apikey=${apiKey}`, {
      method: 'GET',
    });

    if (!weatherResponse.ok) {
      throw new Error(`HTTP error during weather fetching! Status: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();
    
    const weatherText = weatherData[0].WeatherText;
    const precipitationType = weatherData[0].PrecipitationType;
    const temperature = weatherData[0].Temperature;

    const weatherInfo = {
      localizedName,
      countryName,
      weatherText,
      precipitationType,
      temperature,
    };

    return weatherInfo;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}


export default getWeather;