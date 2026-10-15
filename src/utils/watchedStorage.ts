import type { TVmazeShow } from '../types/api/tvmaze';

const STORAGE_KEY = 'series-explorer-watched';

let watched: TVmazeShow[] = [];
let initialized = false;

const listeners = new Set<() => void>();

function initializeWatched(): void {
  if (initialized) return;

  initialized = true;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed: unknown = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        watched = parsed as TVmazeShow[];
      }
    }
  } catch {
    watched = [];
  }
}

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

function saveWatched(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watched));
  } catch (error) {
    console.error('Could not save watched series:', error);
    return;
  }

  notifyListeners();
}

export function getWatched(): TVmazeShow[] {
  initializeWatched();
  return watched;
}

export function subscribeToWatched(listener: () => void): () => void {
  initializeWatched();
  listeners.add(listener);

  return () => listeners.delete(listener);
}

export function isWatched(showId: number): boolean {
  return getWatched().some((show) => show.id === showId);
}

export function addWatched(show: TVmazeShow): void {
  initializeWatched();

  watched = [show, ...watched.filter((item) => item.id !== show.id)];

  saveWatched();
}

export function removeWatched(showId: number): void {
  initializeWatched();

  watched = watched.filter((show) => show.id !== showId);
  saveWatched();
}

export function handleWatchedStorage(event: StorageEvent): void {
  if (event.key !== STORAGE_KEY && event.key !== null) return;

  initialized = false;
  initializeWatched();
  notifyListeners();
}
