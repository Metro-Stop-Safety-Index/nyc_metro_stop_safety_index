# Metro Stop Danger Index

A mobile-first web application for viewing real-time safety ratings and incident reports for subway stations. Users can search stations, view detailed safety metrics, and enable location services to find nearby stations.

## Features

### Core Functionality
- **User Authentication** - Secure login with Firebase (Email/Password or Guest mode)
- **Station Search** - Search and browse all subway stations with real-time safety ratings
- **Safety Ratings** - View comprehensive danger index scores with visual indicators (text or emoji mode)
- **Detailed Reports** - Access detailed incident statistics and recent incident reports
- **Location Services** - Enable GPS to find nearby stations and receive location-based safety alerts
- **Responsive Design** - Optimized for mobile devices with touch-friendly interactions

### User Interface
- **Welcome Page** - App introduction with authentication options (Sign In / Continue as Guest)
- **Login Page** - Email/password login with guest access option
- **Signup Page** - New user registration with email verification
- **Station List** - Searchable list of all stations with risk badges and line indicators
- **Station Detail** - Comprehensive safety information including:
  - Overall danger score (1-10 scale)
  - Yearly incident counts
  - Last major incident type and date
  - Recent incident timeline (last 3 incidents)
  - Available metro lines
- **Settings** - User account management and preferences

### Settings & Preferences
- **Account Management** - View account info, upgrade guest accounts, logout
- **Risk Display Mode** - Toggle between text labels and emoji indicators
- **Location Access** - Enable/disable GPS location services
- **Search Radius** - Configure nearby station detection range (250m - 2km)
- **Push Notifications** - Opt-in for safety alerts

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7
- **Routing**: React Router DOM
- **Authentication**: Firebase Authentication (Email/Password + Anonymous)
- **State Management**: React Context API
- **Styling**: CSS Modules with CSS Variables
- **APIs**: Firebase Auth, Geolocation API, localStorage

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── IconButton.jsx
│   ├── LineBadge.jsx
│   ├── LocationModal.jsx
│   ├── ProtectedRoute.jsx  # Auth route protection
│   ├── RiskBadge.jsx
│   ├── SearchBox.jsx
│   └── StationItem.jsx
├── config/             # Configuration files
│   └── firebase.js     # Firebase initialization
├── contexts/           # React Context providers
│   ├── AuthContext.jsx      # Authentication state
│   └── SettingsContext.jsx  # User preferences
├── hooks/              # Custom React hooks
│   └── useLocation.js
├── pages/              # Page components
│   ├── WelcomePage.jsx
│   ├── LoginPage.jsx        # Email/password login
│   ├── SignupPage.jsx       # User registration
│   ├── ListPage.jsx
│   ├── DetailPage.jsx
│   └── SettingsPage.jsx
├── services/           # API and data services
│   └── api.js
├── styles/             # Global styles
│   └── index.css
├── App.jsx             # Root component with routing
└── main.jsx            # Application entry point
```

## Installation

### Prerequisites
- Node.js 18+ and npm
- Firebase account (for authentication)

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd metro-stop-danger-index
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication → Email/Password
   - Enable Authentication → Anonymous
   - Get your Firebase config from Project Settings
   - Create `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start development server
```bash
npm run dev
```

The app will be available at `https://localhost:5175/` (HTTPS required for geolocation)

## Development

### Running with HTTPS (for mobile testing)

Mobile browsers require HTTPS for location services and Firebase authentication. The dev server is pre-configured with SSL:

```bash
npm run dev
```

Access via:
- Local: `https://localhost:5175/`
- Network: `https://<your-ip>:5175/`

**Note**: You'll need to accept the self-signed certificate warning in your browser.

### Building for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Backend Integration

The app uses a mock data layer by default. To connect to a real backend:

1. Open `src/services/api.js`
2. Update the configuration:

```javascript
const CONFIG = {
  baseUrl: 'https://your-api-endpoint.com/api',
  useMockData: false
};
```

### API Endpoints Required

The backend should implement the following endpoints:

- `GET /stations` - List all stations (supports `?search=` query)
- `GET /stations/:id` - Get station details
- `GET /stations/nearby?lat=&lng=&radius=` - Get nearby stations
- `GET /status/last-updated` - Get last data update timestamp
- `POST /incidents` - Report a new incident (optional)

### Response Format Examples

**Station List:**
```json
[
  {
    "id": "station-id",
    "name": "Station Name",
    "lines": ["A", "C"],
    "riskLevel": "low",
    "riskScore": 3
  }
]
```

**Station Detail:**
```json
{
  "id": "station-id",
  "name": "Station Name",
  "lines": ["A", "C"],
  "riskLevel": "low",
  "riskScore": 3,
  "yearlyIncidents": 42,
  "last_incident_major_date": "2025-11-10",
  "last_incident_major_type": "theft",
  "incidents": [
    {
      "type": "Theft",
      "date": "2025-11-10",
      "PD_desc": "Incident description provided by PD"
    }
  ]
}
```

**Note:**
- `riskScore` is on a scale of 1-10
- `yearlyIncidents` represents average incidents per station per year
- `last_incident_major_date` and `last_incident_major_type` track the most recent major incident
- `incidents` array contains the last three incidents with descriptions provided by police department (PD_desc)

## Configuration

### Metro Line Colors

Edit line colors in `src/services/api.js`:

```javascript
export const LINE_COLORS = {
  '1': '#EE352E',
  'A': '#0039A6',
  // Add more lines...
};
```

### Default Settings

Modify default user preferences in `src/contexts/SettingsContext.jsx`:

```javascript
const defaultSettings = {
  riskDisplayMode: 'text',  // 'text' or 'emoji'
  notifications: true,
  darkMode: true,
  searchRadius: '500'       // '250', '500', '1000', '2000' (meters)
};
```

### Authentication

The app uses Firebase Authentication with two modes:
- **Email/Password**: Standard user registration and login
- **Anonymous**: Guest access without account creation

Routes are protected using the `ProtectedRoute` component. Unauthenticated users are redirected to the login page.

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## Features Roadmap

- [x] Firebase authentication (Email/Password + Anonymous)
- [x] Protected routes and user sessions
- [x] Guest account upgrade flow
- [ ] Social authentication (Google, Apple)
- [ ] Real-time incident notifications
- [ ] Historical safety trends
- [ ] Route safety planning
- [ ] Community incident reporting
- [ ] Offline mode support
- [ ] Cloud sync for user preferences

## License

MIT
