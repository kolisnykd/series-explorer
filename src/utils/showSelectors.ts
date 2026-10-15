import type { TVmazeShow } from '../types/api/tvmaze';
import type { ShowFilterOptions, ShowSortOrder } from '../types/catalog';

function sortShows(
  shows: TVmazeShow[],
  sortOrder: ShowSortOrder,
): TVmazeShow[] {
  return shows.sort((a, b) => {
    switch (sortOrder) {
      case 'year-desc':
      case 'year-asc': {
        const aYear = a.premiered ?? '';
        const bYear = b.premiered ?? '';

        if (!aYear) return bYear ? 1 : 0;
        if (!bYear) return -1;

        return sortOrder === 'year-desc'
          ? bYear.localeCompare(aYear)
          : aYear.localeCompare(bYear);
      }

      case 'rating-desc': {
        const aRating = a.rating.average;
        const bRating = b.rating.average;

        if (aRating === null) return bRating === null ? 0 : 1;
        if (bRating === null) return -1;

        return bRating - aRating;
      }

      case 'rating-asc': {
        const aRating = a.rating.average;
        const bRating = b.rating.average;

        if (aRating === null) return bRating === null ? 0 : 1;
        if (bRating === null) return -1;

        return aRating - bRating;
      }
    }
  });
}

function filterAndSortShows(
  shows: TVmazeShow[],
  { genres = [], sortOrder = 'year-desc' }: ShowFilterOptions = {},
): TVmazeShow[] {
  const filteredShows = shows.filter(
    (show) =>
      genres.length === 0 ||
      genres.some((genre) => show.genres.includes(genre)),
  );

  return sortShows(filteredShows, sortOrder);
}

export function getCurrentlyAiring(
  shows: TVmazeShow[],
  options: ShowFilterOptions = {},
): TVmazeShow[] {
  return filterAndSortShows(
    shows.filter((show) => show.status === 'Running'),
    options,
  );
}

export function getTopRated(
  shows: TVmazeShow[],
  options: ShowFilterOptions = {},
): TVmazeShow[] {
  return filterAndSortShows(
    shows.filter((show) => show.rating.average !== null),
    {
      sortOrder: 'rating-desc',
      ...options,
    },
  );
}
