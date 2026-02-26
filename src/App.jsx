import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import PointsTablePage from './pages/PointsTablePage';
import WinnersPage from './pages/WinnersPage';
import LiveScoresPage from './pages/LiveScoresPage';
import { useEvents } from './hooks/useEvents';
import { useDepartments } from './hooks/useDepartments';

function App() {
  const { athleticsEvents, gamesEvents, loading: eventsLoading } = useEvents();
  const { loading: deptsLoading } = useDepartments();

  const homeLoading = eventsLoading || deptsLoading;

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={
              <HomePage
                athleticsEvents={athleticsEvents}
                gamesEvents={gamesEvents}
                loading={homeLoading}
              />
            } />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/points" element={<PointsTablePage />} />
            <Route path="/winners" element={<WinnersPage />} />
            <Route path="/live" element={<LiveScoresPage />} />
          </Routes>
        </main>
        <footer className="py-12 px-4 text-center border-t border-white/5 bg-dark-bg/50 backdrop-blur-md">
          <div className="flex justify-center gap-6 mb-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
            {[
              { num: 1, ext: 'png' },
              { num: 2, ext: 'png' },
              { num: 3, ext: 'jpeg' }
            ].map(({ num, ext }) => (
              <img
                key={num}
                src={`/logo${num}.${ext}`}
                alt={`Logo ${num}`}
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
          <p className="text-white/40 text-sm font-medium tracking-wide">
            &copy; 2026 GECI Sports Meet. All rights reserved.
          </p>
          <p className="text-white/20 text-[10px] mt-2 uppercase tracking-[0.3em] font-black">
            made by NITHIN
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
