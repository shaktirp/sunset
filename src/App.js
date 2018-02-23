import React, { Component } from 'react';

import './App.css';
import Search from './components/Search/Search';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Search />
      </MuiThemeProvider>
    );
  }
}

export default App;
