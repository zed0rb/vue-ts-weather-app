import { reactive } from 'vue';
import type { Toast, ToastType } from '../types';

const state = reactive<{ toasts: Toast[] }>({ toasts: [] });
let counter = 1;

export function useToasts() {
  function push(message: string, type: ToastType = 'is-info', timeout = 3500) {
    const id = counter++;
    state.toasts.push({ id, message, type, timeout });
    if (timeout > 0) setTimeout(() => remove(id), timeout);
  }

  function remove(id: number) {
    state.toasts = state.toasts.filter((t) => t.id !== id);
  }

  return { state, push, remove };
}

export type UseToasts = ReturnType<typeof useToasts>;
