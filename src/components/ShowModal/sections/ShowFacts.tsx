import type { TVmazeShow } from '../../../types/api/tvmaze';
import { formatDate } from '../../../utils/formatDate';
import { stripHtml } from '../../../utils/stripHtml';

interface ShowFactsProps {
  show: TVmazeShow;
}

export default function ShowFacts({ show }: ShowFactsProps) {
  const summary = stripHtml(show.summary);

  const network = show.network?.name ?? show.webChannel?.name ?? null;

  const runtime = show.averageRuntime ?? show.runtime ?? null;

  const facts = [
    { label: 'Network / platform', value: network },
    {
      label: 'Episode runtime',
      value: runtime != null ? `${runtime} min` : null,
    },
    { label: 'Premiere', value: formatDate(show.premiered) },
    { label: 'Final episode', value: formatDate(show.ended) },
  ];

  return (
    <section className="show-modal__section">
      {summary && (
        <>
          <h3 className="show-modal__section-title">Overview</h3>
          <p className="show-modal__summary">{summary}</p>
        </>
      )}

      <div className="show-modal__facts">
        {facts
          .filter((fact) => Boolean(fact.value))
          .map((fact) => (
            <div className="show-modal__fact" key={fact.label}>
              <span className="show-modal__fact-label">{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
      </div>
    </section>
  );
}
