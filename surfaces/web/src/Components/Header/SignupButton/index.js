import { Button } from 'antd';
import React, {Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { updateSignUpError } from '../../../Actions/Header.js'

class SignUpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch(updateSignUpError(null))
    this.props.dispatch(push('/sign/up'));
  }

  render() {
    return(
      <Button onClick={this.handleClick} size="large">Sign Up</Button>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.header,
  }
}

export default connect(mapStateToProps)(SignUpButton);
