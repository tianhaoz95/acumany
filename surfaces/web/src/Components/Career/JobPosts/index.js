import React, {Component} from 'react';
import {connect} from 'react-redux';

class JobPosts extends Component {
  render() {
    return(
      <h5>
          We are not hiring!
      </h5>
    );
  }
}

export default connect()(JobPosts);