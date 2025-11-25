import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, SearchBox, StationItem } from '../components';
import { getStations } from '../services/api';
import './ListPage.css';

export default function ListPage() {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const loadStations = useCallback(async (search = '') => {
    setLoading(true);
    try {
      const data = await getStations({ search });
      setStations(data);
    } catch (error) {
      console.error('Failed to load stations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStations();
  }, [loadStations]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStations(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, loadStations]);

  const handleStationClick = (stationId) => {
    navigate(`/detail/${stationId}`);
  };

  return (
    <div className="list-page">
      <div className="page-header">
        <div className="header-top">
          <IconButton
            ariaLabel="Back to home"
            onClick={() => navigate('/')}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            }
          />
          <h1 className="page-title">Subway Stops</h1>
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
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="station-list">
        {loading ? (
          <div className="loading-placeholder">
            <div className="spinner" />
            <p>Loading stations...</p>
          </div>
        ) : stations.length === 0 ? (
          <div className="empty-state">
            <p>No stations found</p>
          </div>
        ) : (
          stations.map((station) => (
            <StationItem
              key={station.id}
              station={station}
              onClick={handleStationClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
