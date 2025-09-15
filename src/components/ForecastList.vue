<template>
  <div>
    <p v-if="!forecasts.length" class="has-text-grey has-text-centered">
      No forecasts yet. Click <strong>Add Forecast</strong> to begin.
    </p>

    <div v-else>
      <div class="columns is-multiline">
        <div class="column is-12" v-for="f in paged" :key="f.id">
          <ForecastCard :forecast="f" @remove="$emit('remove', f.id)" />
        </div>
      </div>

      <nav class="pagination is-centered" v-if="pages > 1">
        <button class="pagination-previous" :disabled="page === 1" @click="page--">Prev</button>
        <button class="pagination-next" :disabled="page === pages" @click="page++">Next</button>
        <ul class="pagination-list">
          <li v-for="p in pages" :key="p">
            <a class="pagination-link" :class="{ 'is-current': p === page }" @click="page = p">{{
              p
            }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ForecastCard from './ForecastCard.vue';
import type { Forecast } from '../types';

const props = defineProps<{ forecasts: Forecast[]; pageSize: number }>();

const page = ref(1);
const pages = computed(() => Math.max(1, Math.ceil(props.forecasts.length / props.pageSize)));
const paged = computed(() =>
  props.forecasts.slice((page.value - 1) * props.pageSize, page.value * props.pageSize)
);

watch(
  () => props.forecasts.length,
  () => {
    if (page.value > pages.value) page.value = pages.value;
  }
);
</script>
