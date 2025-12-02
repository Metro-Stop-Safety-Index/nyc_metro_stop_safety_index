import { getLineColor } from '../services/api.js';
import './LineBadge.css';

export default function LineBadge({ line, size = 'small' }) {
  return (
    <span
      className={`line-badge line-badge--${size}`}
      style={{ backgroundColor: getLineColor(line) }}
    >
      {line}
    </span>
  );
}
