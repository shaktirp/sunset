import React, { Component } from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import './Results.css';

class Results extends Component {
  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '300px',
  };



  render() {
    const { qualityArr } = this.props

    return (
      <div className="tableContainer">
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn>Quality</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
              <TableHeaderColumn>Temperature</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {qualityArr.map( (row, index) => (
            <TableRow key={index}>
              <TableRowColumn>{row.type}</TableRowColumn>
              <TableRowColumn>{row.quality}</TableRowColumn>
              <TableRowColumn title={row.time}>{row.time}</TableRowColumn>
              <TableRowColumn>{row.temperature}</TableRowColumn>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Results;
