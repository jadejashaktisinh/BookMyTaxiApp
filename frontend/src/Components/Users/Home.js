import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import axios from 'axios';
import './Home.css';

export default function Home() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');

  const GEOCODE_API_KEY = 'b6c761d3da3f4599aa4fc4637807e570';

  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = L.map(mapRef.current).setView([22.3039, 70.8022], 12);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(newMap);

      setMap(newMap);
    }
  }, [map]);

  const geocodeCity = async (city) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${GEOCODE_API_KEY}`
      );
      const { results } = response.data;

      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry;
        return [lat, lng];
      } else {
        throw new Error(`No results found for "${city}".`);
      }
    } catch (error) {
      console.error('Geocoding error:', error.message);
      setError(error.message);
      return null;
    }
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${GEOCODE_API_KEY}`
      );
      const { results } = response.data;

      if (results && results.length > 0) {
        return results[0].formatted;
      } else {
        return 'Unknown Location';
      }
    } catch (error) {
      console.error('Reverse Geocoding error:', error.message);
      return 'Unknown Location';
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    const startCoords = await geocodeCity(currentLocation);
    const destCoords = await geocodeCity(destination);

    if (startCoords && destCoords) {

      const startCity = await reverseGeocode(startCoords[0], startCoords[1]);
      const destCity = await reverseGeocode(destCoords[0], destCoords[1]);

      if (routingControl) {
        map.removeControl(routingControl);
      }

      const customIcon = L.divIcon({
        html: `<i class="fa-solid fa-location-dot" style="font-size: 24px; color: red;"></i>`,
        className: 'custom-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      });

      const newRoutingControl = L.Routing.control({
        waypoints: [
          L.latLng(startCoords[0], startCoords[1]),
          L.latLng(destCoords[0], destCoords[1]),
        ],
        routeWhileDragging: true,
        createMarker: function (i, waypoint) {
          const marker = L.marker(waypoint.latLng, { icon: customIcon });
          if (i === 0) {
            marker.bindPopup(`<b>Start:</b> ${startCity}`).openPopup();
          } else if (i === 1) {
            marker.bindPopup(`<b>Destination:</b> ${destCity}`).openPopup();
          }
          return marker;
        },
        show: false, 
      }).addTo(map);

      setRoutingControl(newRoutingControl);
    }
  };

  return (
    <>
      <div className="header">Enter Current Location And Destination</div>
      <div id="map" ref={mapRef} className="map-container"></div>
      <form onSubmit={handleFormSubmit}>
        <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
          <input type="text" placeholder="Enter Your City" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} id="curlocation"/>
          <input type="text" placeholder="Enter Destination City" value={destination} onChange={(e) => setDestination(e.target.value)} id="destination"/>
        </div>
        <input type="submit" value="Show Route" />
      </form>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </>
  );
}
