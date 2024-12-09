import icons from "../constants/icons";

const getWeatherIcon = (weatherData) => {
  const {
    cloudCover,
    precipitationProbability,
    rainIntensity,
    visibility,
  } = weatherData.data.values;

  const utcTime = new Date(weatherData.time);
  const eatTime = new Date(utcTime.getTime() + 3 * 60 * 60 * 1000); 

  const hours = eatTime.getHours();
  const isDay = hours >= 6 && hours <= 18;

  if (precipitationProbability > 80 && rainIntensity > 2) {
    return icons.heavyrain;
  } else if (precipitationProbability > 50 && rainIntensity > 0.5) {
    return icons.lightrain;
  } else if (precipitationProbability > 50 && visibility < 5) {
    return icons.fog;
  } else if (precipitationProbability > 20 && visibility < 10) {
    return icons.lightfog;
  } else if (cloudCover > 80) {
    return isDay ? icons.cloudy : icons.mostlycloudynight;
  } else if (cloudCover > 50) {
    return isDay ? icons.partlycloudyday : icons.partlycloudynight;
  } else if (precipitationProbability < 20 && cloudCover < 20) {
    return isDay ? icons.clearday : icons.clearnight;
  } else if (precipitationProbability > 70 && rainIntensity < 0.5) {
    return icons.drizzle;
  } else if (precipitationProbability > 70 && rainIntensity === 0) {
    return icons.flurries;
  } else if (precipitationProbability > 50 && rainIntensity > 1) {
    return rainIntensity > 2 ? icons.heavysnow : icons.snow;
  } else if (precipitationProbability > 80) {
    return icons.thunderstorm;
  } else {
    return isDay ? icons.mostlyclearday : icons.mostlyclearnight;
  }
};

export default getWeatherIcon;