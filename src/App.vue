<template>
  <section class="section">
    <div class="container">
      <HeaderBar
        :filter="filter"
        :refreshing="refreshing"
        @update:filter="filter = $event"
        @add="openAdd = true"
        @refresh="refreshAll"
      />

      <ForecastList :forecasts="filtered" :page-size="PAGE_SIZE" @remove="removeForecast" />
    </div>

    <AddForecastModal v-model="openAdd" @added="addForecast" />

    <ToastStack :toasts="toasts.state.toasts" @remove="toasts.remove" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import HeaderBar from './components/HeaderBar.vue';
import ForecastList from './components/ForecastList.vue';
import AddForecastModal from './components/AddForecastModal.vue';
import ToastStack from './components/ToastStack.vue';
import { useForecasts } from './composables/useForecasts';
import { useToasts } from './composables/useToasts';

const PAGE_SIZE = 10;
const REFRESH_MS = 5 * 60 * 1000;

const openAdd = ref(false);
const filter = ref('');
const toasts = useToasts();

const { forecasts, addForecast, removeForecast, refreshAll, loadAll, refreshing } =
  useForecasts(toasts);

const filtered = computed(() => {
  const term = filter.value.toLowerCase();
  if (!term) return forecasts.value;
  return forecasts.value.filter((f) => `${f.city} ${f.country}`.toLowerCase().includes(term));
});

onMounted(() => {
  loadAll();
  setInterval(refreshAll, REFRESH_MS);
});
</script>
