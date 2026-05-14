import { styled, keyframes } from '@mui/material/styles';

export const AppRoot = styled('div')({
  background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1410 30%, #1f1a12 60%, #1a1410 80%, #111111 100%)',
  minHeight: '100vh',
  textAlign: 'center',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const AppHeader = styled('header')({
  position: 'relative',
  zIndex: 1,
  minHeight: '20vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 1rem',
  width: '100%',
  background: 'rgba(0, 0, 0, 0)',
  backdropFilter: 'blur(2px)',
  borderBottom: '1px solid rgba(255, 128, 0, 0.2)',
  boxSizing: 'border-box',
});

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const GradientTitle = styled('h1')({
  margin: 0,
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: 'clamp(2.2rem, 6vw, 4rem)',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  background: 'linear-gradient(90deg, #ffffff 0%, #FF9A3C 33%, #FF8000 66%, #ffffff 100%)',
  backgroundSize: '300% 300%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: `${gradientShift} 6s ease infinite`,
});

export const AppFooter = styled('footer')({
  position: 'relative',
  zIndex: 1,
  minHeight: '20vh',
  flex: 'auto',
  fontSize: 'calc(10px + 0.5vmin)',
  padding: '2rem 1rem',
  width: '100%',
  background: 'rgba(0, 0, 0, 0)',
  backdropFilter: 'blur(2px)',
  borderTop: '1px solid rgba(255, 128, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  boxSizing: 'border-box',
});

export const MainContent = styled('main')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '1.5rem',
  width: '100%',
  padding: '0 2rem',
  boxSizing: 'border-box',
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0',
  },
});

export const FooterAddress = styled('address')({
  color: 'rgba(255, 255, 255, 0.55)',
  fontStyle: 'normal',
});
