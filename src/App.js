import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserAttend from './components/UserAttend';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attend" element={<UserAttend />} />
      </Routes>
    </Router>
  );
}

export default App;
