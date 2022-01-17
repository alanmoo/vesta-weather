import { hourlyWeather } from './types';

require('dotenv').config();
const https = require('https');

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

const fetchWeather = new Promise((resolve, reject) => {
    const hourlyData = {};
    const options = {
        hostname: 'api.darksky.net',
        port: 443,
        path: `/forecast/${process.env.DARK_SKY_KEY}/40.73061,-73.935242?exclude=%5Bminutely,currently,daily,alerts,flags%5D`,
        method: 'GET',
    };

    const weatherRequest = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk.toString();
        });

        response.on('end', async () => {
            const body = await JSON.parse(data);
            // Make sure we got a decent response from the API
            if (body.latitude) {
                resolve(darkSkyNormalization(body));
            } else {
                reject('Bad weather data');
            }
        });
    });

    weatherRequest.on('error', (error) => {
        reject(error);
    });

    weatherRequest.end();
});

export default fetchWeather;
