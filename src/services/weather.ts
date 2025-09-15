import axios from 'axios';
import type { Forecast } from '../types';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
});

function toForecast(d: any): Forecast {
  return {
    id: d.id,
    city: d.name,
    country: d.sys?.country,
    tempC: Math.round((d.main?.temp - 273.15) * 10) / 10,
    humidity: d.main?.humidity,
    windSpeed: d.wind?.speed,
    pressure: d.main?.pressure,
    sunrise: d.sys?.sunrise,
    sunset: d.sys?.sunset,
    icon: d.weather?.[0]?.icon,
    description: d.weather?.[0]?.description,
    fetchedAt: Date.now(),
  };
}

export async function fetchByCity(city: string): Promise<Forecast> {
  const { data } = await api.get('/weather', {
    params: { q: city, appid: import.meta.env.VITE_OWM_API_KEY },
  });
  return toForecast(data);
}

export async function fetchByZip(zip: string): Promise<Forecast> {
  const { data } = await api.get('/weather', {
    params: { zip, appid: import.meta.env.VITE_OWM_API_KEY },
  });
  return toForecast(data);
}

export async function fetchByCoords(lat: number, lon: number): Promise<Forecast> {
  const { data } = await api.get('/weather', {
    params: { lat, lon, appid: import.meta.env.VITE_OWM_API_KEY },
  });
  return toForecast(data);
}
