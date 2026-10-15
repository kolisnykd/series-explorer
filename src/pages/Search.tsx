import { useDeferredValue, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { useShows } from '../hooks/useShows';
import { normalizeSearch } from '../utils/normalizeSearch';
import ShowCard from '../components/ShowCard/ShowCard';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import useScroll from '../hooks/useScroll';

import './CatalogPage.css';

const PAGE_SIZE = 30;

export default function SearchPage() {
  const { shows } = useShows();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const results = useMemo(() => {
    const normalizedQuery = normalizeSearch(deferredQuery);

    if (!normalizedQuery) {
      return [];
    }

    return shows.filter((show) =>
      normalizeSearch(show.name).includes(normalizedQuery),
    );
  }, [shows, deferredQuery]);

  const { visibleCount, hasMore, showScrollTop } = useScroll(
    results.length,
    PAGE_SIZE,
  );

  const visibleResults = results.slice(0, visibleCount);

  return (
    <section className="catalog-page">
      <h1 className="catalog-page__title">Search results</h1>

      <p className="catalog-page__description">
        {query ? `Results for "${query}"` : 'Enter a series title to search.'}
      </p>

      {query && (
        <p className="catalog-page__count">{results.length} series found</p>
      )}

      <div
        className={`catalog-page__results ${
          isStale ? 'catalog-page__results--stale' : ''
        }`}
        aria-busy={isStale}
      >
        {visibleResults.length > 0 ? (
          <div className="catalog-page__grid">
            {visibleResults.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        ) : (
          !isStale &&
          query.trim() !== '' && (
            <p className="catalog-page__empty">
              No series found for "{query}".
            </p>
          )
        )}
      </div>

      {hasMore ? (
        <p className="catalog-page__loading" aria-live="polite">
          Scroll down to load more series
        </p>
      ) : (
        query &&
        results.length > 0 && (
          <p className="catalog-page__end">You've reached the end of series.</p>
        )
      )}

      <ScrollToTop visible={showScrollTop} />
    </section>
  );
}
