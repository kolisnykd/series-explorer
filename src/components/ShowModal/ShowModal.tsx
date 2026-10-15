import { useEffect } from 'react';
import { X } from 'lucide-react';

import { useFetch } from '../../hooks/useFetch';
import { useWatched } from '../../hooks/useWatched';
import type { TVmazeShow } from '../../types/api/tvmaze';

import ShowHeader from './sections/ShowHeader';
import ShowGallery from './sections/ShowGallery';
import ShowFacts from './sections/ShowFacts';
import ShowSeasons from './sections/ShowSeasons';
import ShowCast from './sections/ShowCast';
import ShowCrew from './sections/ShowCrew';
import ShowFooter from './sections/ShowFooter';

import './ShowModal.css';

interface ShowModalProps {
  showId: number;
  onClose: () => void;
}

export default function ShowModal({ showId, onClose }: ShowModalProps) {
  const [details] = useFetch<TVmazeShow>([
    `https://api.tvmaze.com/shows/${showId}`,
  ]);

  const { addToWatched } = useWatched();

  useEffect(() => {
    addToWatched(details);
  }, [details, addToWatched]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <section
      className="show-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="show-modal-title"
    >
      <button
        className="show-modal__close"
        type="button"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X size={20} />
      </button>

      <ShowHeader show={details} />

      <ShowGallery
        showId={showId}
        showName={details.name}
        fallbackImage={details.image?.original ?? details.image?.medium}
      />

      <ShowFacts show={details} />

      <ShowSeasons showId={showId} />
      <ShowCast showId={showId} />
      <ShowCrew showId={showId} />

      <ShowFooter url={details.url} />
    </section>
  );
}
