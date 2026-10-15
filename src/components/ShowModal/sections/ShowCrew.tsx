import { useFetch } from '../../../hooks/useFetch';
import type { TVmazeCrewMember } from '../../../types/api/tvmaze';

interface ShowCrewProps {
  showId: number;
}

export default function ShowCrew({ showId }: ShowCrewProps) {
  const [crew] = useFetch<TVmazeCrewMember[]>([
    `https://api.tvmaze.com/shows/${showId}/crew`,
  ]);

  const creators = crew.filter((member) => /creator/i.test(member.type));

  const featuredCrew =
    creators.length > 0
      ? creators.slice(0, 3)
      : crew
          .filter((member) =>
            /executive producer|producer|writer/i.test(member.type),
          )
          .slice(0, 3);

  if (featuredCrew.length === 0) return null;

  return (
    <section className="show-modal__section">
      <h3 className="show-modal__section-title">
        {creators.length > 0 ? 'Created by' : 'Production team'}
      </h3>

      <div className="show-modal__crew">
        {featuredCrew.map((member, index) => (
          <div
            className="show-modal__crew-member"
            key={`${member.person.id}-${member.type}-${index}`}
          >
            <strong>{member.person.name}</strong>
            <span>{member.type}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
