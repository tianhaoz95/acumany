import {Button} from 'antd';
import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch(push('/sign/in'));
  }

  render() {
    return(
      <Button onClick={this.handleClick} size="large">Log in</Button>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.header,
  }
}

export default connect(mapStateToProps)(LoginButton);
