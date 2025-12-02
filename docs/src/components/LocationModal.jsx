import './LocationModal.css';

export default function LocationModal({ onAllow, onDeny }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5B9A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h2 className="modal-title">Enable Location</h2>
        <p className="modal-desc">
          Allow Metro Stop Danger Index to access your location to find nearby stations and provide personalized safety alerts.
        </p>
        <div className="modal-actions">
          <button className="modal-btn modal-btn--secondary" onClick={onDeny}>
            Not Now
          </button>
          <button className="modal-btn modal-btn--primary" onClick={onAllow}>
            Allow
          </button>
        </div>
      </div>
    </div>
  );
}
