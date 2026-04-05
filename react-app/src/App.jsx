import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        
        <footer style={{ textAlign: 'center', padding: '2rem', marginTop: '4rem', backgroundColor: 'var(--bg-card)' }}>
          <p>&copy; 2026 MovieTicket Booking. College Project.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
