import axios, { Method } from 'axios';
import fetchWeather from './weatherService';
import formatForVestaboard from './formatForVestaboard';
import { hourlyWeather, MessageResponse } from './types';

require('dotenv').config();

const headers = {
  'X-Vestaboard-Api-Key': process.env.VB_API_KEY,
  'X-Vestaboard-Api-Secret': process.env.VB_API_SECRET,
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
