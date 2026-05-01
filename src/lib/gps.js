/**
 * GPS Validation Helpers
 * Haversine formula for distance calculation + validation
 */

const EARTH_RADIUS_METERS = 6371000;

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Calculate distance between two GPS coordinates using Haversine formula
 * @returns distance in meters
 */
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_METERS * c;
}

/**
 * Check if user position is within radius of checkpoint
 * Default radius: 150 meters
 */
export function isWithinRadius(userLat, userLng, checkpointLat, checkpointLng, radiusMeters = 150) {
  const distance = haversineDistance(userLat, userLng, checkpointLat, checkpointLng);
  return {
    within: distance <= radiusMeters,
    distance: Math.round(distance),
    radius: radiusMeters,
  };
}

/**
 * Get current GPS position from browser
 * @returns Promise<{lat, lng, accuracy}>
 */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        });
      },
      (err) => reject(err),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Format distance for display
 */
export function formatDistance(meters) {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}
