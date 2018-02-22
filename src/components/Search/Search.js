import React, { Component } from 'react';
import './Search.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { getCoordinates } from '../../core/sunsetAPI'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    getCoordinates('San Francisco, CA', this.getCoordinatesCallBack)
  }

  getCoordinatesCallBack = (err, response, body) => {
    if (!err) {
      const xCoordinate = body["features"][0]["geometry"]["coordinates"][0]
      const yCoordinate = body["features"][0]["geometry"]["coordinates"][1]

      const coords = xCoordinate + "," + yCoordinate
      console.log(coords)
      // getQuality(coords, 'sunset')
      // getQuality(coords, 'sunrise')
    }
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