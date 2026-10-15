import { Link, useLocation, useSearchParams } from 'react-router';
import { Bookmark, Library, Menu, Moon, Sun } from 'lucide-react';

import { useTheme } from '../../hooks/useTheme';
import { useWatchlist } from '../../hooks/useWatchlist';
import SearchInput from './SearchInput';
import logo from '../../assets/logo.svg';

import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
  totalShows: number;
}

export default function Header({ onMenuClick, totalShows }: HeaderProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { resolvedTheme, setMode } = useTheme();
  const { watchlist } = useWatchlist();

  const isDark = resolvedTheme === 'dark';
  const urlQuery = searchParams.get('q') ?? '';

  function handleThemeToggle() {
    setMode(isDark ? 'light' : 'dark');
  }

  return (
    <header className="header">
      <div className="header__left">
        <button
          className="icon-button"
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <Menu size={21} aria-hidden="true" />
        </button>

        <Link to="/" className="header__logo">
          <img
            className="header__logo-icon"
            src={logo}
            alt=""
            aria-hidden="true"
          />
          <span>Series Explorer</span>
        </Link>
      </div>

      <SearchInput
        key={location.pathname === '/search' ? '/search' : location.pathname}
        initialValue={location.pathname === '/search' ? urlQuery : ''}
      />

      <div className="header__right">
        <div className="header__stat" title="Saved series">
          <Bookmark size={18} aria-hidden="true" />
          <span>{watchlist.length}</span>
        </div>

        <div className="header__stat" title="Total series">
          <Library size={18} aria-hidden="true" />
          <span>{totalShows}</span>
        </div>

        <button
          className="icon-button"
          type="button"
          onClick={handleThemeToggle}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? (
            <Sun size={19} aria-hidden="true" />
          ) : (
            <Moon size={19} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}
