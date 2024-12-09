const getDescription = (weatherData) => {
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
        return "There's a heavy downpour";
    } else if (precipitationProbability > 50 && rainIntensity > 0.5) {
        return "Light showers";
    } else if (precipitationProbability > 50 && visibility < 5) {
        return "Visibility heavly impaired";
    } else if (precipitationProbability > 20 && visibility < 10) {
        return "Visibility slightly impaired";
    } else if (cloudCover > 80) {
        return isDay ? "Cloudy sunless day" : "Mostly cloudy night";
    } else if (cloudCover > 50) {
        return isDay ? "Partly sunny day" : "Partly clear night";
    } else if (precipitationProbability < 20 && cloudCover < 20) {
        return isDay ? "Sunny day" : "Clear night";
    } else if (precipitationProbability > 70 && rainIntensity < 0.5) {
        return "Light drizzle outside";
    } else if (precipitationProbability > 70 && rainIntensity === 0) {
        return "It's flurring";
    } else if (precipitationProbability > 50 && rainIntensity > 1) {
        return rainIntensity > 2 ? "Heavy snowing" : "It's snowing";
    } else if (precipitationProbability > 80 && rainIntensity === 3) {
        return "Careful, there's a thunderstorm";
    } else {
        return isDay ? "It's clear outside" : "Clear night";
    }
};

export default getDescription;