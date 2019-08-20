import React, { Component } from 'react';

import MessageComposer from './MessageComposer';
import { Radio } from 'antd';
import SessionInvitationComposer from './SessionInvitationComposer';
import { connect } from 'react-redux';
import { updateComposerMode } from '../../../../Actions/Contact';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Composer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.dispatch(updateComposerMode(e.target.value));
  }

  render() {
    let composer = null;

    switch (this.props.mode) {
      case "plain_message": {
        composer = (<MessageComposer />);
        break;
      }

      case "session_invitation": {
        composer = (<SessionInvitationComposer />);
        break;
      }

      default: console.log("fuck, you are a long way from home");
    }

    return(
      <div className="compose-message">
        {this.props.userType === "advisor" ? (
          <div>
            <RadioGroup onChange={this.handleChange} value={this.props.mode}>
              <RadioButton value="plain_message">Plain Message</RadioButton>
              <RadioButton value="session_invitation">Session Invitation</RadioButton>
            </RadioGroup>
            {composer}
          </div>
        ) : (
          <MessageComposer />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.contact.composerMode,
    userType: state.auth.basicInfo.type,
  }
}

export default connect(mapStateToProps)(Composer);
