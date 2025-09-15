import { ref, watch } from 'vue';
import type { SavedQuery } from '../types';

const KEY = 'weather.savedQueries.v1';

export function useSavedQueries() {
  const saved = ref<SavedQuery[]>([]);

  try {
    const raw = localStorage.getItem(KEY);
    if (raw) saved.value = JSON.parse(raw);
  } catch (e: any) {
    console.warn('Failed to read saved queries from localStorage', e);
  }

  watch(
    saved,
    (val) => {
      try {
        localStorage.setItem(KEY, JSON.stringify(val));
      } catch (e: any) {
        console.warn('Failed to persist saved queries to localStorage', e);
      }
    },
    { deep: true }
  );

  function normalizeId(id: string) {
    return id.trim().toLowerCase();
  }

  function add(q: SavedQuery) {
    const id = normalizeId(q.id);
    if (saved.value.find((s) => normalizeId(s.id) === id)) return false;
    saved.value.unshift(q);
    return true;
  }

  function remove(id: string) {
    saved.value = saved.value.filter((s) => normalizeId(s.id) !== normalizeId(id));
  }

  return { saved, add, remove };
}
