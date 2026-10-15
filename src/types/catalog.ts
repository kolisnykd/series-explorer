export type ShowSortOrder =
  | 'year-desc'
  | 'year-asc'
  | 'rating-desc'
  | 'rating-asc';

export interface ShowFilterOptions {
  genres?: string[];
  sortOrder?: ShowSortOrder;
}
