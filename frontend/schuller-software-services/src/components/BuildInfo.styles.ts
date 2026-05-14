import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const BuildInfoContainer = styled('div')({
  padding: '1.5rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const Row = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
});

export const Label = styled(Typography)({
  color: 'rgba(255,255,255,0.55)',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  minWidth: '110px',
});

export const ScoresRow = styled('div')({
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap',
});

export const ScoreCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.4rem',
});

export const ScoreCircle = styled('div')<{ score: number }>(({ score }) => ({
  width: 56,
  height: 56,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: '1rem',
  border: `3px solid ${score >= 90 ? '#0cce6b' : score >= 50 ? '#ffa400' : '#ff4e42'}`,
  color: score >= 90 ? '#0cce6b' : score >= 50 ? '#ffa400' : '#ff4e42',
}));

export const ScoreLabel = styled(Typography)({
  color: 'rgba(255,255,255,0.65)',
  fontSize: '0.75rem',
  textAlign: 'center',
});

export const StatusDot = styled('span')<{ success: boolean }>(({ success }) => ({
  display: 'inline-block',
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: success ? '#0cce6b' : '#ff4e42',
  flexShrink: 0,
}));
