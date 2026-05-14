import { Suspense, lazy } from 'react';
import { Button, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Section from './containers/Section';
import pickTheme from './theme';
import GoogleAuth from './components/GoogleAuth';
import AuthProvider from './containers/AuthProvider';
import Welcome from './containers/Welcome';
import { AppRoot, AppHeader, AppFooter, GradientTitle, FooterAddress, MainContent } from './App.styles';
import Playground from './pages/Playground';
import UserArea from './pages/UserArea';
import UserProfileProvider from './containers/UserProfileProvider';

const ParticleBackground = lazy(() => import('./components/ParticleBackground'));
const Dashboard = lazy(() => import('./containers/Dashboard'));

function Home() {
  return (
    <AppRoot>
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
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
            <Button variant="outlined" component={Link} to="/playground">
              Playground
            </Button>
            <Button variant="outlined" component={Link} to="/user-area">
              User Area
            </Button>
          </div>
          <FooterAddress>Address: Vijfhuizerdijk 226, Vijfhuizen, The Netherlands</FooterAddress>
          Phone: +31621705940, taxcode: NL004009717B15
        </AppFooter>
    </AppRoot>
  );
}

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={pickTheme(prefersDarkMode)}>
      <CssBaseline />
      <AuthProvider>
        <UserProfileProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/user-area" element={<UserArea />} />
            </Routes>
          </BrowserRouter>
        </UserProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
