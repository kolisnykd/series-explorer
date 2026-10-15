import type { TVmazeShow } from '../types/api/tvmaze';

const STORAGE_KEY = 'series-explorer-watchlist';

let watchlist: TVmazeShow[] = [];
let initialized = false;

const listeners = new Set<() => void>();

function initializeWatchlist(): void {
  if (initialized) return;

  initialized = true;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed: unknown = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        watchlist = parsed as TVmazeShow[];
      }
    }
  } catch {
    watchlist = [];
  }
}

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

function saveWatchlist(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  } catch (error) {
    console.error('Could not save watchlist:', error);
    return;
  }

  notifyListeners();
}

export function getWatchlist(): TVmazeShow[] {
  initializeWatchlist();
  return watchlist;
}

export function subscribeToWatchlist(listener: () => void): () => void {
  initializeWatchlist();
  listeners.add(listener);

  return () => listeners.delete(listener);
}

export function isInWatchlist(showId: number): boolean {
  return getWatchlist().some((show) => show.id === showId);
}

export function toggleWatchlist(show: TVmazeShow): void {
  initializeWatchlist();

  const exists = watchlist.some((item) => item.id === show.id);

  watchlist = exists
    ? watchlist.filter((item) => item.id !== show.id)
    : [...watchlist, show];

  saveWatchlist();
}

export function handleWatchlistStorage(event: StorageEvent): void {
  if (event.key !== STORAGE_KEY && event.key !== null) return;

  initialized = false;
  initializeWatchlist();
  notifyListeners();
}
