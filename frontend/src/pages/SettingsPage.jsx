import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useLocation } from '../hooks/useLocation';
import './SettingsPage.css';

export default function SettingsPage() {
  const navigate = useNavigate();
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

  return (
    <div className="settings-page">
      <button className="back-button" onClick={() => navigate('/list')} aria-label="Go back">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="settings-title">Settings</h1>

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

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-name">Dark Mode</span>
            <span className="setting-desc">Use dark theme</span>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => updateSetting('darkMode', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-name">Language</span>
            <span className="setting-desc">Select display language</span>
          </div>
          <select
            className="setting-select"
            value={settings.language}
            onChange={(e) => updateSetting('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="es">Español</option>
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

      <div className="settings-section">
        <h2 className="section-label">Data</h2>

        <div className="setting-item clickable">
          <div className="setting-info">
            <span className="setting-name">Clear Cache</span>
            <span className="setting-desc">Remove locally stored data</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-label">About</h2>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-name">Version</span>
          </div>
          <span className="setting-value">1.0.0</span>
        </div>

        <div className="setting-item clickable">
          <div className="setting-info">
            <span className="setting-name">Privacy Policy</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>

        <div className="setting-item clickable">
          <div className="setting-info">
            <span className="setting-name">Terms of Service</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
