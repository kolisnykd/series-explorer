import { createContext } from 'react';
import type { TVmazeShow } from '../types/api/tvmaze';

type ShowsContextValue = {
  shows: TVmazeShow[];
};

export const ShowsContext = createContext<ShowsContextValue | null>(null);
