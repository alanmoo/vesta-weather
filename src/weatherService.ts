require('dotenv').config();
const https = require('https');

const fetchWeather = new Promise((resolve, reject) => {
  let hourlyData = {};
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
      hourlyData = body.hourly.data;
      resolve(hourlyData);
    });
  });

  weatherRequest.on('error', (error) => {
    reject(error);
  });

  weatherRequest.end();
});

export default fetchWeather;
