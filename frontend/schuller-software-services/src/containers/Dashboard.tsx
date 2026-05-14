import { Typography } from '@mui/material';
import { DashboardContainer } from './Dashboard.styles';

function Dashboard() {
  return (
    <DashboardContainer>
      <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
        Dashboard
      </Typography>
    </DashboardContainer>
  );
}

export default Dashboard;
