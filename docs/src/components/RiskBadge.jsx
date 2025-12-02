import { useSettings } from '../contexts/SettingsContext.jsx';
import './RiskBadge.css';

const RISK_LABELS = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk'
};

export default function RiskBadge({ level }) {
  const { settings } = useSettings();
  const isEmoji = settings.riskDisplayMode === 'emoji';

  if (isEmoji) {
    return (
      <span className={`risk-emoji risk-emoji--${level}`}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {level === 'low' && (
            <>
              <circle cx="16" cy="16" r="14" fill="#4ADE80" />
              <circle cx="11" cy="13" r="2" fill="#1a1a1a" />
              <circle cx="21" cy="13" r="2" fill="#1a1a1a" />
              <path d="M10 19c0 0 2.5 4 6 4s6-4 6-4" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
          {level === 'moderate' && (
            <>
              <circle cx="16" cy="16" r="14" fill="#FBBF24" />
              <circle cx="11" cy="13" r="2" fill="#1a1a1a" />
              <circle cx="21" cy="13" r="2" fill="#1a1a1a" />
              <line x1="10" y1="20" x2="22" y2="20" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
          {level === 'high' && (
            <>
              <circle cx="16" cy="16" r="14" fill="#F87171" />
              <circle cx="11" cy="13" r="2" fill="#1a1a1a" />
              <circle cx="21" cy="13" r="2" fill="#1a1a1a" />
              <path d="M10 22c0 0 2.5-4 6-4s6 4 6 4" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>
      </span>
    );
  }

  return (
    <span className={`risk-badge risk-badge--${level}`}>
      {RISK_LABELS[level] || 'Unknown'}
    </span>
  );
}
