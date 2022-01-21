import axios, { Method } from 'axios';
import fetchWeather from './weatherService';
import formatForVestaboard from './formatForVestaboard';
// import { Vesta } from 'vestaboard-api';
import { hourlyWeather, MessageResponse } from './types';

require('dotenv').config();

const http = require('http');

const headers = {
  'X-Vestaboard-Api-Key': process.env.VB_API_KEY,
  'X-Vestaboard-Api-Secret': process.env.VB_API_SECRET,
};
const host = 'localhost';
const port = 8000;

const postToVestaboard = async (postMessage: string|number[][]): Promise<MessageResponse> => {
  // if (typeof postMessage === 'object') {
  // console.log('array!');
  // if (containsInvalidCharacters(postMessage)) {
  //   throw new Error('Input contains one or more invalid characters.');
  // }
  // }
  const url = `https://platform.vestaboard.com/subscriptions/${process.env.SUBSCRIPTION_ID}/message`;
  const data = Array.isArray(postMessage)
    ? JSON.stringify({ characters: postMessage })
    : JSON.stringify({ text: postMessage });
  const options = {
    url, method: 'POST' as Method, headers, data,
  };
  const response = await axios(options);
  const { message } = response.data;
  return message as MessageResponse;
};

const requestListener = (req, res) => {
  res.writeHead(200);
  let message;
  fetchWeather().then(
    (data:[hourlyWeather]) => {
      message = formatForVestaboard(data);
      postToVestaboard(message);
    },
  ).catch(
    (error) => { console.error(error); },
  );
  res.end('Push it baby');
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

export default postToVestaboard;
