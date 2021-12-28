import React from "react";
import "./TabPanel.css";
import {Box, Typography} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
    className?: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, className, ...other } = props;
    return (
        <div className={className + " TabPanel"}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default TabPanel;