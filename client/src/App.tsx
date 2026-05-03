import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useBriefingStore } from './store/useBriefingStore';
import { fetchApi } from './lib/api';

import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import BriefingView from './pages/BriefingView';
import AuthCallback from './pages/AuthCallback';

function App() {
  const { isAuthenticated, setAuthenticated, setUser } = useBriefingStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetchApi('/auth/me');
        if (response.authenticated) {
          setAuthenticated(true);
          setUser(response.user);
        }
      } catch (error) {
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, [setAuthenticated, setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" replace />} 
        />
        
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {isAuthenticated && (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/briefing" element={<BriefingView />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        )}
        
        {!isAuthenticated && (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
