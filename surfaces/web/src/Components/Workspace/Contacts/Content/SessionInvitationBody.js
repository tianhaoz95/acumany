import React, { Component } from 'react';
import moment from 'moment';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { signUpSession } from '../../../../Actions/Contact';
import { isGuest } from '../../../Async/Contact';

class SessionInvitationBody extends Component {
  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup() {
    this.props.dispatch(signUpSession(this.props.info));
  }

  render() {
    var scheduleTime = moment(Number(this.props.info.content.scheduleTime)).format("dddd, MMMM Do YYYY, h:mm a");
    return(
      <div className="message-body">
        <span>
          <strong>{this.props.info.content.title}</strong>
          <p>{this.props.info.content.content}</p>
        </span>
        <span className="session-details">
          <span>
            On: {scheduleTime} &nbsp;
            Cost: {this.props.info.content.price} &nbsp;
            Duration: {this.props.info.content.duration}
          </span>
          {this.props.signUpError ? "Whoops, something is wrong" : null}
          {isGuest(this.props.info.content) ? (
            <span>
              <Button
                onClick={this.handleSignup}
                loading={this.props.signUpLoading}
                >
                Sign Up Session
              </Button>
            </span>
          ) : (null)}
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    signUpLoading: state.session.signUpLoading,
    signUpError: state.session.signUpError,
  }
}

export default connect(mapStateToProps)(SessionInvitationBody);
