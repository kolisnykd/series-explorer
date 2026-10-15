import { useMemo } from 'react';

import Hero from '../components/Discover/Hero';
import FeaturedCarousel from '../components/Discover/FeaturedCarousel';
import ShowSection from '../components/Discover/ShowSection';

import { useShows } from '../hooks/useShows';
import { useWatchlist } from '../hooks/useWatchlist';
import { useWatched } from '../hooks/useWatched';

import { getCurrentlyAiring, getTopRated } from '../utils/showSelectors';

import './CatalogPage.css';

export default function Discover() {
  const { shows } = useShows();
  const { watchlist } = useWatchlist();
  const { watchedShows } = useWatched();

  const currentlyAiring = useMemo(
    () => getCurrentlyAiring(shows).slice(0, 50),
    [shows],
  );

  const topRated = useMemo(() => getTopRated(shows).slice(0, 50), [shows]);

  return (
    <div className="discover">
      <Hero />
      <FeaturedCarousel />

      <div className="discover__sections">
        <ShowSection
          title="Currently Airing"
          shows={currentlyAiring}
          to="/airing"
        />

        <ShowSection title="Top Rated" shows={topRated} to="/top-rated" />

        <ShowSection
          title="Watchlist"
          shows={watchlist.slice(0, 50)}
          to="/watchlist"
        />

        <ShowSection
          title="Watched"
          shows={watchedShows.slice(0, 50)}
          to="/watched"
        />
      </div>
    </div>
  );
}
