import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__copyright">
        © {new Date().getFullYear()} Series Explorer
      </span>

      <div className="footer__links">
        <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">
          Data provided by TVmaze API
        </a>

        <a
          href="https://github.com/kolisnykd/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <span className="footer__version">v1.0.0</span>
      </div>
    </footer>
  );
}
