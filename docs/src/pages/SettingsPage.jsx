import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useSettings } from '../contexts/SettingsContext.jsx';
import { useLocation } from '../hooks/useLocation.js';
import './SettingsPage.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { currentUser, isAnonymous, logout } = useAuth();
  const { settings, updateSetting } = useSettings();
  const { location, permissionStatus, requestLocation, resetPermission } = useLocation();

  const handleLocationToggle = async () => {
    if (permissionStatus === 'granted') {
      resetPermission();
    } else {
      try {
        await requestLocation();
      } catch (err) {
        console.log('Location error:', err);
      }
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="settings-page">
      <button className="back-button" onClick={() => navigate('/list')} aria-label="Go back">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="settings-title">Settings</h1>

      {/* Account Section */}
      <div className="settings-section">
        <h2 className="section-label">Account</h2>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-name">
              {isAnonymous ? 'Guest User' : currentUser?.email || 'User'}
            </span>
            <span className="setting-desc">
              {isAnonymous ? 'Browsing anonymously' : 'Registered account'}
            </span>
          </div>
        </div>

        {isAnonymous && (
          <div className="setting-item">
            <button
              className="upgrade-button"
              onClick={() => navigate('/signup')}
            >
              Upgrade to Full Account
            </button>
          </div>
        )}

        <div className="setting-item">
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17H3C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 13L19 8L14 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 8H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-label">Display</h2>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-name">Risk Display Mode</span>
            <span className="setting-desc">How to show risk levels</span>
          </div>
          <select
            className="setting-select"
            value={settings.riskDisplayMode}
            onChange={(e) => updateSetting('riskDisplayMode', e.target.value)}
          >
            <option value="text">Text</option>
            <option value="emoji">Emoji</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-label">Location</h2>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-name">Location Access</span>
            <span className="setting-desc">
              {permissionStatus === 'granted'
                ? 'Location enabled'
                : permissionStatus === 'denied'
                  ? 'Location disabled'
                  : 'Not configured'}
            </span>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={permissionStatus === 'granted'}
              onChange={handleLocationToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {location && (
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-name">Current Location</span>
              <span className="setting-desc">
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </span>
            </div>
          </div>
        )}

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-name">Search Radius</span>
            <span className="setting-desc">Nearby station detection range</span>
          </div>
          <select
            className="setting-select"
            value={settings.searchRadius}
            onChange={(e) => updateSetting('searchRadius', e.target.value)}
          >
            <option value="250">250m</option>
            <option value="500">500m</option>
            <option value="1000">1km</option>
            <option value="2000">2km</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-label">Notifications</h2>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-name">Push Notifications</span>
            <span className="setting-desc">Get alerts for nearby incidents</span>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => updateSetting('notifications', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
