import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Search } from 'lucide-react';

import { useDebounce } from '../../hooks/useDebounce';

interface SearchInputProps {
  initialValue: string;
}

export default function SearchInput({ initialValue }: SearchInputProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState(initialValue);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const query = debouncedSearch.trim();
    const currentParams = new URLSearchParams(location.search);
    const currentQuery = currentParams.get('q') ?? '';

    if (location.pathname === '/search' && currentQuery === query) {
      return;
    }

    if (!query) {
      if (location.pathname === '/search') {
        navigate('/', { replace: true });
      }
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query)}`, {
      replace: true,
    });
  }, [debouncedSearch, location.pathname, location.search, navigate]);

  return (
    <div className="header__search">
      <Search size={18} aria-hidden="true" />

      <input
        id="series-search"
        name="series-search"
        autoComplete="off"
        type="search"
        placeholder="Search series..."
        aria-label="Search series"
        value={search}
        onChange={(event) => setSearch(event.target.value.trimStart())}
      />
    </div>
  );
}
