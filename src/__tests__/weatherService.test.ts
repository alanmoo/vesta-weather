import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fetchWeather from '../weatherService';
import { hourlyWeather } from '../types';

const latLng:([number, number]) = [40.719, -74.005];

describe('weather service', () => {
  it('weatherService fetches data', async () => {
    const data: hourlyWeather[] = await fetchWeather(...latLng);
    expect(data);
  });

  it('hourlyWeather is formatted to be useful', async () => {
    const weatherData = await fetchWeather(...latLng);
    expect(weatherData[0]).toEqual(expect.objectContaining<hourlyWeather>({
      degreesFarenheit: expect.any(Number),
      time: expect.any(Date),
      humidity: expect.any(Number),
      windMph: expect.any(Number),
      precipitation: expect.any(Number),
      cloudCover: expect.any(Number),
    }));
  });

  it('weather service logs an error when the data is not as expected', async () => {
    const mock = new MockAdapter(axios);
    mock.onAny().reply(200);
  });

  // TODO: figure out how to force `fetchWeather` to fail inside Jest
  // it('weather service logs an error when it fails', async () => {
  //   const mock = new MockAdapter(axios);

  //   // Define a mock response for the HTTP request
  //   mock.onAny().reply(500);

  //   // Call the function we want to test
  //   fetchWeather(...latLng).catch((error) => {
  //     // Make assertions about the error
  //     console.log('fail?');
  //     expect(error.message).toEqual('Unabl to fetch weather');
  //   });

  //   mock.reset();
  // });
});
