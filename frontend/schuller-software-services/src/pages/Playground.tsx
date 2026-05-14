import { Button, Typography } from '@mui/material';
import { AppRoot, AppHeader, GradientTitle, MainContent } from '../App.styles';
import { Link } from 'react-router-dom';

function Playground() {
  return (
    <AppRoot>
      <AppHeader>
        <GradientTitle>Playground</GradientTitle>
      </AppHeader>
      <MainContent>
        <Typography color="white">Coming soon.</Typography>
        <Link to="/"><Button>Take the yellow brick road back home Dorothy!</Button></Link>
      </MainContent>
    </AppRoot>
  );
}

export default Playground;
