import {createTheme} from "@mui/material";

const sharedPalette = {
    primary: {
        main: '#7dd8f0',
        contrastText: '#0a1628',
    },
    secondary: {
        main: '#40e0d0',
    },
};

const lightTheme = createTheme({
    palette: {
        mode: 'dark',
        ...sharedPalette,
        background: {
            paper: 'rgba(255,255,255,0.08)',
        },
        text: {
            secondary: 'rgba(255,255,255,0.6)',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        ...sharedPalette,
        background: {
            paper: 'rgba(255,255,255,0.06)',
        },
        text: {
            secondary: 'rgba(255,255,255,0.55)',
        },
    },
})

const pickTheme = (useDarkMode: boolean) => {
    return useDarkMode ? darkTheme : lightTheme;
}

export default pickTheme;