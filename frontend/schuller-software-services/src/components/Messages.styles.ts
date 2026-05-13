import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const MessagesContainer = styled('div')({
  padding: '16px',
});

export const InputRow = styled('div')({
  display: 'flex',
  gap: '8px',
  marginBottom: '16px',
});

export const StyledTextField = styled(TextField)({
  '& input': {
    color: 'white',
  },
});

export const EmptyMessage = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '0.9rem',
});

export const LoadMoreContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px',
});

export const LoginPrompt = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.6)',
  padding: '16px',
});
