import React from 'react';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [showScreen, setShowScreen] = useState('login');

  function showLogin() {
    setShowScreen('login');
  }

  function showRegister() {
    setShowScreen('register');
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the separate login button page */}
          <Route path="/" element={<LoginPage />} />

          {/* Route for the login/register screen */}
          <Route
            path="/auth"
            element={
              showScreen === 'login' ? (
                <Login displayRegister={showRegister} />
              ) : (
                <Register displayLogin={showLogin} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;