import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import './Search.css';
import { getCoordinates } from '../../core/sunsetAPI'
import FeatureList from '../FeatureList/FeatureList'
import DialogBox from '../DialogBox/DialogBox'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      features: [],
      city: '',
      resultsClass: 'searchContainerBeforeResults',
      loading: false,
      error: false
    }

    this.handleDialog = this.handleDialog.bind(this)
  }

  getCoordinatesCallBack = (err, response, body) => {
    if (!err && body["features"]) {
      console.log('Got Co ordinates', body)

      var refinedFeatures = body["features"].map(function(feature) {
        return {
          place: feature["properties"]["locale"],
          state: feature["properties"]["state"],
          country: feature["properties"]["country"],
          x: feature["geometry"]["coordinates"][0],
          y: feature["geometry"]["coordinates"][1]
        }
      })

      this.setState({
        features: refinedFeatures,
        loading: false
      })
    } else {
      this.setState({
        error: true,
        loading: false
      })
    }
  }

  handleSearchClick = () => {
    this.setState({
      loading: true,
      resultsClass: '',
      city: this.searchTextCorrection(this.state.city),
      features: []
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
    const {
      features,
      loading,
      error
    } = this.state

    return (
      <div className={"searchContainer " + (this.state.resultsClass)}>
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

        {features.length > 0 &&
          <FeatureList features={features} />
        }

        {error === true &&
          <DialogBox handler={this.handleDialog} />
        }
      </div>
    );
  }
}

export default Search;
