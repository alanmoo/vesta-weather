import axios, { Method } from 'axios';
import fetchWeather from './weatherService';
import { MessageResponse } from './types';

require('dotenv').config();

const http = require('http');

const headers = {
  'X-Vestaboard-Api-Key': process.env.VB_API_KEY,
  'X-Vestaboard-Api-Secret': process.env.VB_API_SECRET,
};

const postToVestaboard = async (postMessage: String): Promise<MessageResponse> => {
  // if (typeof postMessage === 'string') {
  //   if (containsInvalidCharacters(postMessage)) {
  //     throw new Error('Input contains one or more invalid characters.');
  //   }
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

const host = 'localhost';
const port = 8000;

const requestListener = (req, res) => {
  res.writeHead(200);
  const message = `Hello, world! It's ${Date().toString()}`;
  fetchWeather.then((data) => console.log(data));
  postToVestaboard(message);
  res.end(message);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
