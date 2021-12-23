import React, {useState} from 'react';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

interface SectionProps {
    children?: React.ReactNode;
    index?: number;
    value?: number;
}

function Section(props:SectionProps) {

    const [value, setValue] = useState(0);

    const handleChange = (event:React.SyntheticEvent, newValue:any) => {
        setValue(newValue);
    };
    return (
        <div className="Section">
            <h1>Schuller Software Services</h1>
            <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" >
                <Tab value="0" label="Intro" />
                <Tab value="1" label="Motivation"/>
                <Tab value="2" label="Experience"/>
            </Tabs>

        </div>
    );
}

export default Section;
