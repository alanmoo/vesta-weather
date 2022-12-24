import fetchWeather from './weatherService';
import { hourlyWeather } from './types';

test('weatherService fetches data', async () => {
  const data: [hourlyWeather] = await fetchWeather();
  expect(data);
});

test('hourlyWeather is formatted to be useful', async () => {
  const data: [hourlyWeather] = await fetchWeather();
  console.log('Weather conditions fetched:', Object.keys(data[0]));
  expect(<hourlyWeather>data[0]);
});
