import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { push } from 'react-router-redux';
import {updateSessionState} from "../../../Actions/Workspace";

class MyWorkspace extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(updateSessionState(false));
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.type === "user") {
      this.props.dispatch(push("/workspace/basicprofile"));
    } else if (this.props.type === "advisor") {
      this.props.dispatch(push("/workspace/advisorprofile"));
    } else if (this.props.type === "enterprise") {
      this.props.dispatch(push("/workspace/enterpriseprofile"));
    } else {
        console.log("fuck, you are a long way from home");
    }
  }

  render() {
    return(
      <div>
        <Button
          type="primary"
          icon="layout"
          size="large"
          onClick={this.handleClick}
          >
          My Workspace
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    type: state.auth.basicInfo.type,
  }
}

export default connect(mapStateToProps)(MyWorkspace);
