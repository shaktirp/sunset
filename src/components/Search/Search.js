import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './Search.css';
import { getCoordinates, getQuality } from '../../core/sunsetAPI'
import Results from '../Results/Results'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quality: [],
      city: ''
    }
  }

  getCoordinatesCallBack = (err, response, body) => {
    if (!err) {
      const xCoordinate = body["features"][0]["geometry"]["coordinates"][0]
      const yCoordinate = body["features"][0]["geometry"]["coordinates"][1]

      const coords = xCoordinate + "," + yCoordinate

      getQuality(coords, 'sunset', this.getQualityCallback)
      getQuality(coords, 'sunrise', this.getQualityCallback)
    }
  }

  getQualityCallback = (err, response, body) => {
    const qualityObj = body["features"][0]["properties"]
    const stateQuality = this.state.quality

    stateQuality.push({
      type: qualityObj['type'],
      quality: qualityObj['quality'],
      time: qualityObj['valid_at'],
      temperature: qualityObj['temperature']
    })

    this.setState({
      quality: stateQuality
    })
  }

  handleSearchClick = () => {
    if (this.state.city) {
      getCoordinates(this.state.city, this.getCoordinatesCallBack)
    } else {
      alert('Please enter a city')
    }
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleSearchClick()
    }
  }

  render() {
    const { quality } = this.state

    return (
      <div className="searchContainer">
        <TextField
          hintText="San Francisco, CA"
          className="searchField"
          value={this.state.city}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress}
        />
        <br />
        <RaisedButton onClick={this.handleSearchClick} label="Check quality" primary={true} />
        {quality.length > 0 &&
          <Results qualityArr={quality} />
        }
      </div>
    );
  }
}

export default Search;
