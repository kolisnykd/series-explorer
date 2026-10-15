import { NavLink } from 'react-router';
import { Compass, Radio, Star, Bookmark, CheckCircle2 } from 'lucide-react';
import './Sidebar.css';

const navigationItems = [
  { label: 'Discover', path: '/', icon: Compass, end: true },
  { label: 'Currently Airing', path: '/airing', icon: Radio },
  { label: 'Top Rated', path: '/top-rated', icon: Star },
  { label: 'Watchlist', path: '/watchlist', icon: Bookmark },
  { label: 'Watched', path: '/watched', icon: CheckCircle2 },
];

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar__section">
        <p className="sidebar__heading">LIBRARY</p>

        <nav className="sidebar__nav">
          {navigationItems.map(({ label, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }: { isActive: boolean }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar__footer">
        <span>Series Explorer</span>
        <span>Personal TV library</span>
      </div>
    </aside>
  );
}
