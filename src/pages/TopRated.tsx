import { useMemo, useState } from 'react';

import { useShows } from '../hooks/useShows';
import useScroll from '../hooks/useScroll';
import { getTopRated } from '../utils/showSelectors';
import type { ShowSortOrder } from '../types/catalog';
import ShowCard from '../components/ShowCard/ShowCard';
import ShowFilters from '../components/ShowFilters/ShowFilters';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

import './CatalogPage.css';

const PAGE_SIZE = 30;

export default function TopRated() {
  const { shows } = useShows();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<ShowSortOrder>('rating-desc');

  const topRatedShows = useMemo(
    () =>
      getTopRated(shows, {
        genres: selectedGenres,
        sortOrder,
      }),
    [shows, selectedGenres, sortOrder],
  );

  const { visibleCount, hasMore, showScrollTop, resetVisibleCount } = useScroll(
    topRatedShows.length,
    PAGE_SIZE,
  );

  const visibleShows = topRatedShows.slice(0, visibleCount);

  function toggleGenre(genre: string) {
    setSelectedGenres((current) =>
      current.includes(genre)
        ? current.filter((item) => item !== genre)
        : [...current, genre],
    );

    resetVisibleCount();
  }

  function handleSortChange(value: ShowSortOrder) {
    setSortOrder(value);
    resetVisibleCount();
  }

  function clearFilters() {
    setSelectedGenres([]);
    setSortOrder('rating-desc');
    resetVisibleCount();
  }

  return (
    <section className="catalog-page">
      <h1 className="catalog-page__title">Top Rated</h1>

      <ShowFilters
        selectedGenres={selectedGenres}
        sortOrder={sortOrder}
        defaultSortOrder="rating-desc"
        totalCount={topRatedShows.length}
        onGenreToggle={toggleGenre}
        onSortChange={handleSortChange}
        onClear={clearFilters}
      />

      {topRatedShows.length > 0 ? (
        <div className="catalog-page__grid">
          {visibleShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      ) : (
        <p className="catalog-page__empty">
          No series match the selected genres.
        </p>
      )}

      {hasMore ? (
        <p className="catalog-page__loading" aria-live="polite">
          Scroll down to load more series
        </p>
      ) : (
        topRatedShows.length > 0 && (
          <p className="catalog-page__end">You've reached the end of series.</p>
        )
      )}

      <ScrollToTop visible={showScrollTop} />
    </section>
  );
}
