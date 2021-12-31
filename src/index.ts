require('dotenv').config()

import * as weather from './weather.json'
import axios, { AxiosRequestConfig, Method } from 'axios';

import {MessageResponse} from './types';

const headers = {
    'X-Vestaboard-Api-Key': process.env.VB_API_KEY,
    'X-Vestaboard-Api-Secret': process.env.VB_API_SECRET
  };

const fetchWeather = () => {
    return weather;
};

const parseWeather = (measurement: String, values:[Number]) => {
    // figure out what colors to return
    let res=''
    return res;
}

// const request =   async (endpoint = '', options: APIOptions): Promise<AxiosResponse> {
//     const url = this.baseUrl + endpoint;

//     const text = options.data;
//     const method = options.method;
//     const config: AxiosRequestConfig = { url, method, headers, data: text };

//     return axios(config);
//   }

const postMessage = async (postMessage:String):Promise<MessageResponse> => {
    // if (typeof postMessage === 'string') {
    //   if (containsInvalidCharacters(postMessage)) {
    //     throw new Error('Input contains one or more invalid characters.');
    //   }
    // }
    const url = `https://platform.vestaboard.com/subscriptions/${process.env.SUBSCRIPTION_ID}/message`;
    const data = Array.isArray(postMessage)
      ? JSON.stringify({ characters: postMessage })
      : JSON.stringify({ text: postMessage });

    const options = { url, method: 'POST' as Method, headers, data };
    const response = await axios(options);
    const { message } = response.data;
    return message as MessageResponse;
  }

postMessage(`Hello, world! It's ${Date().toString()}`);