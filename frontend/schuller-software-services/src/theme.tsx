import { createTheme } from '@mui/material';

const sharedPalette = {
  primary: {
    main: '#FF8000',
    contrastText: '#111111',
  },
  secondary: {
    main: '#FF9A3C',
  },
};

const lightTheme = createTheme({
  palette: {
    mode: 'dark',
    ...sharedPalette,
    background: {
      paper: 'rgba(255, 128, 0, 0.06)',
    },
    text: {
      secondary: 'rgba(255,255,255,0.6)',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...sharedPalette,
    background: {
      paper: 'rgba(255, 128, 0, 0.04)',
    },
    text: {
      secondary: 'rgba(255,255,255,0.55)',
    },
  },
});

const pickTheme = (useDarkMode: boolean) => {
  return useDarkMode ? darkTheme : lightTheme;
};

export default pickTheme;
