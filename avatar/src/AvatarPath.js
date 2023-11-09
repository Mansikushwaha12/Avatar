
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { useSpring, animated } from 'react-spring';
import L from 'leaflet';

const initialMarkerIcon = new L.Icon({
  iconUrl: 'path-to-your-initial-marker-icon.png',
  iconSize: [30, 30],
});

const finalMarkerIcon = new L.Icon({
  iconUrl: 'path-to-your-final-marker-icon.png',
  iconSize: [30, 30],
});

const AvatarPath = () => {
  const [initialPoint, setInitialPoint] = useState(null);
  const [finalPoint, setFinalPoint] = useState(null);
  const [formData, setFormData] = useState({ initialLat: '', initialLng: '', finalLat: '', finalLng: '' });

  const animationProps = useSpring({
    from: { position: initialPoint },
    to: { position: finalPoint },
    reset: true,
    reverse: false,
    onRest: () => {
    },
  });

  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    animationProps.to.position = [parseFloat(formData.finalLat), parseFloat(formData.finalLng)];
    setInitialPoint([parseFloat(formData.initialLat), parseFloat(formData.initialLng)]);
    setFinalPoint([parseFloat(formData.finalLat), parseFloat(formData.finalLng)]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: '500px', maxHeight: '500px', margin: '0 auto' }}>
      <h1>Avatar Path Visualization</h1>
      <div className='map-div'>
      <MapContainer center={[28.8565, 77.731578]} zoom={13} scrollWheelZoom={true} >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {initialPoint && <Marker position={initialPoint} icon={initialMarkerIcon} />}
        {finalPoint && <Marker position={finalPoint} icon={finalMarkerIcon} />}
        {initialPoint && finalPoint && <Polyline positions={[initialPoint, finalPoint]} color="blue" />}
        {initialPoint && finalPoint && (
          <animated.div
            style={{
              position: 'absolute',
              transform: animationProps.position.to((x, y) => `translate3d(${x}px, ${y}px, 0)`),
              zIndex: 1000,
            }}
          >
            {/* Your avatar component here */}
            <div style={{ width: '20px', height: '20px', backgroundColor: 'red', borderRadius: '50%' }}></div>
          </animated.div>
        )}
      </MapContainer>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label>Initial Point Latitude:</label>
        <input
          type="number"
          step="0.0001"
          name="initialLat"
          placeholder="Latitude"
          value={formData.initialLat}
          onChange={handleInputChange}
        />
        <label>Initial Point Longitude:</label>
        <input
          type="number"
          step="0.0001"
          name="initialLng"
          placeholder="Longitude"
          value={formData.initialLng}
          onChange={handleInputChange}
        />
        <label>Final Point Latitude:</label>
        <input
          type="number"
          step="0.0001"
          name="finalLat"
          placeholder="Latitude"
          value={formData.finalLat}
          onChange={handleInputChange}
        />
        <label>Final Point Longitude:</label>
        <input
          type="number"
          step="0.0001"
          name="finalLng"
          placeholder="Longitude"
          value={formData.finalLng}
          onChange={handleInputChange}
        />
        <button type="submit">Start Animation</button>
      </form>
    </div>
  );
};

export default AvatarPath;
