import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { TVmazeShow } from '../../types/api/tvmaze';
import ShowCard from '../ShowCard/ShowCard';
import './ShowSection.css';

type ShowSectionProps = {
  title: string;
  shows: TVmazeShow[];
  to: string;
};

export default function ShowSection({ title, shows, to }: ShowSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    setCanScrollLeft(track.scrollLeft > 1);
    setCanScrollRight(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    updateScrollState();

    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [shows.length, updateScrollState]);

  function scroll(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) return;

    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: 'smooth',
    });
  }

  if (shows.length === 0) return null;

  return (
    <section className="show-section">
      <div className="show-section__header">
        <h2 className="show-section__title">{title}</h2>

        <div className="show-section__actions">
          <Link className="show-section__view-all" to={to}>
            View all
            <ArrowRight size={15} aria-hidden="true" />
          </Link>

          <div className="show-section__arrows">
            <button
              className="show-section__arrow"
              type="button"
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label={`Scroll ${title} left`}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>

            <button
              className="show-section__arrow"
              type="button"
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label={`Scroll ${title} right`}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={[
          'show-section__track',
          canScrollLeft && 'show-section__track--fade-left',
          canScrollRight && 'show-section__track--fade-right',
        ]
          .filter(Boolean)
          .join(' ')}
        ref={trackRef}
      >
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </section>
  );
}
