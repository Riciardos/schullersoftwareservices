import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Divider, List, ListItem, ListItemText, useTheme } from '@mui/material';
import TabPanel from '../components/TabPanel';
import Messages from '../components/Messages';
import BuildInfo from '../components/BuildInfo';
import { SectionContainer } from './Section.styles';

function Section() {
  const theme = useTheme();
  const [chosenIndex, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <SectionContainer>
      <Tabs
        value={chosenIndex}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab value={0} label="Intro" />
        <Tab value={1} label="Motivation" />
        <Tab value={2} label="Experience" />
        <Tab value={3} label="Messages" />
        <Tab value={4} label="Built with" />
      </Tabs>

      <TabPanel chosenIndex={chosenIndex} index={0} dir={theme.direction}>
        Seasoned Software Engineer based in the Netherlands, specialising in scalable backend
        systems, cloud infrastructure, and full-stack development. Polyglot by nature, pragmatist by
        trade — I turn complex problems into clean, maintainable solutions. Check out my{' '}
        <a href="https://www.linkedin.com/in/ricardo-schuller-944750110/">LinkedIn</a> for the full
        story.
      </TabPanel>
      <TabPanel chosenIndex={chosenIndex} index={1} dir={theme.direction}>
        Experienced Software Engineer with a demonstrated history of working in the information
        technology and services industry. Strong engineering professional skilled in Java, Spring
        Framework, Javascript, AWS, Docker, Terraform, and Agile Methodologies. Polyglot that likes
        to solve problems and make it scalable.
      </TabPanel>
      <TabPanel chosenIndex={chosenIndex} index={2} dir={theme.direction}>
        <List>
          <ListItem>
            <ListItemText
              primary="EUIPO/BOIP"
              secondary="Deployed Developer - Full Stack - 2023 - Present"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Matchesfashion" secondary="Tech Lead - Java - 2021 - 2023" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="NATS"
              secondary="Project Tech Lead - Admin - 2020 - 2021"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="NHS Profile Updater"
              secondary="Senior Software Developer - 2018 - 2020"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="RBS Open Banking"
              secondary="Software Developer - Java - 2017 - 2018"
            />
          </ListItem>
        </List>
      </TabPanel>
      <TabPanel chosenIndex={chosenIndex} index={3} dir={theme.direction}>
        <Messages />
      </TabPanel>
      <TabPanel chosenIndex={chosenIndex} index={4} dir={theme.direction}>
        <BuildInfo />
      </TabPanel>
    </SectionContainer>
  );
}

export default Section;
