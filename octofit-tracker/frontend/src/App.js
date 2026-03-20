import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofit-logo.png" alt="OctoFit Logo" className="navbar-logo" />
              OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    <i className="bi bi-activity"></i> Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="bi bi-trophy"></i> Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <i className="bi bi-people"></i> Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="bi bi-person"></i> Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <i className="bi bi-dumbbell"></i> Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-4 mt-5">
          <div className="container-fluid">
            <p className="mb-0">&copy; 2024 OctoFit Tracker. All rights reserved.</p>
            <small className="text-muted">Built with React, Bootstrap, and Django REST Framework</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <div className="home-section">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold">Welcome to OctoFit Tracker</h1>
            <p className="lead">Your complete fitness tracking and team management solution</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">📊 Track Activities</h5>
                  <p className="card-text">Log and monitor your daily fitness activities and achievements.</p>
                  <Link to="/activities" className="btn btn-primary">
                    View Activities
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">🏆 Compete & Win</h5>
                  <p className="card-text">Check the leaderboard and see how you rank against your peers.</p>
                  <Link to="/leaderboard" className="btn btn-primary">
                    View Leaderboard
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">👥 Team Management</h5>
                  <p className="card-text">Create and manage teams to collaborate with other fitness enthusiasts.</p>
                  <Link to="/teams" className="btn btn-primary">
                    View Teams
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">💪 Personalized Workouts</h5>
                  <p className="card-text">Get custom workout suggestions tailored to your fitness level.</p>
                  <Link to="/workouts" className="btn btn-primary">
                    View Workouts
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="alert alert-info mt-5" role="alert">
            <h5 className="alert-heading">🔗 Backend Connection Details</h5>
            <p className="mb-2">
              <strong>API Base URL:</strong> <code>https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/</code>
            </p>
            <p className="mb-0">
              <small>Make sure to set the <code>REACT_APP_CODESPACE_NAME</code> environment variable to enable API connectivity.</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
