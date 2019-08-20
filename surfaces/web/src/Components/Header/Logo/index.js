import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Logo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch(push("/"));
  }

  render() {
    return(
      // eslint-disable-next-line
      <a className='acumany-logo' onClick={this.handleClick} />
    );
  }
}

export default connect()(Logo);
