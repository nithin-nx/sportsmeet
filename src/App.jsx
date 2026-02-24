import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import PointsTablePage from './pages/PointsTablePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/points" element={<PointsTablePage />} />
          </Routes>
        </main>
        <footer className="py-8 text-center text-white/40 text-sm border-t border-white/5">
          <p>&copy; 2026 GEC Sports Meet. All rights reserved.
            made by NiCo
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
