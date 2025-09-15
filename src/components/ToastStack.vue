<template>
  <div class="toast-stack">
    <div v-for="t in toasts" :key="t.id" class="notification" :class="t.type">
      <button class="delete" @click="$emit('remove', t.id)"></button>
      {{ t.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Toast } from '../types';

defineProps<{ toasts: Toast[] }>();
</script>
