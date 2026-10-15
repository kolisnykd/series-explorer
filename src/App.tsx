import {
  Suspense,
  useState,
  startTransition,
  Activity,
  lazy,
  ViewTransition,
} from 'react';
import { Route, Routes, useLocation } from 'react-router';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import CatalogLoader from './components/CatalogLoader/CatalogLoader';

import Discover from './pages/Discover';
import CurrentlyAiring from './pages/CurrentlyAiring';
import TopRated from './pages/TopRated';
import Watchlist from './pages/Watchlist';

import ShowModalRoute from './components/ShowModal/ShowModalRoute';

import './App.css';
import Watched from './pages/Watched';
import SearchPage from './pages/Search';

const ShowsProvider = lazy(() => import('./context/ShowsProvider'));

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [totalShows, setTotalShows] = useState(0);
  const backgroundLocation = location.state?.backgroundLocation;

  function handleMenuClick() {
    startTransition(() => {
      setIsSidebarOpen((open) => !open);
    });
  }

  return (
    <div className="app">
      <Header onMenuClick={handleMenuClick} totalShows={totalShows} />
      <Activity mode={isSidebarOpen ? 'visible' : 'hidden'}>
        <ViewTransition
          enter="sidebar-enter"
          exit="sidebar-exit"
          default="none"
        >
          <Sidebar />
        </ViewTransition>
      </Activity>

      <Suspense fallback={<CatalogLoader />}>
        <ShowsProvider onShowsLoaded={setTotalShows}>
          <main
            className={`app__main ${
              isSidebarOpen ? 'app__main--sidebar-open' : ''
            }`}
          >
            <Routes location={backgroundLocation || location}>
              <Route path="/" element={<Discover />} />
              <Route path="/airing" element={<CurrentlyAiring />} />
              <Route path="/top-rated" element={<TopRated />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/watched" element={<Watched />} />

              <Route path="/search" element={<SearchPage />} />

              <Route path="/show/:id" element={<ShowModalRoute />} />
            </Routes>

            {backgroundLocation && (
              <Routes>
                <Route
                  path="/show/:id"
                  element={
                    <Suspense fallback={<CatalogLoader />}>
                      <ShowModalRoute isModal />
                    </Suspense>
                  }
                />
              </Routes>
            )}
          </main>
        </ShowsProvider>
      </Suspense>

      <Footer />
    </div>
  );
}
