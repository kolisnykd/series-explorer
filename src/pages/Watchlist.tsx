import { useWatchlist } from '../hooks/useWatchlist';
import useScroll from '../hooks/useScroll';
import ShowCard from '../components/ShowCard/ShowCard';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

import './CatalogPage.css';

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  const { showScrollTop } = useScroll(watchlist.length, 30, false);

  return (
    <section className="catalog-page">
      <h1 className="catalog-page__title">Your Watchlist</h1>

      <p className="catalog-page__count">{watchlist.length} series saved</p>

      {watchlist.length > 0 ? (
        <div className="catalog-page__grid">
          {watchlist.map((show) => (
            <ShowCard key={show.id} show={show} bookmarkOnHoverOnly />
          ))}
        </div>
      ) : (
        <p className="catalog-page__empty">
          No series saved yet. Explore the catalog and bookmark the series you
          want to watch.
        </p>
      )}

      {watchlist.length > 0 && (
        <p className="catalog-page__end">
          You've reached the end of your watchlist.
        </p>
      )}

      <ScrollToTop visible={showScrollTop} />
    </section>
  );
}
