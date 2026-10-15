import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero__title">
        Series Explorer<span className="hero__accent">.</span>
      </h1>

      <p className="hero__tagline">Stories worth getting lost in.</p>

      <p className="hero__description">Discover your next favorite.</p>
    </section>
  );
}
