import { Link, useLocation } from 'react-router';
import { Bookmark, Star } from 'lucide-react';

import { useWatchlist } from '../../hooks/useWatchlist';
import type { TVmazeShow } from '../../types/api/tvmaze';

import './ShowCard.css';

type ShowCardProps = {
  show: TVmazeShow;
  bookmarkOnHoverOnly?: boolean;
};

export default function ShowCard({
  show,
  bookmarkOnHoverOnly = false,
}: ShowCardProps) {
  const { toggle, isSaved } = useWatchlist();
  const location = useLocation();

  const year = show.premiered?.slice(0, 4);
  const saved = isSaved(show.id);

  function handleWatchlistClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    toggle(show);
  }

  return (
    <article className="show-card">
      <Link
        className="show-card__link"
        to={`/show/${show.id}`}
        state={{ backgroundLocation: location }}
      >
        <div className="show-card__poster">
          {show.image ? (
            <img
              className="show-card__image"
              src={show.image.medium}
              alt={show.name}
              loading="lazy"
            />
          ) : (
            <div className="show-card__placeholder">No image</div>
          )}
        </div>

        <div className="show-card__info">
          <h3 className="show-card__title" title={show.name}>
            {show.name}
          </h3>

          <p className="show-card__genres">
            {show.genres.length > 0
              ? show.genres.slice(0, 2).join(' · ')
              : 'Series'}
          </p>

          {year && <span className="show-card__year">{year}</span>}
        </div>
      </Link>

      <div className="show-card__badges">
        <button
          className={`show-card__watchlist ${
            saved ? 'show-card__watchlist--saved' : ''
          } ${bookmarkOnHoverOnly ? 'show-card__watchlist--hover-only' : ''}`}
          type="button"
          onClick={handleWatchlistClick}
          aria-label={
            saved
              ? `Remove ${show.name} from watchlist`
              : `Add ${show.name} to watchlist`
          }
          aria-pressed={saved}
          title={saved ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          <Bookmark
            size={13}
            fill={saved ? 'currentColor' : 'none'}
            aria-hidden="true"
          />
        </button>

        {show.rating.average !== null && (
          <span className="show-card__rating">
            <Star size={13} fill="currentColor" aria-hidden="true" />
            {show.rating.average.toFixed(1)}
          </span>
        )}
      </div>
    </article>
  );
}
