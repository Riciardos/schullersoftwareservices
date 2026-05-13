import React from 'react';
import { Typography } from '@mui/material';
import { TabPanelContainer } from './TabPanel.styles';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  chosenIndex: number;
}

function TabPanel({ children, chosenIndex, index, ...other }: TabPanelProps) {
  return (
    <TabPanelContainer
      role="tabpanel"
      hidden={chosenIndex !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {chosenIndex === index && <Typography component="div">{children}</Typography>}
    </TabPanelContainer>
  );
}

export default TabPanel;
