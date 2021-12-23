import React from 'react';
import './App.css';
import Section from "./containers/Section";

function App() {


  return (
    <div className="App">
        <header className="App-header">
            <Section/>
        <a
          className="App-link"
          href="https://www.github.com/riciardos"
          target="_blank"
          rel="noopener noreferrer"
        >
            Github: Riciardos
        </a>
      </header>
    </div>
  );
}

export default App;
