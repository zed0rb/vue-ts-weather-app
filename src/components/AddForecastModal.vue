<template>
  <div class="modal" :class="{ 'is-active': modelValue }" aria-modal="true" role="dialog">
    <div class="modal-background" @click="close"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Forecast</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field is-grouped is-grouped-multiline">
          <div class="control">
            <div class="buttons has-addons">
              <button
                class="button"
                :class="{ 'is-info is-selected': mode === 'city' }"
                @click="mode = 'city'"
              >
                City
              </button>
              <button
                class="button"
                :class="{ 'is-info is-selected': mode === 'zip' }"
                @click="mode = 'zip'"
              >
                ZIP
              </button>
              <button
                class="button"
                :class="{ 'is-info is-selected': mode === 'coords' }"
                @click="mode = 'coords'"
              >
                Coords
              </button>
            </div>
          </div>
        </div>

        <div v-if="mode === 'city'" class="field">
          <label class="label">City</label>
          <div class="control">
            <input
              class="input"
              v-model.trim="city"
              placeholder="e.g. London"
              @keyup.enter="search"
            />
          </div>
        </div>

        <div v-else-if="mode === 'zip'" class="field">
          <label class="label">ZIP (optionally with country, e.g. 94040,US)</label>
          <div class="control">
            <input
              class="input"
              v-model.trim="zip"
              placeholder="e.g. 94040,US"
              @keyup.enter="search"
            />
          </div>
        </div>

        <div v-else class="fields">
          <div class="field">
            <label class="label">Latitude</label>
            <div class="control">
              <input
                class="input"
                v-model.number="lat"
                type="number"
                step="0.0001"
                placeholder="e.g. 51.5072"
                @keyup.enter="search"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Longitude</label>
            <div class="control">
              <input
                class="input"
                v-model.number="lon"
                type="number"
                step="0.0001"
                placeholder="e.g. -0.1276"
                @keyup.enter="search"
              />
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-info" :class="{ 'is-loading': loading }" @click="search">
              Search
            </button>
          </div>
        </div>

        <article v-if="result" class="message is-link">
          <div class="message-header">
            <p>{{ result.city }}, {{ result.country }}</p>
          </div>
          <div class="message-body">
            <div class="is-flex is-align-items-center is-justify-content-space-between">
              <div>
                <p class="mb-1">
                  <strong>{{ result.tempC }}°C</strong> – {{ result.description }}
                </p>
                <p class="is-size-7">
                  Humidity {{ result.humidity }}% · Wind {{ result.windSpeed }} m/s
                </p>
              </div>
              <figure class="image is-64x64">
                <img :src="iconUrl(result.icon)" :alt="result.description" />
              </figure>
            </div>
          </div>
        </article>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="close">Cancel</button>
        <button class="button is-success" :disabled="!result" @click="add">Add</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { fetchByCity, fetchByZip, fetchByCoords } from '../services/weather';
import type { Forecast, SavedQuery } from '../types';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
  (e: 'added', q: SavedQuery): void;
}>();

const mode = ref<'city' | 'zip' | 'coords'>('city');
const city = ref('');
const zip = ref('');
const lat = ref<number | null>(null);
const lon = ref<number | null>(null);

const loading = ref(false);
const result = ref<Forecast | null>(null);

watch(
  () => props.modelValue,
  (open) => {
    if (open) clear();
  }
);

function clear() {
  mode.value = 'city';
  city.value = '';
  zip.value = '';
  lat.value = null;
  lon.value = null;
  result.value = null;
  loading.value = false;
}

function close() {
  emit('update:modelValue', false);
}

function iconUrl(code: string) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

import { useToasts } from '../composables/useToasts';
const toasts = useToasts();

async function search() {
  loading.value = true;
  result.value = null;
  try {
    if (mode.value === 'city' && city.value) result.value = await fetchByCity(city.value);
    else if (mode.value === 'zip' && zip.value) result.value = await fetchByZip(zip.value);
    else if (mode.value === 'coords' && lat.value != null && lon.value != null)
      result.value = await fetchByCoords(lat.value, lon.value);
  } catch (e: any) {
    toasts.push(`Error: ${e?.response?.data?.message || e.message}`, 'is-danger');
  } finally {
    loading.value = false;
  }
}

function add() {
  if (!result.value) return;
  const q: SavedQuery = {
    id: `${mode.value}:${mode.value === 'coords' ? lat!.value + ',' + lon!.value : mode.value === 'city' ? city.value : zip.value}`,
    type: mode.value,
    value:
      mode.value === 'coords'
        ? { lat: lat!.value!, lon: lon!.value! }
        : mode.value === 'city'
          ? city.value
          : zip.value,
    label: `${result.value.city}, ${result.value.country}`,
  };
  emit('added', q);
  close();
}
</script>
