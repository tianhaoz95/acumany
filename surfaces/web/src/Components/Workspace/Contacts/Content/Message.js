import React, { Component } from 'react';
import InfoField from './InfoField';
import MessageBody from './MessageBody';
import SessionInvitationBody from './SessionInvitationBody';
import ConfirmationBody from './ConfirmationBody';
import AppointmentBody from './AppointmentBody';
import AcceptanceBody from './AcceptanceBody';

class Message extends Component {
  constructor(props) {
    super(props);
    this.renderBody = this.renderBody.bind(this);
  }

  renderBody() {
    switch (this.props.info.type) {
      case "plain_message": {
        return(<MessageBody info={this.props.info}/>);
      }

      case "session_invitation": {
        return(<SessionInvitationBody info={this.props.info}/>);
      }

      case "confirmation": {
        return(<ConfirmationBody info={this.props.info}/>);
      }

      case "appointment": {
        return(<AppointmentBody info={this.props.info}/>);
      }

      case "acceptance": {
        return(<AcceptanceBody info={this.props.info}/>);
      }

      default: console.log("fuck, you are a long way from home");
    }
  }

  render() {

    let bodyContent = this.renderBody();

    return(
      <div className="single-message-container">
        <InfoField info={this.props.info}/>
        {bodyContent}
      </div>
    );
  }
}

export default Message;
