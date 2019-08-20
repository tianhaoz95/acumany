import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';

class ConfirmationBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionDate: this.props.info.content.scheduleTime,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch(push("/workspace/sessions"));
  }

  render() {
    return(
      <div className="session-special-message">
        <p>You have a confirmed appointment at {moment(this.props.info.timestamp).format("h:mm a dddd, MMMM Do YYYY")}.
        To view appointment details visit <strong onClick={this.handleClick}> sessions page</strong>.</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace,
    type: state.auth.basicInfo.type,
  }
}

export default connect(mapStateToProps)(ConfirmationBody);
