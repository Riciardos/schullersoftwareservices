import { createTheme } from '@mui/material';

const BODY_FONT = "'Space Grotesk', sans-serif";

const sharedPalette = {
  primary: {
    main: '#FF8000',
    contrastText: '#111111',
  },
  secondary: {
    main: '#FF9A3C',
  },
};

const sharedTypography = {
  fontFamily: BODY_FONT,
  button: {
    fontFamily: BODY_FONT,
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
};

const sharedComponents = {
  MuiCssBaseline: {
    styleOverrides: {
      body: { fontFamily: BODY_FONT },
    },
  },
};

const lightTheme = createTheme({
  palette: {
    mode: 'dark',
    ...sharedPalette,
    background: { paper: 'rgba(255, 128, 0, 0.06)' },
    text: { secondary: 'rgba(255,255,255,0.6)' },
  },
  typography: sharedTypography,
  components: sharedComponents,
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...sharedPalette,
    background: { paper: 'rgba(255, 128, 0, 0.04)' },
    text: { secondary: 'rgba(255,255,255,0.55)' },
  },
  typography: sharedTypography,
  components: sharedComponents,
});

const pickTheme = (useDarkMode: boolean) => {
  return useDarkMode ? darkTheme : lightTheme;
};

export default pickTheme;
