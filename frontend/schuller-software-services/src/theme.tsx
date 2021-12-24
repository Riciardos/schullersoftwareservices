import {createTheme} from "@mui/material";


const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#a6e2ff',
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