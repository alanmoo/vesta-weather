export interface MessageResponse {
  id: string;
  text?: string | null;
  created: number;
}

export interface hourlyWeather {
  time: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface WeatherKitHourlyForecast {
    forecastStart: string,
    cloudCover: number,
    conditionCode: string,
    daylight: boolean,
    humidity: number,
    precipitationAmount: number,
    precipitationIntensity: number,
    precipitationChance: number,
    precipitationType: string,
    pressure: number,
    pressureTrend: string,
    snowfallIntensity: number,
    snowfallAmount: number,
    temperature: number,
    temperatureApparent: number,
    temperatureDewPoint: number,
    uvIndex: number,
    visibility: number,
    windDirection: number,
    windGust: number,
    windSpeed: number
}
