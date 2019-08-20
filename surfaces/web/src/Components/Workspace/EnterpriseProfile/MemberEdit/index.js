import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddMemberForm from './AddMemberForm';
import MemberExplorer from '../MemberExplorer';

class MemberEdit extends Component {
  renderReady() {
    return(
      <div>
        <AddMemberForm/>
        <MemberExplorer list={this.props.list}/>
      </div>
    );
  }

  renderLoading() {
    return(
      <div>
        Loading
      </div>
    );
  }

  renderError() {
    return(
      <div>
        Error
      </div>
    );
  }

  render() {
    let content = null;

    if (this.props.status === "loading") {
      content = this.renderLoading();
    } else if (this.props.status === "ready") {
      content = this.renderReady();
    } else if (this.props.status === "error") {
      content = this.renderError();
    } else {
      console.log("fuck, you are a long way from home");
    }
    return(
      <div>
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.enterprise.memberList,
    status: state.enterprise.memberStatus,
  }
}

export default connect(mapStateToProps)(MemberEdit);
