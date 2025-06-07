// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthPage from './pages/AuthPage'; // new unified login/register
import Dashboard from './pages/Dashboard';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect root to auth or dashboard based on token */}
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />} />

        {/* Unified login/register page */}
        <Route path="/auth" element={<AuthPage setToken={setToken} />} />

        {/* Dashboard protected route */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/auth" />}
        />

        {/* Optional: Your existing animation logic */}
        
      </Routes>
    </Router>
  );
}

export default App;
