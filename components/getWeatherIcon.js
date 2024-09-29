import icons from "../constants/icons";

const getWeatherIcon = ({ temperature, rainIntensity, cloudCover }) => {
  if (rainIntensity > 0.5) {
    if (cloudCover > 0.8) {
      return icons.thundestorm; 
    }
    return icons.rain; 
  } else if (cloudCover > 0.5) {
    return icons.cloudySun; 
  } else if (temperature > 25 && rainIntensity === 0) {
    return icons.sunny; 
  } else if (temperature < 15 && rainIntensity === 0) {
    return icons.clearNight; 
  } else if (temperature > 20 && rainIntensity < 0.5) {
    return icons.rainySun; 
  }
  
  return icons.clearNight; 
};

export default getWeatherIcon;