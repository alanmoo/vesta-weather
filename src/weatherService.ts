import axios, { Method } from 'axios';
import { hourlyWeather, WeatherKitForecast, WeatherKitHourlyForecast } from './types';

require('dotenv').config();

// Convert measurements into units that my brain works with
export const weatherKitNormalization = (data:WeatherKitForecast):hourlyWeather[] => {
  const hourlyData = data.forecastHourly.hours;
  const normalized = hourlyData.map((hour:WeatherKitHourlyForecast) => ({
    time: new Date(hour.forecastStart),
    degreesFarenheit: hour.temperature * (9 / 5) + 32,
    humidity: hour.humidity,
    windMph: hour.windSpeed * 0.62137,
    precipitation: hour.precipitationChance,
    cloudCover: hour.cloudCover,
  }));
  return normalized;
};

const fetchWeather = (lat:number, lng:number) => new Promise<hourlyWeather[]>((resolve, reject) => {
  const options = {
    url: `https://weatherkit.apple.com/api/v1/weather/en_US/${lat}/${lng}?dataSets=forecastHourly`,
    method: 'GET' as Method,
    headers: { Authorization: `Bearer ${process.env.WEATHERKIT_TOKEN}` },
  };

  axios(options).then((response) => {
    const { data }: { data: WeatherKitForecast } = response;
    if ('forecastHourly' in data) {
      resolve(weatherKitNormalization(data));
    } else {
      reject(new Error('Something went wrong'));
    }
  }).catch(() => { console.error('Unable to fetch weather'); });
});

export default fetchWeather;
