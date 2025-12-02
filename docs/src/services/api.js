/**
 * Metro Stop Danger Index - API Service
 *
 * Backend integration interface. Toggle useMockData to switch between mock and real API.
 */

const CONFIG = {
  baseUrl: '/api',
  timeout: 10000,
  useMockData: true
};

// Metro line colors
export const LINE_COLORS = {
  '1': '#EE352E', '2': '#EE352E', '3': '#EE352E',
  '4': '#00933C', '5': '#00933C', '6': '#00933C',
  '7': '#B933AD',
  'A': '#0039A6', 'C': '#0039A6', 'E': '#0039A6',
  'B': '#FF6319', 'D': '#FF6319', 'F': '#FF6319', 'M': '#FF6319',
  'G': '#6CBE45',
  'J': '#996633', 'Z': '#996633',
  'L': '#A7A9AC',
  'N': '#FCCC0A', 'Q': '#FCCC0A', 'R': '#FCCC0A', 'W': '#FCCC0A',
  'S': '#808183'
};

// Mock data
const MOCK_STATIONS = [
  {
    id: 'lex-63',
    name: 'Lex and 63rd St',
    lines: ['Q', 'F'],
    riskLevel: 'low',
    riskScore: 3,
    yearlyIncidents: 42,
    last_incident_major_date: '2025-11-10',
    last_incident_major_type: 'theft',
    incidents: [
      { type: 'Theft', date: '2025-11-10', PD_desc: 'Minor theft reported near turnstile' }
    ]
  },
  {
    id: '57-st-f',
    name: '57 St',
    lines: ['F'],
    riskLevel: 'moderate',
    riskScore: 5,
    yearlyIncidents: 48,
    last_incident_major_date: '2025-11-19',
    last_incident_major_type: 'harassment',
    incidents: [
      { type: 'Harassment', date: '2025-11-19', PD_desc: 'Verbal harassment reported on platform' },
      { type: 'Theft', date: '2025-11-15', PD_desc: 'Pickpocketing incident during evening rush' }
    ]
  },
  {
    id: '47-50-rock',
    name: '47-50 Sts Rockefeller Ctr',
    lines: ['D', 'F', 'M', 'B'],
    riskLevel: 'low',
    riskScore: 3,
    yearlyIncidents: 35,
    last_incident_major_date: '2025-11-18',
    last_incident_major_type: 'theft',
    incidents: [
      { type: 'Theft', date: '2025-11-18', PD_desc: 'Bag snatching incident near exit' }
    ]
  },
  {
    id: '49-st',
    name: '49 St',
    lines: ['N', 'Q', 'R', 'W'],
    riskLevel: 'high',
    riskScore: 7,
    yearlyIncidents: 50,
    last_incident_major_date: '2025-11-21',
    last_incident_major_type: 'assault',
    incidents: [
      { type: 'Assault', date: '2025-11-21', PD_desc: 'Physical altercation between passengers' },
      { type: 'Theft', date: '2025-11-19', PD_desc: 'Multiple phone thefts reported' },
      { type: 'Harassment', date: '2025-11-17', PD_desc: 'Aggressive panhandling incidents' }
    ]
  },
  {
    id: '51-st',
    name: '51 St',
    lines: ['6'],
    riskLevel: 'moderate',
    riskScore: 6,
    yearlyIncidents: 56,
    last_incident_major_date: '2025-11-20',
    last_incident_major_type: 'theft',
    incidents: [
      { type: 'Theft', date: '2025-11-20', PD_desc: 'Pickpocketing reported during evening rush hour' },
      { type: 'Harassment', date: '2025-11-18', PD_desc: 'Verbal harassment incident at platform entrance' },
      { type: 'Assault', date: '2025-11-15', PD_desc: 'Minor physical altercation between passengers' }
    ]
  },
  {
    id: 'lex-53',
    name: 'Lexington Av/53 St',
    lines: ['E', 'M'],
    riskLevel: 'low',
    riskScore: 3,
    yearlyIncidents: 32,
    last_incident_major_date: '2025-11-12',
    last_incident_major_type: 'theft',
    incidents: [
      { type: 'Theft', date: '2025-11-12', PD_desc: 'Wallet theft reported' }
    ]
  },
  {
    id: '72-st',
    name: '72 St',
    lines: ['Q'],
    riskLevel: 'low',
    riskScore: 2,
    yearlyIncidents: 18,
    last_incident_major_date: null,
    last_incident_major_type: null,
    incidents: []
  },
  {
    id: '57-st-7av',
    name: '57 St/7 Av',
    lines: ['N', 'Q', 'R', 'W'],
    riskLevel: 'moderate',
    riskScore: 5,
    yearlyIncidents: 52,
    last_incident_major_date: '2025-11-16',
    last_incident_major_type: 'theft',
    incidents: [
      { type: 'Theft', date: '2025-11-16', PD_desc: 'Camera stolen from tourist' },
      { type: 'Harassment', date: '2025-11-14', PD_desc: 'Aggressive vendor confrontation' }
    ]
  },
  {
    id: 'times-sq-42',
    name: 'Times Square-42 St',
    lines: ['1', '2', '3', '7'],
    riskLevel: 'high',
    riskScore: 9,
    yearlyIncidents: 78,
    last_incident_major_date: '2025-11-21',
    last_incident_major_type: 'assault',
    incidents: [
      { type: 'Assault', date: '2025-11-21', PD_desc: 'Unprovoked attack on passenger' },
      { type: 'Theft', date: '2025-11-20', PD_desc: 'Multiple wallet thefts' },
      { type: 'Harassment', date: '2025-11-19', PD_desc: 'Group harassment incident' }
    ]
  },
  {
    id: '34-st-herald',
    name: '34 St-Herald Square',
    lines: ['D', 'F', 'M'],
    riskLevel: 'moderate',
    riskScore: 6,
    yearlyIncidents: 58,
    last_incident_major_date: '2025-11-20',
    last_incident_major_type: 'theft',
    incidents: [
      { type: 'Theft', date: '2025-11-20', PD_desc: 'Shopping bag theft near entrance' },
      { type: 'Harassment', date: '2025-11-17', PD_desc: 'Verbal altercation on platform' }
    ]
  }
];

let lastUpdated = new Date();

// Helpers
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getLineColor = (line) => LINE_COLORS[line] || '#888888';

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const timeAgo = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

// API request helper
const request = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);

  try {
    const response = await fetch(`${CONFIG.baseUrl}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// API Methods
export const getStations = async (params = {}) => {
  if (CONFIG.useMockData) {
    await delay(300);

    let stations = [...MOCK_STATIONS];

    if (params.search) {
      const query = params.search.toLowerCase();
      stations = stations.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.lines.some(l => l.toLowerCase().includes(query))
      );
    }

    if (params.sortBy === 'riskScore') {
      stations.sort((a, b) => {
        const diff = a.riskScore - b.riskScore;
        return params.order === 'desc' ? -diff : diff;
      });
    } else {
      stations.sort((a, b) => a.name.localeCompare(b.name));
    }

    return stations;
  }

  const queryString = new URLSearchParams(params).toString();
  return request(`/stations?${queryString}`);
};

export const getStationById = async (stationId) => {
  if (CONFIG.useMockData) {
    await delay(200);
    const station = MOCK_STATIONS.find(s => s.id === stationId);
    if (!station) throw new Error('Station not found');
    return station;
  }

  return request(`/stations/${stationId}`);
};

export const getLastUpdated = async () => {
  if (CONFIG.useMockData) {
    return {
      timestamp: lastUpdated,
      formatted: timeAgo(lastUpdated)
    };
  }

  return request('/status/last-updated');
};

export const getNearbyStations = async (lat, lng, radius = 500) => {
  if (CONFIG.useMockData) {
    await delay(300);
    return MOCK_STATIONS.slice(0, 5);
  }

  return request(`/stations/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
};

export const reportIncident = async (incident) => {
  if (CONFIG.useMockData) {
    await delay(500);
    return {
      success: true,
      id: `incident-${Date.now()}`,
      message: 'Incident reported successfully'
    };
  }

  return request('/incidents', {
    method: 'POST',
    body: JSON.stringify(incident)
  });
};

// Config
export const setMockMode = (enable) => {
  CONFIG.useMockData = enable;
};

export const configure = (newConfig) => {
  Object.assign(CONFIG, newConfig);
};
