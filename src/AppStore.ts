import { useSyncExternalStore } from 'react';

import { NumbersApp } from "./package/app"

export const numbersApp = new NumbersApp();

const subscribers = new Set<() => void>();

let snapshot: { isInitialized: boolean, isPaused: boolean } = { isInitialized: false, isPaused: numbersApp.isPaused() };

numbersApp.subscribe((ev) => {
  switch (ev.type) {
    case 'start':
      snapshot = { ...snapshot, isInitialized: true, isPaused: numbersApp.isPaused() };
      subscribers.forEach(sub => sub());
      return;
    case 'pause':
      snapshot = { ...snapshot, isPaused: numbersApp.isPaused() };
      subscribers.forEach(sub => sub());
      return;
    case 'resume':
      snapshot = { ...snapshot, isPaused: numbersApp.isPaused() };
      subscribers.forEach(sub => sub());
      return;
  }
});

const numbersAppStore = {
  subscribe(subscriber: () => void): () => void {
    subscribers.add(subscriber);
    return () => subscribers.delete(subscriber);
  },

  getSnapshot() {
    return snapshot;
  },
}

export function useNumbersAppStore() {
  return useSyncExternalStore(
    (cb) => numbersAppStore.subscribe(cb),
    () => numbersAppStore.getSnapshot()
  );
}
