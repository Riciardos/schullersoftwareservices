import { Suspense, lazy } from 'react';
import { Button, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import Section from './containers/Section';
import pickTheme from './theme';
import GoogleAuth from './components/GoogleAuth';
import AuthProvider from './containers/AuthProvider';
import Welcome from './containers/Welcome';
import { AppRoot, AppHeader, AppFooter, GradientTitle, FooterAddress, MainContent } from './App.styles';

const ParticleBackground = lazy(() => import('./components/ParticleBackground'));
const Dashboard = lazy(() => import('./containers/Dashboard'));

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <AppRoot>
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <AuthProvider>
        <ThemeProvider theme={pickTheme(prefersDarkMode)}>
          <CssBaseline />
          <AppHeader>
            <GradientTitle>Schuller Software Services</GradientTitle>
          </AppHeader>

          <MainContent>
            <Section />
            <Suspense fallback={null}>
              <Dashboard />
            </Suspense>
          </MainContent>

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
