import React from "react";
import "./TabPanel.css";
import {Box, Typography} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    chosenIndex: number;
    className?: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, chosenIndex, index, className, ...other } = props;
    return (
        <div className={className + " TabPanel"}
            role="tabpanel"
            hidden={chosenIndex !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {chosenIndex === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default TabPanel;