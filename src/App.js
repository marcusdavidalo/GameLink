import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import About from './pages/About';
import Search from './pages/Search';
import GameDetails from './pages/GameDetails';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/game-details" element={<GameDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
