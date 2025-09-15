<template>
  <div class="level">
    <div class="level-left">
      <h1 class="title">Weather Dashboard</h1>
    </div>
    <div class="level-right">
      <div class="field has-addons">
        <div class="control is-expanded">
          <input class="input" :value="filter" @input="onInput" placeholder="Search forecasts" />
        </div>
        <div class="control">
          <button class="button" @click="emit('refresh')">
            <span class="icon">
              <i :class="['mdi', refreshing ? 'mdi-loading mdi-spin' : 'mdi-refresh']"></i>
            </span>
          </button>
        </div>
        <div class="control">
          <button class="button is-info" @click="emit('add')">
            <span class="icon"><i class="mdi mdi-plus"></i></span>
            <span>Add Forecast</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ filter: string; refreshing: boolean }>();
const emit = defineEmits<{
  (e: 'update:filter', value: string): void;
  (e: 'refresh'): void;
  (e: 'add'): void;
}>();

function onInput(e: Event) {
  emit('update:filter', (e.target as HTMLInputElement).value);
}
</script>
