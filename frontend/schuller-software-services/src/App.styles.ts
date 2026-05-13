import { styled } from '@mui/material/styles';

export const AppRoot = styled('div')({
  background:
    'linear-gradient(135deg, #0a1628 0%, #0d2b4a 30%, #0e4d6e 60%, #167096 80%, #1a9b8a 100%)',
  minHeight: '100vh',
  textAlign: 'center',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const AppHeader = styled('header')({
  minHeight: '20vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 1rem',
  width: '100%',
  background: 'rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(6px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  boxSizing: 'border-box',
});

export const GradientTitle = styled('h1')({
  margin: 0,
  fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  background: 'linear-gradient(90deg, #ffffff 0%, #7dd8f0 50%, #40e0d0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const AppFooter = styled('footer')({
  minHeight: '20vh',
  flex: 'auto',
  fontSize: 'calc(10px + 0.5vmin)',
  padding: '2rem 1rem',
  width: '100%',
  background: 'rgba(0, 0, 0, 0.35)',
  backdropFilter: 'blur(6px)',
  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  boxSizing: 'border-box',
});

export const FooterAddress = styled('address')({
  color: 'rgba(255, 255, 255, 0.65)',
  fontStyle: 'normal',
});
