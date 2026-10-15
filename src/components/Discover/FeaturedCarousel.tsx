import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import { useShows } from '../../hooks/useShows';
import { getFeaturedShows } from '../../utils/formatShow';

import './FeaturedCarousel.css';

const AUTOPLAY_DELAY = 15000;

export default function FeaturedCarousel() {
  const { shows } = useShows();

  const featuredShows = useMemo(() => getFeaturedShows(shows), [shows]);

  const [activeIndex, setActiveIndex] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const safeIndex =
    featuredShows.length > 0 && activeIndex < featuredShows.length
      ? activeIndex
      : 0;

  const activeShow = featuredShows[safeIndex];

  useEffect(() => {
    if (featuredShows.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredShows.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [featuredShows.length]);

  function showPrevious() {
    setActiveIndex(
      (current) => (current - 1 + featuredShows.length) % featuredShows.length,
    );
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % featuredShows.length);
  }

  function handleViewSeries() {
    if (!activeShow) return;

    navigate(`/show/${activeShow.id}`, {
      state: {
        backgroundLocation: location,
      },
    });
  }

  if (!activeShow) {
    return (
      <section className="featured">
        <div className="featured__banner featured__banner--state">
          <div className="featured__state">
            <h2 className="featured__state-title">No series found</h2>
            <p className="featured__state-description">
              There are no featured series to display.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured">
      <div className="featured__banner">
        <div
          key={activeShow.id}
          className="featured__image"
          style={{
            backgroundImage: `url("${activeShow.image}")`,
          }}
          aria-hidden="true"
        />

        <div className="featured__overlay">
          <div className="featured__content" key={activeShow.id}>
            <span className="featured__eyebrow">Featured series</span>

            <h2 className="featured__title">{activeShow.title}</h2>

            <div className="featured__metadata">
              <span>{activeShow.year}</span>

              <span className="featured__separator" aria-hidden="true">
                •
              </span>

              <span className="featured__rating">
                <Star size="1em" fill="currentColor" aria-hidden="true" />
                {activeShow.rating.toFixed(1)}
              </span>

              {activeShow.genres.length > 0 && (
                <>
                  <span className="featured__separator" aria-hidden="true">
                    •
                  </span>

                  <span>{activeShow.genres.join(' · ')}</span>
                </>
              )}
            </div>

            <p className="featured__description">{activeShow.description}</p>

            <button
              className="featured__button"
              type="button"
              onClick={handleViewSeries}
            >
              View series
            </button>
          </div>
        </div>

        {featuredShows.length > 1 && (
          <>
            <button
              className="featured__arrow featured__arrow--left"
              type="button"
              onClick={showPrevious}
              aria-label="Previous series"
            >
              <ChevronLeft aria-hidden="true" />
            </button>

            <button
              className="featured__arrow featured__arrow--right"
              type="button"
              onClick={showNext}
              aria-label="Next series"
            >
              <ChevronRight aria-hidden="true" />
            </button>

            <div className="featured__counter" aria-live="polite">
              {String(safeIndex + 1).padStart(2, '0')}
              {' / '}
              {String(featuredShows.length).padStart(2, '0')}
            </div>
          </>
        )}
      </div>

      {featuredShows.length > 1 && (
        <div className="featured__dots" aria-label="Choose a series">
          {featuredShows.map((show, index) => (
            <button
              key={show.id}
              className={`featured__dot ${
                index === safeIndex ? 'featured__dot--active' : ''
              }`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to series ${index + 1}`}
              aria-current={index === safeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
