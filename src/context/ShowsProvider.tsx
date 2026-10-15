import { useEffect } from 'react';
import { ShowsContext } from './ShowsContext';
import { useFetch } from '../hooks/useFetch';
import type { TVmazeShow } from '../types/api/tvmaze';

const START_PAGE = 300;
const TOTAL_PAGES = 8;
const API_URL = 'https://api.tvmaze.com/shows?page=';

type ShowsProviderProps = {
  children: React.ReactNode;
  onShowsLoaded: (count: number) => void;
};

export default function ShowsProvider({
  children,
  onShowsLoaded,
}: ShowsProviderProps) {
  const urls = Array.from(
    { length: TOTAL_PAGES },
    (_, index) => `${API_URL}${START_PAGE + index}`,
  );

  const pages = useFetch<TVmazeShow[]>(urls);
  const shows = pages.flat();

  useEffect(() => {
    onShowsLoaded(shows.length);
  }, [shows.length, onShowsLoaded]);

  return (
    <ShowsContext.Provider value={{ shows }}>{children}</ShowsContext.Provider>
  );
}
