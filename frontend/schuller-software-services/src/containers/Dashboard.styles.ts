import { styled } from '@mui/material/styles';

export const DashboardContainer = styled('aside')({
  width: '320px',
  flexShrink: 0,
  maxWidth: '80vh',
  minHeight: '60vh',
  background: 'rgba(255, 128, 0, 0.05)',
  backdropFilter: 'blur(14px)',
  borderRadius: '18px',
  border: '1px solid rgba(255, 128, 0, 0.2)',
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 128, 0, 0.1)',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '@media (max-width: 900px)': {
    width: '80%',
  },
});
