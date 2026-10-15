import { useFetch } from '../../../hooks/useFetch';
import type { TVmazeEpisode, TVmazeSeason } from '../../../types/api/tvmaze';
import { formatDate } from '../../../utils/formatDate';

interface ShowSeasonsProps {
  showId: number;
}

export default function ShowSeasons({ showId }: ShowSeasonsProps) {
  const [seasons] = useFetch<TVmazeSeason[]>([
    `https://api.tvmaze.com/shows/${showId}/seasons`,
  ]);

  const [episodes] = useFetch<TVmazeEpisode[]>([
    `https://api.tvmaze.com/shows/${showId}/episodes`,
  ]);

  const visibleSeasons = seasons
    .map((season) => {
      const seasonEpisodes = episodes.filter(
        (episode) => episode.season === season.number,
      );

      return {
        ...season,
        episodeCount: seasonEpisodes.length,
        premiere: formatDate(season.premiereDate),
        finale: formatDate(season.endDate),
      };
    })
    .filter((season) => season.episodeCount > 0);

  if (visibleSeasons.length === 0) {
    return null;
  }

  return (
    <section className="show-modal__section">
      <h3 className="show-modal__section-title">Seasons</h3>

      <div className="show-modal__seasons">
        {visibleSeasons.map((season) => (
          <article className="show-modal__season" key={season.id}>
            <span className="show-modal__season-number">
              {season.number == null ? 'Specials' : `Season ${season.number}`}
            </span>

            <span className="show-modal__season-count">
              {season.episodeCount}{' '}
              {season.episodeCount === 1 ? 'episode' : 'episodes'}
            </span>

            {(season.premiere || season.finale) && (
              <span className="show-modal__season-dates">
                {season.premiere}
                {season.premiere && season.finale && ' · '}
                {season.finale}
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
