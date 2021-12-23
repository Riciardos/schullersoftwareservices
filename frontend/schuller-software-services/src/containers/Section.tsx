import React, {useState} from 'react';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {Box, Typography, useTheme} from "@mui/material";

interface SectionProps {
    children?: React.ReactNode;
    index?: number;
    value?: number;
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function Section(props:SectionProps) {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event:React.SyntheticEvent, newValue:any) => {
        setValue(newValue);
    };
    return (
        <div className="Section">
            <h1>Schuller Software Services</h1>
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" >
                <Tab value={0} label="Intro" />
                <Tab value={1} label="Motivation"/>
                <Tab value={2} label="Experience"/>
            </Tabs>

            <TabPanel value={value} index={0} dir={theme.direction}>
                Hi, I'm Ricardo. Here is your classic <a href="https://www.linkedin.com/in/ricardo-schuller-944750110/">LinkedIn profile.</a>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                Polyglot that likes to solve problems and make it scalable.
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                Matchesfashion <br/>
                NATS <br/>
                NHS Profile Updater <br/>
                RBS Open Banking <br/>
            </TabPanel>
        </div>
    );
}

export default Section;
