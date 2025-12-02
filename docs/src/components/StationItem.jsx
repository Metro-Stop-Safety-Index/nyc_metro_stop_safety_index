import LineBadge from './LineBadge.jsx';
import RiskBadge from './RiskBadge.jsx';
import './StationItem.css';

export default function StationItem({ station, onClick }) {
  return (
    <div className="station-item" onClick={() => onClick(station.id)}>
      <div className="station-header">
        <h3 className="station-name">{station.name}</h3>
        <RiskBadge level={station.riskLevel} />
      </div>
      <div className="metro-lines">
        {station.lines.map((line) => (
          <LineBadge key={line} line={line} size="small" />
        ))}
      </div>
    </div>
  );
}
