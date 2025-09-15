<template>
  <div class="box">
    <div class="is-flex is-align-items-center is-justify-content-space-between">
      <div class="is-flex is-align-items-center" style="gap: 0.75rem">
        <figure class="image is-64x64">
          <img :src="iconUrl(forecast.icon)" :alt="forecast.description" />
        </figure>
        <div>
          <h3 class="title is-5 mb-1">{{ forecast.city }}, {{ forecast.country }}</h3>
        </div>
      </div>
      <div class="has-text-right">
        <p class="title is-4">{{ forecast.tempC }}°C</p>
        <p class="is-size-7 has-text-grey">Updated {{ time(forecast.fetchedAt) }}</p>
      </div>
    </div>

    <div class="columns is-mobile mt-3">
      <div class="column is-half">
        <p><strong>Humidity:</strong> {{ forecast.humidity }}%</p>
        <p><strong>Wind:</strong> {{ forecast.windSpeed }} m/s</p>
        <p><strong>Pressure:</strong> {{ forecast.pressure }} hPa</p>
      </div>
      <div class="column is-half">
        <p><strong>Sunrise:</strong> {{ formatTime(forecast.sunrise) }}</p>
        <p><strong>Sunset:</strong> {{ formatTime(forecast.sunset) }}</p>
      </div>
    </div>

    <div class="is-flex is-justify-content-flex-end" style="gap: 0.5rem">
      <button class="button is-danger is-light" @click="$emit('remove')">
        <span class="icon"><i class="mdi mdi-delete"></i></span>
        <span>Remove</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Forecast } from '../types';

defineProps<{ forecast: Forecast }>();

// Use fetchedAt as milliseconds directly
function time(ms: number) {
  return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Convert sunrise/sunset (seconds) to readable time
function formatTime(ts: number) {
  return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function iconUrl(code: string) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}
</script>
