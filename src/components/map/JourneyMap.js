"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function JourneyMap({ checkpoints = [] }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const defaultCenter = checkpoints.length > 0
      ? [checkpoints[0].lat, checkpoints[0].lng]
      : [20, 0];

    const map = L.map(mapRef.current, {
      center: defaultCenter,
      zoom: checkpoints.length > 0 ? 13 : 3,
      zoomControl: true,
      attributionControl: false,
    });

    // Clean tile layer — CartoDB Positron (free, light theme)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Attribution
    L.control.attribution({ position: "bottomright" })
      .addAttribution('&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>')
      .addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || checkpoints.length === 0) return;
    const map = mapInstance.current;

    // Clear existing layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    const bounds = [];

    // Add checkpoint markers
    checkpoints.forEach((cp, i) => {
      const isVerified = cp.verified;

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 32px; height: 32px;
          border-radius: 50%;
          background: ${isVerified ? "#10B981" : "#5BC0EB"};
          color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          font-family: 'DM Sans', sans-serif;
        ">${isVerified ? "&#10003;" : i + 1}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([cp.lat, cp.lng], { icon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: 'DM Sans', sans-serif; min-width: 160px;">
          <div style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">${cp.name}</div>
          <div style="font-size: 11px; color: #6B7280; margin-bottom: 4px;">${cp.category} · Rarity: ${cp.rarity_score}/100</div>
          <div style="font-size: 11px; color: ${isVerified ? '#10B981' : '#F59E0B'}; font-weight: 500;">
            ${isVerified ? "Verified" : "Not verified"}
          </div>
        </div>
      `);

      bounds.push([cp.lat, cp.lng]);
    });

    // Draw route line
    if (bounds.length > 1) {
      L.polyline(bounds, {
        color: "#5BC0EB",
        weight: 3,
        opacity: 0.6,
        dashArray: "8, 8",
      }).addTo(map);
    }

    // Fit bounds
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [checkpoints]);

  return <div ref={mapRef} className="w-full h-full" />;
}
