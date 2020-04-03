import React from 'react';
import logo from './logo.svg';
import { ToggleNav, ToggleButton, ToggleList, ToggleItem, ToggleLink } from 'ui-lib';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToggleNav>
          <ToggleButton className="foo" data-test="something">
            Home
          </ToggleButton>
          <ToggleList>
            <ToggleItem>
              <ToggleLink href="#">Home</ToggleLink>
            </ToggleItem>
            <ToggleItem>
              <ToggleLink href="#settings" aria-current={true}>
                Settings
              </ToggleLink>
            </ToggleItem>
            <ToggleItem>
              <ToggleLink href="#help">Help</ToggleLink>
            </ToggleItem>
            <ToggleItem>
              <ToggleLink as="button" onClick={() => alert('hi')}>
                Click me
              </ToggleLink>
            </ToggleItem>
          </ToggleList>
        </ToggleNav>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
