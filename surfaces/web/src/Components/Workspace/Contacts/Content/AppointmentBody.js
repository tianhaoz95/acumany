import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import moment from 'moment';
import { isRecipient } from '../../../Async/Contact';
import { updateComposerMode, updateInvitationDefaultTime, acceptAppointmentProposal } from '../../../../Actions/Contact';
import { connect } from 'react-redux';

class AppointmentBody extends Component {
  constructor(props) {
    super(props);
    this.handleCreateSession = this.handleCreateSession.bind(this);
  }

  handleCreateSession() {
    var scheduleTime = moment(Number(this.props.info.content.scheduleTime));
    this.props.dispatch(updateInvitationDefaultTime(scheduleTime));
    this.props.dispatch(updateComposerMode("session_invitation"));
    this.props.dispatch(acceptAppointmentProposal(this.props.info));
  }

  render() {
    console.log("AppointmentBody => ", this.props.info);
    var scheduleTime = moment(Number(this.props.info.content.scheduleTime)).format("dddd, MMMM Do YYYY, h:mm a");

    return(
      <div className="session-request-message">
        <span>
          <h3>Requested Session</h3>
          <p><strong>Suggested Time:</strong> {scheduleTime}</p>
          <p><strong>Note:</strong> {this.props.info.content.note}</p>
        </span>
        {isRecipient(this.props.info) ? (
          <Button className="ant-btn-tertiary" onClick={this.handleCreateSession}>
            <Icon type='check' /> Create Session
          </Button>
        ) : (null)}
      </div>
    );
  }
}

export default connect()(AppointmentBody);
