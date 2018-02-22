import React, { Component } from 'react';
import './Search.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { sunsetLogin } from '../../core/sunsetAPI'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    sunsetLogin()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="searchContainer">
          <TextField hintText="San Francisco, CA" className="searchField" />
          <br />
          <RaisedButton label="Check quality" primary={true} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Search;
