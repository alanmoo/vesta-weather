import axios, { Method } from 'axios';
import { hourlyWeather, WeatherKitHourlyForecast } from './types';

require('dotenv').config();

const weatherKitNormalization = (data:any) => {
  const hourlyData = data.forecastHourly.hours;
  const normalized: [hourlyWeather] = hourlyData.map((hour:WeatherKitHourlyForecast) => ({
    time: hour.forecastStart,
    temperature: hour.temperature * (9 / 5) + 32,
    humidity: hour.humidity,
    windSpeed: hour.windSpeed * 0.62137,
    precipitation: hour.precipitationChance,
  }));
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
    if (data) {
      resolve(weatherKitNormalization(data));
    } else {
      reject(new Error('Unable to fetch weather'));
    }
  });
});
export default fetchWeather;
