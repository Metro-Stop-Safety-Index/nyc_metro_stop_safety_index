import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, LocationModal } from '../components';
import { useLocation } from '../hooks/useLocation';
import { getLastUpdated } from '../services/api';
import './WelcomePage.css';

export default function WelcomePage() {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState('--');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const { permissionStatus, hasAskedPermission, requestLocation, denyPermission } = useLocation();

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

  return (
    <div className="welcome-page">
      <div className="header-icons header-icons--end">
        <IconButton
          ariaLabel="Settings"
          onClick={() => navigate('/settings')}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          }
        />
      </div>

      <div className="welcome-content">
        <h1 className="app-title">Metro Stop<br />Danger Index</h1>
        <p className="app-subtitle">
          Make informed travel decisions using up to date safety ratings for subways
        </p>

        <div className="metro-icon">
          <img src="/metro_image.png" alt="Metro" />
        </div>

        <p className="update-info">Last updated: {lastUpdated}</p>
        <button className="primary-button" onClick={() => navigate('/list')}>
          View Index Scores
        </button>
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
