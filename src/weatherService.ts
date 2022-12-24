import axios, { Method } from 'axios';
import { hourlyWeather } from './types';

require('dotenv').config();

const darkSkyNormalization = (data) => {
  const hourlyData = data.hourly.data;
  const normalized: [hourlyWeather] = hourlyData.map((hour) => ({
    time: hour.time,
    temperature: hour.temperature,
    humidity: hour.humidity,
    windSpeed: hour.windSpeed,
    precipitation: hour.precipProbability,
  }));
  return normalized;
};

const weatherKitNormalization = (data) => {
  const hourlyData = data.forecastHourly.hours;
  console.log('Hourly data', hourlyData);
  const normalized: [hourlyWeather] = hourlyData.map((hour) => ({
    time: hour.forecastStart,
    temperature: hour.temperature,
    humidity: hour.humidity,
    windSpeed: hour.windSpeed,
    precipitation: hour.precipitationChance,
  }));
  console.log('normalized: ', normalized);
  return normalized;
};

const fetchWeather = () => new Promise<[hourlyWeather]>((resolve, reject) => {
  const options = {
    url: 'https://weatherkit.apple.com/api/v1/weather/en_US/40.719/-74.005?dataSets=forecastHourly',
    method: 'GET' as Method,
    headers: { Authorization: `Bearer ${process.env.WEATHERKIT_TOKEN}` },
  };

  axios(options).then((response) => {
    const { data } = response;
    console.log('data is', data);
    if (data) {
      resolve(weatherKitNormalization(data));
    } else {
      reject(new Error('Unable to fetch weather'));
    }
  });
});
export default fetchWeather;
