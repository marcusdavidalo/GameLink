import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './pages/Index';
import About from './pages/About';
import Search from './pages/Search';
import GameDetails from './pages/GameDetails';
import './App.css';

function App() {
  return (
    <div className="bgimg">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/details" element={<GameDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
