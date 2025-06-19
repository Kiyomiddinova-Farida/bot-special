import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeatherByCity(city: string): Promise<any> {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = 'https://api.weatherapi.com/v1/current.json';

    const res = await axios.get(url, {
      params: {
        key: apiKey,
        q: city,
        lang: 'uz'
      }
    });

    const data = res.data;
    return {
      temp: data.current.temp_c,
      humidity: data.current.humidity,
      pressure: data.current.pressure_mb,
      wind: data.current.wind_kph,
      description: data.current.condition.text,
    };
  }
}
