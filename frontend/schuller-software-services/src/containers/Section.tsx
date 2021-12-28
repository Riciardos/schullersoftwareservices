import React, {useState} from 'react';
import './Section.css';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {Divider, List, ListItem, ListItemText, useTheme} from "@mui/material";
import TabPanel from "../components/TabPanel";

interface SectionProps {
    children?: React.ReactNode;
}

function Section(props:SectionProps) {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event:React.SyntheticEvent, newValue:any) => {
        setValue(newValue);
    };
    return (
        <section className="Section">
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" className="Section-tab-header" >
                <Tab value={0} label="Intro" />
                <Tab value={1} label="Motivation"/>
                <Tab value={2} label="Experience"/>
            </Tabs>

            <TabPanel value={value} index={0} dir={theme.direction}>
                Hi, I'm Ricardo. Here is your classic <a href="https://www.linkedin.com/in/ricardo-schuller-944750110/">LinkedIn</a> profile.
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                Clean code, agile practices, yada yada yada.
                Polyglot that likes to solve problems and make it scalable.
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction} className="Section-tab-panel">
                <List>
                    <ListItem>
                        <ListItemText primary="Matchesfashion" secondary="Tech Lead - Java" />
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText primary="NATS" secondary="Project Tech Lead - Admin"/>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText primary="NHS Profile Updater" secondary="Senior Software Developer"/>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText primary="RBS Open Banking" secondary="Software Developer - Java"/>
                    </ListItem>
                </List>
            </TabPanel>
        </section>
    );
}

export default Section;
