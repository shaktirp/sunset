import React, { Component } from 'react';
import './Search.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Search extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="searchContainer">
          <TextField hintText="San Francisco, CA" />
          <br />
          <RaisedButton label="Check quality" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Search;
