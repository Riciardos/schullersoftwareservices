import { Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

export const MapWrapper = styled('div')({
  width: '100%',
  borderRadius: '10px',
  overflow: 'hidden',
  background: 'rgba(0, 0, 0, 0.4)',
  position: 'relative',
});

export const MapControls = styled('div')({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  zIndex: 10,
});

export const ZoomButton = styled('button')({
  width: 28,
  height: 28,
  background: 'rgba(0,0,0,0.6)',
  border: '1px solid rgba(255,128,0,0.4)',
  borderRadius: 6,
  color: '#FF8000',
  fontSize: '1rem',
  lineHeight: 1,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': { background: 'rgba(255,128,0,0.15)' },
});

export const StatsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.5rem',
});

export const StatCard = styled('div')({
  background: 'rgba(255, 128, 0, 0.08)',
  border: '1px solid rgba(255, 128, 0, 0.15)',
  borderRadius: '8px',
  padding: '0.5rem 0.75rem',
});

export const StatLabel = styled(Typography)({
  color: 'rgba(255,255,255,0.45)',
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
});

export const StatValue = styled(Typography)({
  color: 'white',
  fontSize: '0.9rem',
  fontWeight: 600,
  lineHeight: 1.2,
});

const pulse = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(2); }
  100% { opacity: 1; transform: scale(1); }
`;

export const PulseRing = styled('circle')({
  animation: `${pulse} 2s ease-in-out infinite`,
  transformOrigin: 'center',
  transformBox: 'fill-box',
});

export const LiveBadge = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.7rem',
  color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

export const LiveDot = styled('span')({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: '#FF8000',
  display: 'inline-block',
  animation: `${pulse} 2s ease-in-out infinite`,
});
