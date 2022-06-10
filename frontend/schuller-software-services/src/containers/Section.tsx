import React, {useState} from 'react';
import './Section.css';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {Divider, List, ListItem, ListItemText, useTheme} from "@mui/material";
import TabPanel from "../components/TabPanel";
import Message from "../components/Message";

interface SectionProps {
    googleAuth?: any
    children?: React.ReactNode;
}

function Section(props:any) {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [messages, setMessages] = useState([]);

    const handleChange = (event:React.SyntheticEvent, newValue:any) => {
        setValue(newValue);
        fetch("https://api.schullersoftwareservices.com/messages/all", {
            headers: {
                'Authorization': 'Bearer ' + props.googleAuth.credential
            }
        })
            .then(res => res.json())
            .then( result => {
                setMessages(result)
            })
    };
    return (
        <section className="Section">
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" className="Section-tab-header" >
                <Tab value={0} label="Intro" />
                <Tab value={1} label="Motivation"/>
                <Tab value={2} label="Experience"/>
                {props.googleAuth && <Tab value={3} label="Messages"/>}
            </Tabs>

            <TabPanel value={value} index={0} dir={theme.direction}>
                Hi, I'm Ricardo. Here is your classic <a href="https://www.linkedin.com/in/ricardo-schuller-944750110/">LinkedIn</a> profile.
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                Experienced Software Engineer with a demonstrated history of working in the information technology and services industry. Strong engineering professional skilled in Java, Spring Framework, Javascript, AWS, Docker, Terraform, and Agile Methodologies.
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
            <TabPanel value={value} index={3} dir={theme.direction}>
                {messages.map((message) => {
                    console.log(message);
                    return (<Message message={message}/>)
                })}
            </TabPanel>
        </section>
    );
}

export default Section;
