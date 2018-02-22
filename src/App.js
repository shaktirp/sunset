import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './components/Test/Test';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save.
          </p>
          <Test />
          
          <RaisedButton label="Default" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
