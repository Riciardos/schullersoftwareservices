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
            <a
                className="App-link"
                href="https://www.github.com/riciardos"
                target="_blank"
                rel="noopener noreferrer"
            >
                Github: Riciardos
            </a>
        </footer>
    </div>
  );
}

export default App;
