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

const fetchWeather = () => new Promise((resolve, reject) => {
  const options = {
    url: `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/40.7318,-73.9891?exclude=%5Bminutely,currently,daily,alerts,flags%5D`,
    method: 'GET' as Method,
  };

  axios(options).then((response) => {
    const { data } = response;
    if (data.latitude) {
      resolve(darkSkyNormalization(data));
    } else {
      reject(new Error('Bad weather data'));
    }
  });
});
export default fetchWeather;
