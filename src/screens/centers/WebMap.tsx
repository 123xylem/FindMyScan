import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AppStackScreenProps } from "../../types";
import type { ScanCenter } from "../../types";
import { StyleSheet } from "react-native";

// Fix for Leaflet marker icons in webpack
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Props = {
  centers: ScanCenter[];
  onSelectCenter: (center: ScanCenter) => void;
};

// Use same center as MapScreen
const LONDON_CENTER = {
  latitude: 51.5074,
  longitude: -0.1278,
  zoom: 14,
};

export const WebMap = ({ centers, onSelectCenter }: Props) => {
  return (
    <div style={styles.container}>
      <MapContainer
        center={[LONDON_CENTER.latitude, LONDON_CENTER.longitude]}
        zoom={LONDON_CENTER.zoom}
        style={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {centers.map((center) => (
          <Marker
            key={center.id}
            position={[center.latitude, center.longitude]}
            eventHandlers={{
              click: () => onSelectCenter(center),
            }}
          >
            <Popup>
              <div>
                <h3>{center.name}</h3>
                <p>{center.address}</p>
                <p>⭐ {center.rating?.toFixed(1)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
