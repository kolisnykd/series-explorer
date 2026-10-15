import { useWatched } from '../hooks/useWatched';
import useScroll from '../hooks/useScroll';
import ShowCard from '../components/ShowCard/ShowCard';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

import './CatalogPage.css';

export default function Watched() {
  const { watchedShows } = useWatched();

  const { showScrollTop } = useScroll(watchedShows.length, 30, false);

  return (
    <section className="catalog-page">
      <h1 className="catalog-page__title">Watched Series</h1>

      <p className="catalog-page__count">
        {watchedShows.length} series watched
      </p>

      {watchedShows.length > 0 ? (
        <div className="catalog-page__grid">
          {watchedShows.map((show) => (
            <ShowCard key={show.id} show={show} bookmarkOnHoverOnly />
          ))}
        </div>
      ) : (
        <p className="catalog-page__empty">
          No watched series yet. Open a series to explore its details and add it
          to your watched list.
        </p>
      )}

      {watchedShows.length > 0 && (
        <p className="catalog-page__end">
          You've reached the end of your watched series.
        </p>
      )}

      <ScrollToTop visible={showScrollTop} />
    </section>
  );
}
