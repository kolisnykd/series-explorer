import { Users } from 'lucide-react';

import { useFetch } from '../../../hooks/useFetch';
import type { TVmazeCastMember } from '../../../types/api/tvmaze';

interface ShowCastProps {
  showId: number;
}

export default function ShowCast({ showId }: ShowCastProps) {
  const [cast] = useFetch<TVmazeCastMember[]>([
    `https://api.tvmaze.com/shows/${showId}/cast`,
  ]);

  const uniqueCast = cast
    .filter((member) => member.person?.name)
    .filter(
      (member, index, all) =>
        all.findIndex((item) => item.person.id === member.person.id) === index,
    )
    .slice(0, 8);

  if (uniqueCast.length === 0) return null;

  return (
    <section className="show-modal__section">
      <h3 className="show-modal__section-title">
        <Users size={19} aria-hidden="true" />
        Main cast
      </h3>

      <div className="show-modal__cast">
        {uniqueCast.map(({ person, character }) => (
          <article className="show-modal__cast-member" key={person.id}>
            {person.image?.medium && (
              <img
                className="show-modal__cast-image"
                src={person.image.medium}
                alt={person.name}
                loading="lazy"
              />
            )}

            <div className="show-modal__cast-info">
              <strong>{person.name}</strong>
              {character?.name && <span>{character.name}</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
