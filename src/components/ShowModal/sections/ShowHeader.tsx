import { Bookmark, CalendarDays, Star, Tv } from 'lucide-react';

import { useWatchlist } from '../../../hooks/useWatchlist';
import type { TVmazeShow } from '../../../types/api/tvmaze';

interface ShowHeaderProps {
  show: TVmazeShow;
}

export default function ShowHeader({ show }: ShowHeaderProps) {
  const { toggle, isSaved } = useWatchlist();

  const saved = isSaved(show.id);
  const rating = show.rating?.average;
  const year = show.premiered?.slice(0, 4);

  return (
    <header className="show-modal__header">
      <div className="show-modal__heading">
        <p className="show-modal__eyebrow">SERIES DETAILS</p>

        <h2 id="show-modal-title">{show.name}</h2>

        <div className="show-modal__badges">
          {year && (
            <span className="show-modal__badge">
              <CalendarDays size={14} aria-hidden="true" />
              {year}
            </span>
          )}

          {show.status && (
            <span className="show-modal__badge">
              <Tv size={14} aria-hidden="true" />
              {show.status}
            </span>
          )}
        </div>

        {show.genres.length > 0 && (
          <div className="show-modal__genres">
            {show.genres.map((genre) => (
              <span className="show-modal__genre" key={genre}>
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="show-modal__actions">
        <button
          className={`show-modal__watchlist ${
            saved ? 'show-modal__watchlist--saved' : ''
          }`}
          type="button"
          onClick={() => toggle(show)}
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

        {rating != null && (
          <span className="show-modal__rating">
            <Star size={13} fill="currentColor" aria-hidden="true" />
            {rating.toFixed(1)}
          </span>
        )}
      </div>
    </header>
  );
}
