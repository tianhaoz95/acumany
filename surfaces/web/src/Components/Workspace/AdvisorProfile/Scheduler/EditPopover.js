import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { deleteEventFromMySchedule } from '../../../../Actions/Schedule';

class EditPopover extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.dispatch(deleteEventFromMySchedule(this.props.info));
  }

  render() {
    return(
      <div>
        Note: {this.props.info.note}
        <Button
          icon="delete"
          type="danger"
          onClick={this.handleDelete}
          >
          Delete
        </Button>
      </div>
    );
  }
}

export default connect()(EditPopover);
