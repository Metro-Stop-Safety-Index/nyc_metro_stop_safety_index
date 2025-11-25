import './IconButton.css';

export default function IconButton({ icon, onClick, ariaLabel }) {
  return (
    <button className="icon-btn" onClick={onClick} aria-label={ariaLabel}>
      {icon}
    </button>
  );
}
