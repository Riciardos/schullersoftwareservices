import {createTheme} from "@mui/material";


const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ffffff',
        },
    },
});

const darkTheme = createTheme( {
    palette: {
        mode: 'dark'
    }
})

const pickTheme = (useDarkMode: boolean) => {
    return useDarkMode ? darkTheme : lightTheme;
}

export default pickTheme;