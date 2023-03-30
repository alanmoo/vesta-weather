export interface MessageResponse {
  id: string;
  text?: string | null;
  created: number;
}

export interface hourlyWeather {
  time: Date;
  degreesFarenheit: number;
  humidity: number;
  windMph: number;
  precipitation: number;
  cloudCover: number;
}

export interface WeatherKitHourlyForecast {
    forecastStart: Date,
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

export interface WeatherKitForecast {
  forecastHourly:{
    name: string,
    metadata: {
      attributionURL: string,
      expireTime: Date,
      latitude: number
      longitude: number,
      readTime: Date,
      reportedTime: Date,
      units: string,
      version: 1
    },
    hours: [WeatherKitHourlyForecast]
  }
}
