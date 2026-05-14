import { Box, Button, Card, CardContent, FormControlLabel, Switch, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AppRoot, AppHeader, GradientTitle, MainContent } from "../App.styles";
import { useContext } from "react";
import { AuthContext } from "../containers/AuthProvider";
import { UserProfileContext } from "../containers/UserProfileProvider";
import ParticleBackground from "../components/ParticleBackground";

function UserArea() {
  const { authenticated } = useContext(AuthContext);
  const { enableParticles, setEnableParticles } = useContext(UserProfileContext);

  return (
    <AppRoot>
      <ParticleBackground />
      <AppHeader>
        <GradientTitle>User Area</GradientTitle>
      </AppHeader>
      <MainContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {authenticated ? (
            <Card sx={{ background: 'rgba(255,128,0,0.08)', border: '1px solid rgba(255,128,0,0.15)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" color="white" gutterBottom>Preferences</Typography>
                <FormControlLabel
                  label={<Typography color="white">Enable particles</Typography>}
                  control={
                    <Switch
                      checked={enableParticles}
                      onChange={(e) => setEnableParticles(e.target.checked)}
                      sx={{ '& .MuiSwitch-thumb': { backgroundColor: '#FF8000' } }}
                    />
                  }
                />
              </CardContent>
            </Card>
          ) : (
            <Typography color="white">Please sign in to manage your preferences.</Typography>
          )}
          <Link to="/"><Button>Take the yellow brick road back home, Dorothy!</Button></Link>
        </Box>
      </MainContent>
    </AppRoot>
  );
}

export default UserArea;