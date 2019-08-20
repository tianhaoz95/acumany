import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { push } from 'react-router-redux';

class Business extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch(push("/business"));
  }

  render() {
    return(
        <Button
          size="large"
          onClick={this.handleClick}
          >
          Business
        </Button>
    );
  }
}

export default connect()(Business);
