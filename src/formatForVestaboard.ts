import { hourlyWeather } from './types';
import { characterCode } from './vestaValues';

const vestaWidth = 22;
const colors = ['⬛', '🟪', '🟦', '🟩', '🟨', '🟧', '🟥', '⬜'];

function measurementToColors(data: number[], measurement: string) {
  let min:number;
  let max:number;
  let indicator;
  switch (measurement) {
    case 'temperature':
      min = 20;
      max = 90;
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
      min = 4;
      max = 25;
      indicator = 'W';
      break;
    case 'cloudCover':
      min = 0.1;
      max = 0.9;
      indicator = 'C';
      break;
    default:
      throw (new Error('Unknown measurement'));
  }
  const range = (max - min) / (colors.length - 2);
  const coloredData = data.map((hour) => {
    if (hour < min) {
      return colors[0];
    } if (hour > max) {
      return colors[colors.length - 1];
    }
    return colors[Math.ceil((hour - min) / range)];
  });
  coloredData.unshift(indicator);
  return coloredData;
}

export const rowStringToData = (rowString:string[]) => {
  // ToDo: check for the length of this and handle situations where there's empty space
  const rowData:number[] = [];
  [...rowString].forEach((item, index) => {
    rowData[index] = characterCode[item];
  });
  return rowData;
};

export const generateTimeRow = () => {
  const now = new Date();
  const options = { timeZone: 'America/New_York', hour: '2-digit' as '2-digit', hourCycle: 'h24' as 'h24' };
  let thisHour = parseInt(Intl.DateTimeFormat('en-US', options).format(now), 10);
  const row = Array(22).fill(' ');
  // I think doing this with a loop is clearer than other approaches, and it's only 22 loops.
  for (let i = 1; i < 21; i += 1) {
    if (thisHour === 0 || thisHour === 24) { row[i] = 'm'; } else if (thisHour === 12 || thisHour === 36) { row[i] = 'n'; }
    thisHour += 1;
  }
  return row;
};

const formatForVestaboard = (hourlyData: hourlyWeather[]) => {
  // const row1 = rowStringToData('NYC Weather           '.split(''));
  const timeRow = rowStringToData(generateTimeRow());
  const temperature: number[] = []; const humidity = []; const wind = []; const
    precipitation = []; const cloudCover = [];
  for (let i = 0; i < vestaWidth - 1; i += 1) {
    temperature.push(hourlyData[i].degreesFarenheit);
    humidity.push(hourlyData[i].humidity);
    wind.push(hourlyData[i].windMph);
    precipitation.push(hourlyData[i].precipitation);
    cloudCover.push(hourlyData[i].cloudCover);
  }
  const tempRowStrings = measurementToColors(temperature, 'temperature');
  const humidityRowStrings = measurementToColors(humidity, 'humidity');
  const windRowStrings = measurementToColors(wind, 'wind');
  const precipRowStrings = measurementToColors(precipitation, 'precipitation');
  const cloudRowStrings = measurementToColors(cloudCover, 'cloudCover');

  const tempRowData = rowStringToData(tempRowStrings);
  const humidityRowData = rowStringToData(humidityRowStrings);
  const windRowData = rowStringToData(windRowStrings);
  const precipRowData = rowStringToData(precipRowStrings);
  const cloudRowData = rowStringToData(cloudRowStrings);

  const res = [tempRowData, humidityRowData, windRowData, precipRowData, cloudRowData, timeRow];
  return res;
};

export default formatForVestaboard;
