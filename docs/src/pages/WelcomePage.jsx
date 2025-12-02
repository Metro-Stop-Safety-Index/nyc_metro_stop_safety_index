import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, LocationModal } from '../components/index.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLocation } from '../hooks/useLocation.js';
import { getLastUpdated } from '../services/api.js';
import './WelcomePage.css';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading, signInAsGuest } = useAuth();
  const [lastUpdated, setLastUpdated] = useState('--');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const { permissionStatus, hasAskedPermission, requestLocation, denyPermission } = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate('/list', { replace: true });
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    getLastUpdated().then((data) => {
      setLastUpdated(data.formatted);
    });
  }, []);

  // Show location modal on first visit
  useEffect(() => {
    if (!hasAskedPermission()) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setShowLocationModal(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllowLocation = async () => {
    setShowLocationModal(false);
    try {
      await requestLocation();
    } catch (err) {
      console.log('Location permission denied or error:', err);
    }
  };

  const handleDenyLocation = () => {
    setShowLocationModal(false);
    denyPermission();
  };

  const handleGuestAccess = async () => {
    setGuestLoading(true);
    const result = await signInAsGuest();
    if (result.success) {
      navigate('/list', { replace: true });
    } else {
      setGuestLoading(false);
      alert(result.error);
    }
  };

  // Show loading spinner while auth is initializing
  if (authLoading) {
    return (
      <div className="welcome-page welcome-loading">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1 className="app-title">Metro Stop<br />Danger Index</h1>
        <p className="app-subtitle">
          Make informed travel decisions using up to date safety ratings for subways
        </p>

        <div className="metro-icon">
          <img src="/metro_image.png" alt="Metro" />
        </div>

        <p className="update-info">Last updated: {lastUpdated}</p>

        <div className="auth-buttons">
          <button className="primary-button" onClick={() => navigate('/login')}>
            Sign In
          </button>
          <button
            className="guest-button"
            onClick={handleGuestAccess}
            disabled={guestLoading}
          >
            {guestLoading ? (
              <span className="button-loading">
                <span className="button-spinner" />
                Loading...
              </span>
            ) : (
              'Continue as Guest'
            )}
          </button>
        </div>
      </div>

      {showLocationModal && (
        <LocationModal
          onAllow={handleAllowLocation}
          onDeny={handleDenyLocation}
        />
      )}
    </div>
  );
}
