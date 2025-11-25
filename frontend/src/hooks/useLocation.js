import { useState, useEffect, useCallback } from 'react';

const LOCATION_PERMISSION_KEY = 'metro-app-location-permission';

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(() => {
    return localStorage.getItem(LOCATION_PERMISSION_KEY) || 'prompt'; // 'prompt', 'granted', 'denied'
  });

  // Check if we've asked for permission before
  const hasAskedPermission = () => {
    return localStorage.getItem(LOCATION_PERMISSION_KEY) !== null;
  };

  // Update permission status in localStorage
  const updatePermissionStatus = (status) => {
    localStorage.setItem(LOCATION_PERMISSION_KEY, status);
    setPermissionStatus(status);
  };

  // Get current position
  const getCurrentPosition = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setLocation(coords);
          setLoading(false);
          updatePermissionStatus('granted');
          resolve(coords);
        },
        (err) => {
          setLoading(false);
          setError(err.message);
          if (err.code === err.PERMISSION_DENIED) {
            updatePermissionStatus('denied');
          }
          reject(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }, []);

  // Request permission and get location
  const requestLocation = useCallback(async () => {
    try {
      const coords = await getCurrentPosition();
      return coords;
    } catch (err) {
      console.error('Failed to get location:', err);
      throw err;
    }
  }, [getCurrentPosition]);

  // Deny permission (user chose not to share)
  const denyPermission = useCallback(() => {
    updatePermissionStatus('denied');
  }, []);

  // Reset permission (allow asking again)
  const resetPermission = useCallback(() => {
    localStorage.removeItem(LOCATION_PERMISSION_KEY);
    setPermissionStatus('prompt');
    setLocation(null);
  }, []);

  // Auto-fetch location if previously granted
  useEffect(() => {
    if (permissionStatus === 'granted' && !location) {
      getCurrentPosition().catch(() => {});
    }
  }, [permissionStatus, location, getCurrentPosition]);

  return {
    location,
    loading,
    error,
    permissionStatus,
    hasAskedPermission,
    requestLocation,
    denyPermission,
    resetPermission
  };
}
