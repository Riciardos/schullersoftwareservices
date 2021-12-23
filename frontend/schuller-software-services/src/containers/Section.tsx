import React, {useState} from 'react';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {useTheme} from "@mui/material";
import TabPanel from "../components/TabPanel";

interface SectionProps {
    children?: React.ReactNode;
    index?: number;
    value?: number;
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
