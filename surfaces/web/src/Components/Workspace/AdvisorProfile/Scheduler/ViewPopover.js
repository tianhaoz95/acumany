import React, { Component } from 'react';
import { Button } from 'antd';

class ViewPopover extends Component {
  constructor(props) {
    super(props);
    this.handleAppointment = this.handleAppointment.bind(this);
  }

  handleAppointment() {
    this.props.onAppointment(this.props.info);
  }

  render() {
    return(
      <div>
        Note: {this.props.info.note}
        <Button
          icon="clock-circle-o"
          type="primary"
          onClick={this.handleAppointment}
          >
          Make Appointment
        </Button>
      </div>
    );
  }
}

export default ViewPopover;
