import type { ShowSortOrder } from '../../types/catalog';
import './ShowFilters.css';

const MAIN_GENRES = [
  'Drama',
  'Comedy',
  'Crime',
  'Thriller',
  'Science-Fiction',
  'Fantasy',
];

interface ShowFiltersProps {
  selectedGenres: string[];
  sortOrder: ShowSortOrder;
  defaultSortOrder?: ShowSortOrder;
  totalCount: number;
  onGenreToggle: (genre: string) => void;
  onSortChange: (value: ShowSortOrder) => void;
  onClear: () => void;
}

export default function ShowFilters({
  selectedGenres,
  sortOrder,
  defaultSortOrder = 'year-desc',
  totalCount,
  onGenreToggle,
  onSortChange,
  onClear,
}: ShowFiltersProps) {
  const hasActiveFilters =
    selectedGenres.length > 0 || sortOrder !== defaultSortOrder;

  return (
    <div className="show-filters">
      <div className="show-filters__toolbar">
        <div className="show-filters__genres">
          {MAIN_GENRES.map((genre) => {
            const isActive = selectedGenres.includes(genre);

            return (
              <button
                key={genre}
                type="button"
                className={`show-filters__genre ${
                  isActive ? 'show-filters__genre--active' : ''
                }`}
                aria-pressed={isActive}
                onClick={() => onGenreToggle(genre)}
              >
                {genre}
              </button>
            );
          })}
        </div>

        <label className="show-filters__sort">
          <span>Sort by</span>

          <select
            id="show-sort"
            name="show-sort"
            value={sortOrder}
            onChange={(event) =>
              onSortChange(event.target.value as ShowSortOrder)
            }
          >
            <option value="year-desc">Newest first</option>
            <option value="year-asc">Oldest first</option>
            <option value="rating-desc">Highest rated</option>
            <option value="rating-asc">Lowest rated</option>
          </select>
        </label>
      </div>

      <div className="show-filters__summary">
        <span>{totalCount} series</span>

        {hasActiveFilters && (
          <button
            type="button"
            className="show-filters__clear"
            onClick={onClear}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
