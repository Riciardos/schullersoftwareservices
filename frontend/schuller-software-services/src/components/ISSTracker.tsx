import { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';
import {
  LiveBadge,
  LiveDot,
  MapWrapper,
  PulseRing,
  StatCard,
  StatLabel,
  StatValue,
  StatsGrid,
} from './ISSTracker.styles';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const ISS_API = 'https://api.wheretheiss.at/v1/satellites/25544';
const POLL_MS = 5000;
const TRAIL_LENGTH = 20;

interface ISSData {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
}

function ISSTracker() {
  const [data, setData] = useState<ISSData | null>(null);
  const trail = useRef<[number, number][]>([]);

  useEffect(() => {
    const poll = () => {
      fetch(ISS_API)
        .then((r) => r.json())
        .then((d: ISSData) => {
          trail.current = [
            ...trail.current.slice(-(TRAIL_LENGTH - 1)),
            [d.longitude, d.latitude],
          ];
          setData(d);
        })
        .catch(() => {});
    };

    poll();
    const id = setInterval(poll, POLL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <LiveBadge>
        <LiveDot />
        ISS live position
      </LiveBadge>

      <MapWrapper>
        <ComposableMap
          projection="geoEquirectangular"
          style={{ width: '100%', height: 'auto' }}
          projectionConfig={{ scale: 95 }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: '#2a2a2a', stroke: '#444', strokeWidth: 0.4, outline: 'none' },
                    hover: { fill: '#2a2a2a', outline: 'none' },
                    pressed: { fill: '#2a2a2a', outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {trail.current.length > 1 && (
            <Line
              coordinates={trail.current}
              stroke="#FF8000"
              strokeWidth={1}
              strokeOpacity={0.4}
              strokeDasharray="3 3"
            />
          )}

          {data && (
            <Marker coordinates={[data.longitude, data.latitude]}>
              <PulseRing cx={0} cy={0} r={6} fill="#FF8000" fillOpacity={0.3} stroke="none" />
              <circle cx={0} cy={0} r={3} fill="#FF8000" stroke="#fff" strokeWidth={0.8} />
            </Marker>
          )}
        </ComposableMap>
      </MapWrapper>

      {data ? (
        <StatsGrid>
          <StatCard>
            <StatLabel>Altitude</StatLabel>
            <StatValue>{Math.round(data.altitude).toLocaleString()} km</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Velocity</StatLabel>
            <StatValue>{Math.round(data.velocity).toLocaleString()} km/h</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Latitude</StatLabel>
            <StatValue>{data.latitude.toFixed(2)}°</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Longitude</StatLabel>
            <StatValue>{data.longitude.toFixed(2)}°</StatValue>
          </StatCard>
          <StatCard style={{ gridColumn: '1 / -1' }}>
            <StatLabel>Visibility</StatLabel>
            <StatValue>{data.visibility === 'daylight' ? '☀ Daylight' : '🌑 Eclipse'}</StatValue>
          </StatCard>
        </StatsGrid>
      ) : (
        <StatLabel>Acquiring signal…</StatLabel>
      )}
    </>
  );
}

export default ISSTracker;
