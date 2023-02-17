import React, {useState} from 'react';
import './Section.css';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {Divider, List, ListItem, ListItemText, useTheme} from "@mui/material";
import TabPanel from "../components/TabPanel";


function Section(props:any) {
    const theme = useTheme();
    const [chosenIndex, setValue] = useState(0);

    const handleChange = (event:React.SyntheticEvent, newValue:any) => {
        setValue(newValue);
    };
    return (
        <section className="Section">
            <Tabs value={chosenIndex} onChange={handleChange} textColor="primary" indicatorColor="primary" className="Section-tab-header" >
                <Tab value={0} label="Intro" />
                <Tab value={1} label="Motivation"/>
                <Tab value={2} label="Experience"/>
            </Tabs>

            <TabPanel chosenIndex={chosenIndex} index={0} dir={theme.direction}>
                Hi, I'm Ricardo. Here is your classic <a href="https://www.linkedin.com/in/ricardo-schuller-944750110/">LinkedIn</a> profile.
            </TabPanel>
            <TabPanel chosenIndex={chosenIndex} index={1} dir={theme.direction}>
                Experienced Software Engineer with a demonstrated history of working in the information technology and services industry. Strong engineering professional skilled in Java, Spring Framework, Javascript, AWS, Docker, Terraform, and Agile Methodologies.
                Polyglot that likes to solve problems and make it scalable.
            </TabPanel>
            <TabPanel chosenIndex={chosenIndex} index={2} dir={theme.direction} className="Section-tab-panel">
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
