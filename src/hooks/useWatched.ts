import { useEffect, useSyncExternalStore } from 'react';
import {
  addWatched,
  getWatched,
  handleWatchedStorage,
  isWatched,
  removeWatched,
  subscribeToWatched,
} from '../utils/watchedStorage';

export function useWatched() {
  const watchedShows = useSyncExternalStore(
    subscribeToWatched,
    getWatched,
    () => [],
  );

  useEffect(() => {
    window.addEventListener('storage', handleWatchedStorage);

    return () => {
      window.removeEventListener('storage', handleWatchedStorage);
    };
  }, []);

  return {
    watchedShows,
    addToWatched: addWatched,
    removeFromWatched: removeWatched,
    isShowWatched: isWatched,
  };
}
