import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DialogBox extends Component {
  state = {
    open: true
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.handler}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Error"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Please enter a city and state separated by comma. Example - San Francisco, CA or Portland, OR
        </Dialog>
      </div>
    );
  }
}

export default DialogBox
