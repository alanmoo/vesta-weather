import { hourlyWeather } from './types';
import { characterCode } from './vestaValues';

const vestaWidth = 22;
const colors = ['⬛', '🟪', '🟦', '🟩', '🟨', '🟧', '🟥', '⬜'];

function measurementToColors(data: number[], measurement: string) {
  let min;
  let max;
  let indicator;
  switch (measurement) {
    case 'temperature':
      min = 15;
      max = 95;
      indicator = '°';
      break;
    case 'humidity':
      min = 0.1;
      max = 0.9;
      indicator = 'H';
      break;
    case 'precipitation':
      min = 0;
      max = 0.8;
      indicator = 'P';
      break;
    case 'wind':
      min = 5;
      max = 25;
      indicator = 'W';
      break;
    default:
      throw (new Error('Unknown measurement'));
  }
  const range = (max - min) / (colors.length - 2);
  const coloredData = data.map((hour) => {
    if (hour < min) {
      return colors[0];
    } if (hour > max) {
      return colors[colors.length];
    }
    return colors[Math.floor((hour - min) / range)];
  });
  coloredData.unshift(indicator);
  return coloredData;
}

export const rowStringToData = (rowString) => {
  // ToDo: check for the length of this and handle situations where there's empty space
  const rowData = [];
  [...rowString].forEach((item, index) => {
    rowData[index] = characterCode[item];
  });
  return rowData;
};

const formatForVestaboard = (hourlyData: [hourlyWeather]) => {
  const row1 = rowStringToData('NYC Weather           '.split(''));
  const row6 = rowStringToData('                      '.split(''));
  const temperature: number[] = []; const humidity = []; const wind = []; const
    precipitation = [];
  for (let i = 0; i < vestaWidth - 1; i += 1) {
    temperature.push(hourlyData[i].temperature);
    humidity.push(hourlyData[i].humidity);
    wind.push(hourlyData[i].windSpeed);
    precipitation.push(hourlyData[i].precipitation);
  }
  const tempRowStrings = measurementToColors(temperature, 'temperature');
  const humidityRowStrings = measurementToColors(humidity, 'humidity');
  const windRowStrings = measurementToColors(wind, 'wind');
  const precipRowStrings = measurementToColors(precipitation, 'precipitation');

  const tempRowData = rowStringToData(tempRowStrings);
  const humidityRowData = rowStringToData(humidityRowStrings);
  const windRowData = rowStringToData(windRowStrings);
  const precipRowData = rowStringToData(precipRowStrings);

  return [row1, tempRowData, humidityRowData, windRowData, precipRowData, row6];
};

export default formatForVestaboard;
