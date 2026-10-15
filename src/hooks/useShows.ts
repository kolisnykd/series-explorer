import { useContext } from 'react';
import { ShowsContext } from '../context/ShowsContext';

export function useShows() {
  const context = useContext(ShowsContext);

  if (context === null) {
    throw new Error('useShows must be used within ShowsProvider');
  }

  return context;
}
