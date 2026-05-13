import { styled } from '@mui/material/styles';

export const TabPanelContainer = styled('div')({
  textAlign: 'left',
  fontSize: 'large',
  color: 'rgba(255, 255, 255, 0.9)',
  minHeight: '150px',
  padding: '1.5rem 2rem',
  lineHeight: 1.75,
  '& a': {
    color: '#7dd8f0',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(125, 216, 240, 0.4)',
    transition: 'border-color 0.2s',
  },
  '& a:hover': {
    borderColor: '#7dd8f0',
  },
});
