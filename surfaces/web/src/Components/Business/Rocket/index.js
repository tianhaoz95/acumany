import React, {Component} from 'react';
import {connect} from 'react-redux';
import Preview from './Preview';
import 'react-credit-cards/es/styles-compiled.css';

class Rocket extends Component {
  render() {
    return(
      <div>
        <Preview />
      </div>
    );
  }
}

export default connect()(Rocket);
