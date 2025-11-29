import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LineBadge } from '../components';
import { getStationById, formatDate } from '../services/api';
import './DetailPage.css';

const RISK_LABELS = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk'
};

export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStation = async () => {
      setLoading(true);
      try {
        const data = await getStationById(id);
        setStation(data);
      } catch (error) {
        console.error('Failed to load station:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStation();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="loading-placeholder">
          <div className="spinner" />
          <p>Loading station details...</p>
        </div>
      </div>
    );
  }

  if (!station) {
    return (
      <div className="detail-page">
        <div className="empty-state">
          <p>Station not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <button className="back-button" onClick={() => navigate('/list')} aria-label="Go back">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="detail-title">Safety Details</h1>

      <div className={`score-card score-card--${station.riskLevel}`}>
        <div className="score-number">{station.riskScore}</div>
        <div className="score-info">
          <div className="score-station">{station.name}</div>
          <div className="score-risk">{RISK_LABELS[station.riskLevel]}</div>
        </div>
      </div>

      <div className="detail-stats">
        <div className="stat-card">
          <div className="stat-label">Risk Score</div>
          <div className="stat-value">{station.riskScore}/10</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Yearly Incidents</div>
          <div className="stat-value">{station.yearlyIncidents}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Last Major Incident</div>
          <div className="stat-value" style={{ textTransform: 'capitalize', fontSize: '0.9em' }}>
            {station.last_incident_major_type || 'None'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Last Major Date</div>
          <div className="stat-value" style={{ fontSize: '0.85em' }}>
            {station.last_incident_major_date ? formatDate(station.last_incident_major_date) : 'N/A'}
          </div>
        </div>
      </div>

      <div className="metro-lines-detail">
        <div className="lines-label">Available Lines</div>
        <div className="lines-container">
          {station.lines.map((line) => (
            <LineBadge key={line} line={line} size="large" />
          ))}
        </div>
      </div>

      <div className="incident-section">
        <h2 className="section-title">Recent Incidents</h2>
        {station.incidents.length === 0 ? (
          <div className="incident-card">
            <p className="incident-desc">No recent incidents reported</p>
          </div>
        ) : (
          station.incidents.map((incident, index) => (
            <div key={index} className="incident-card">
              <div className="incident-header">
                <div className="incident-type">{incident.type}</div>
                <div className="incident-date">{formatDate(incident.date)}</div>
              </div>
              <p className="incident-desc">{incident.PD_desc}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
