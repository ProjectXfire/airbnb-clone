'use client';

import 'leaflet/dist/leaflet.css';
import styles from '@modules/places/styles/Location.module.scss';
import L from 'leaflet';
import MarkerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: MarkerIcon.src,
  iconRetinaUrl: MarkerIcon2x.src,
  shadowUrl: MarkerShadow.src
});

interface Props {
  center?: number[];
}

const INIT_POS = [51, -0.09];

function Map({ center }: Props): JSX.Element {
  return (
    <MapContainer
      className={styles.map}
      center={(center as L.LatLngExpression) ?? INIT_POS}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
}
export default Map;
