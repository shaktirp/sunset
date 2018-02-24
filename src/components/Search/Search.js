import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import './Search.css';
import { getCoordinates, getQuality } from '../../core/sunsetAPI'
import Results from '../Results/Results'
import DialogBox from '../DialogBox/DialogBox'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quality: [],
      city: '',
      loading: false,
      error: false
    }

    this.handleDialog = this.handleDialog.bind(this)
  }

  getCoordinatesCallBack = (err, response, body) => {
    if (!err && body["features"]) {
      console.log('Got Co ordinates', body)
      const xCoordinate = body["features"][0]["geometry"]["coordinates"][0]
      const yCoordinate = body["features"][0]["geometry"]["coordinates"][1]

      const coords = xCoordinate + "," + yCoordinate

      getQuality(coords, 'sunset', this.getQualityCallback)
      getQuality(coords, 'sunrise', this.getQualityCallback)
    } else {
      this.setState({
        error: true,
        loading: false
      })
    }
  }

  getQualityCallback = (err, response, body) => {
    console.log('Got quality', body)
    const qualityObj = body["features"][0]["properties"]
    const stateQuality = this.state.quality

    let d = new Date(qualityObj['valid_at'])
    d = d.toLocaleTimeString() + ' ' + d.toLocaleDateString()

    stateQuality.push({
      type: qualityObj['type'],
      quality: qualityObj['quality'],
      time: d,
      temperature: qualityObj['temperature']
    })

    this.setState({
      quality: stateQuality,
      loading: false
    })
  }

  handleSearchClick = () => {
    this.setState({
      quality: [],
      loading: true,
      city: this.searchTextCorrection(this.state.city)
    })
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

  handleDialog = (e) => {
    e.preventDefault()
    this.setState({
      error: false
    })
  }

  searchTextCorrection = (str) => {
    const commaIndex = str.indexOf(',')
    if (commaIndex > 1 && str[commaIndex + 1] !== ' ') {
      return str.substring(0, commaIndex + 1) + ' ' + str.substring(commaIndex + 1)
    }
    return str
  }

  render() {
    const { quality, loading, error } = this.state

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

        {loading
          ? <CircularProgress />
          : <RaisedButton onClick={this.handleSearchClick} label="Check quality" primary={true} />
        }

        {quality.length > 0 &&
          <Results qualityArr={quality} />
        }

        {error === true &&
          <DialogBox handler={this.handleDialog} />
        }
      </div>
    );
  }
}

export default Search;
