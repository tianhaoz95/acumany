import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicForm from './BasicForm';

class BasicInfo extends Component {
  render() {
    return(
      <div>
        <BasicForm />
      </div>
    );
  }
}

export default connect()(BasicInfo);
