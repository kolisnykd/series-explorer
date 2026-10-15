import { useSyncExternalStore } from 'react';

import {
  getWatchlist,
  subscribeToWatchlist,
  toggleWatchlist,
  handleWatchlistStorage,
} from '../utils/watchlistStorage';

import type { TVmazeShow } from '../types/api/tvmaze';

if (typeof window !== 'undefined') {
  window.addEventListener('storage', handleWatchlistStorage);
}

export function useWatchlist() {
  const shows = useSyncExternalStore(
    subscribeToWatchlist,
    getWatchlist,
    () => [],
  );

  function toggle(show: TVmazeShow): void {
    toggleWatchlist(show);
  }

  function isSaved(showId: number): boolean {
    return shows.some((show) => show.id === showId);
  }

  return {
    watchlist: shows,
    toggle,
    isSaved,
  };
}
