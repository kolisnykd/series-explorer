import './CatalogLoader.css';

export default function CatalogLoader() {
  return (
    <div className="catalog-loader" role="status" aria-live="polite">
      <div className="catalog-loader__spinner" />
      <p className="catalog-loader__text">Loading catalog...</p>
    </div>
  );
}
