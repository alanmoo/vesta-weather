import axios, { AxiosRequestHeaders, Method } from 'axios';
import fetchWeather from './weatherService';
import formatForVestaboard from './formatForVestaboard';
import { hourlyWeather, MessageResponse } from './types';

require('dotenv').config();

let VestaboardKey;
if (process.env.VB_API_KEY) {
  VestaboardKey = process.env.VB_API_KEY;
} else {
  throw new Error('VB_API_KEY environment variable is not set');
}

let VestaboardSecret;
if (process.env.VB_API_SECRET) {
  VestaboardSecret = process.env.VB_API_SECRET;
} else {
  throw new Error('VB_API_SECRET environment variable is not set');
}

const headers:AxiosRequestHeaders = {
  'X-Vestaboard-Api-Key': VestaboardKey,
  'X-Vestaboard-Api-Secret': VestaboardSecret,
};

const postToVestaboard = async (postMessage: string|number[][]): Promise<MessageResponse> => {
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

export default postToVestaboard;
export { fetchWeather, formatForVestaboard, hourlyWeather };
