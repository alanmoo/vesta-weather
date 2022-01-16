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