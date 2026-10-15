import type { TVmazeShow } from '../types/api/tvmaze';
import type { FeaturedShow } from '../types/shows';

function cleanDescription(summary: string | null): string {
  return (summary ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .trim();
}

function formatShow(show: TVmazeShow): FeaturedShow {
  return {
    id: show.id,
    title: show.name,
    year: Number(show.premiered!.slice(0, 4)),
    genres: show.genres,
    rating: show.rating.average ?? 0,
    description: cleanDescription(show.summary),
    image: show.image!.original,
  };
}

export function getFeaturedShows(shows: TVmazeShow[]): FeaturedShow[] {
  return shows
    .filter((show) => show.image && show.rating.average !== null)
    .sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
    .slice(0, 5)
    .map(formatShow);
}
