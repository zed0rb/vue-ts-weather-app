export type QueryType = 'city' | 'zip' | 'coords';

export interface SavedQuery {
  id: string; // stable id for localstorage
  type: QueryType;
  value: string | { lat: number; lon: number };
  label: string;
}

export interface Forecast {
  id: number;
  city: string;
  country: string;
  tempC: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  icon: string;
  description: string;
  fetchedAt: number;
}

export type ToastType = 'is-success' | 'is-danger' | 'is-warning' | 'is-info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  timeout?: number;
}
