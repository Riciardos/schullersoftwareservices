import { styled } from '@mui/material/styles';

export const TabPanelContainer = styled('div')({
  textAlign: 'left',
  fontSize: 'large',
  color: 'rgba(255, 255, 255, 0.9)',
  minHeight: '150px',
  padding: '1.5rem 2rem',
  lineHeight: 1.75,
  overflowX: 'hidden',
  wordBreak: 'break-word',
  boxSizing: 'border-box',
  '& a': {
    color: '#FF9A3C',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(255, 154, 60, 0.4)',
    transition: 'border-color 0.2s',
  },
  '& a:hover': {
    borderColor: '#FF8000',
  },
  '@media (max-width: 600px)': {
    padding: '1rem',
  },
});
