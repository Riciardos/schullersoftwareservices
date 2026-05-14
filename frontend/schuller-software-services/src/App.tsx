import { Button, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import Section from './containers/Section';
import pickTheme from './theme';
import GoogleAuth from './components/GoogleAuth';
import AuthProvider from './containers/AuthProvider';
import Welcome from './containers/Welcome';
import { AppRoot, AppHeader, AppFooter, GradientTitle, FooterAddress } from './App.styles';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <AppRoot>
      <ParticleBackground />
      <AuthProvider>
        <ThemeProvider theme={pickTheme(prefersDarkMode)}>
          <CssBaseline />
          <AppHeader>
            <GradientTitle>Schuller Software Services</GradientTitle>
          </AppHeader>

          <Section />

          <AppFooter>
            <Welcome />
            <GoogleAuth />
            <div>
              <Button variant="outlined" href="https://www.github.com/riciardos">
                Github
              </Button>
              <Button
                variant="contained"
                href="https://www.linkedin.com/in/ricardo-schuller-944750110"
              >
                LinkedIn
              </Button>
            </div>
            <FooterAddress>Address: Vijfhuizerdijk 226, Vijfhuizen, The Netherlands</FooterAddress>
            Phone: +31621705940, taxcode: NL004009717B15
          </AppFooter>
        </ThemeProvider>
      </AuthProvider>
    </AppRoot>
  );
}

export default App;
