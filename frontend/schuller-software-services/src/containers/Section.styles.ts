import { styled } from '@mui/material/styles';

export const SectionContainer = styled('section')({
  flex: 1,
  minWidth: 0,
  maxWidth: '100vh',
  minHeight: '60vh',
  background: 'rgba(255, 128, 0, 0.05)',
  backdropFilter: 'blur(14px)',
  borderRadius: '18px',
  border: '1px solid rgba(255, 128, 0, 0.2)',
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 128, 0, 0.1)',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 900px)': {
    width: '90%',
    flex: 'none',
  },
});
