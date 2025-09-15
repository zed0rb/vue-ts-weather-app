import { ref } from 'vue';
import { useSavedQueries } from './useLocalStorage';
import type { SavedQuery, Forecast } from '../types';
import { fetchByCity, fetchByZip, fetchByCoords } from '../services/weather';
import type { UseToasts } from './useToasts';

export function useForecasts(toasts: UseToasts) {
  const { saved, add: addQuery, remove } = useSavedQueries();
  const forecasts = ref<Forecast[]>([]);
  const refreshing = ref(false);

  async function fetchOne(q: SavedQuery): Promise<Forecast> {
    if (q.type === 'city') return await fetchByCity(q.value as string);
    if (q.type === 'zip') return await fetchByZip(q.value as string);
    const v = q.value as { lat: number; lon: number };
    return await fetchByCoords(v.lat, v.lon);
  }

  async function loadAll() {
    try {
      const results = await Promise.allSettled(saved.value.map(fetchOne));
      forecasts.value = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => (r as PromiseFulfilledResult<Forecast>).value);
      toasts.push('Forecasts loaded', 'is-info');
    } catch {
      toasts.push('Failed to load forecasts', 'is-danger');
    }
  }

  async function refreshAll() {
    if (!saved.value.length) return;
    refreshing.value = true;
    try {
      await loadAll();
      toasts.push('Updated forecasts', 'is-info');
    } catch {
      toasts.push('Failed to update forecasts', 'is-danger');
    } finally {
      refreshing.value = false;
    }
  }

  async function addForecast(q: SavedQuery) {
    if (!addQuery(q)) {
      toasts.push('This forecast is already added', 'is-warning');
      return;
    }
    try {
      const f = await fetchOne(q);
      forecasts.value.push(f);
      toasts.push(`Added ${q.label}`, 'is-success');
    } catch {
      toasts.push(`Failed to add ${q.label}`, 'is-danger');
    }
  }

  function removeForecast(fid: number) {
    const idx = forecasts.value.findIndex((f) => f.id === fid);
    if (idx !== -1) {
      const q = saved.value[idx];
      forecasts.value.splice(idx, 1);
      if (q) remove(q.id);
      toasts.push('Removed forecast', 'is-warning');
    }
  }

  return { forecasts, refreshing, loadAll, refreshAll, addForecast, removeForecast };
}
