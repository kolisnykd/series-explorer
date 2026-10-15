export default function ShowModalSkeleton() {
  return (
    <section
      className="show-modal show-modal--skeleton"
      role="dialog"
      aria-modal="true"
      aria-label="Loading series details"
      aria-busy="true"
    >
      <div className="show-modal-skeleton__close" aria-hidden="true" />

      <header className="show-modal-skeleton__header">
        <div className="show-modal-skeleton__heading">
          <div className="show-modal-skeleton__line show-modal-skeleton__eyebrow" />
          <div className="show-modal-skeleton__line show-modal-skeleton__title" />

          <div className="show-modal-skeleton__badges">
            <div className="show-modal-skeleton__badge" />
            <div className="show-modal-skeleton__badge" />
          </div>

          <div className="show-modal-skeleton__genres">
            <div className="show-modal-skeleton__genre" />
            <div className="show-modal-skeleton__genre" />
            <div className="show-modal-skeleton__genre" />
          </div>
        </div>

        <div className="show-modal-skeleton__actions" aria-hidden="true">
          <div className="show-modal-skeleton__action" />
          <div className="show-modal-skeleton__rating" />
        </div>
      </header>

      <div className="show-modal-skeleton__gallery" aria-hidden="true" />

      <div className="show-modal-skeleton__section" aria-hidden="true">
        <div className="show-modal-skeleton__line show-modal-skeleton__section-title" />

        <div className="show-modal-skeleton__facts">
          <div className="show-modal-skeleton__fact" />
          <div className="show-modal-skeleton__fact" />
          <div className="show-modal-skeleton__fact" />
          <div className="show-modal-skeleton__fact" />
        </div>
      </div>

      <div className="show-modal-skeleton__section" aria-hidden="true">
        <div className="show-modal-skeleton__line show-modal-skeleton__section-title" />

        <div className="show-modal-skeleton__rows">
          <div className="show-modal-skeleton__row" />
          <div className="show-modal-skeleton__row" />
          <div className="show-modal-skeleton__row" />
        </div>
      </div>
    </section>
  );
}
