/**
 * Protected Route Component
 * Wraps routes that require authentication
 * Redirects unauthenticated users to login page
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import './ProtectedRoute.css';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="protected-route-loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content
  return children;
}
