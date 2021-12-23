import React from 'react';
import './App.css';
import Section from "./containers/Section";

function App() {


  return (
    <div className="App">
        <header className="App-header">
            <Section/>
        </header>
        <footer className="App-footer">
            <a className="App-link"
                href="https://www.github.com/riciardos"
            >Github</a> <a className="App-link"
                           href="https://www.linkedin.com/in/ricardo-schuller-944750110">LinkedIn</a>
            <address>Address: Zoetestraat 25C, Haarlem, The Netherlands</address>
            Phone: +31621705940, taxcode: NL004009717B15
        </footer>
    </div>
  );
}

export default App;
