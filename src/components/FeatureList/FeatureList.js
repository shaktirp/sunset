import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { getQuality } from '../../core/sunsetAPI'
import Results from '../Results/Results'

import './FeatureList.css';

class FeatureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      defaultText: "Select a region",
      features: this.props.features,
      quality: []
    };
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
    })
  }

  handleChange = (event, index, value) => {
    this.setState({
      value: value,
      quality: []
    })

    if (value !== 0) {
      const coords = value.x + "," + value.y
      getQuality(coords, 'sunset', this.getQualityCallback)
      getQuality(coords, 'sunrise', this.getQualityCallback)
    }
  }

  render() {
    return (
      <div>
        <br />
        <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem key={0} value={0} primaryText={this.state.defaultText} />
          {this.state.features.map( (row, index) => (
            <MenuItem
              key={index+1}
              value={row}
              primaryText={row.place + (row.state ? ", " + row.state : '') + (row.country ? ", " + row.country : '')}
            />
          ))}
        </DropDownMenu>

        {this.state.quality.length > 0 &&
          <Results qualityArr={this.state.quality} />
        }
      </div>
    );
  }
}

export default FeatureList;
