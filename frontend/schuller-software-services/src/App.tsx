import React from 'react';
import './App.css';
import Section from "./containers/Section";
import {Button, ThemeProvider, useMediaQuery} from "@mui/material";
import pickTheme from "./theme";
import GoogleAuth from './components/GoogleAuth';
import AuthProvider from "./containers/AuthProvider";
import Welcome from "./containers/Welcome";
require("dotenv").config();

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	return (
		<div className="App">
			<AuthProvider>
				<ThemeProvider theme={pickTheme(prefersDarkMode)}>
					<header className="App-header">
						<h1>Schuller Software Services</h1>
					</header>

					<Section/>

					<footer className="App-footer">
						<Welcome />
						<GoogleAuth/>
						<div>
							<Button variant="outlined" href="https://www.github.com/riciardos">Github</Button>
							<Button variant="contained"
									href="https://www.linkedin.com/in/ricardo-schuller-944750110">LinkedIn</Button>
						</div>
						<address>Address: Zoetestraat 25C, Haarlem, The Netherlands</address>
						Phone: +31621705940, taxcode: NL004009717B15
					</footer>
				</ThemeProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
