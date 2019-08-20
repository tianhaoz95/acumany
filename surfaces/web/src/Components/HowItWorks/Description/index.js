import { Col, Layout, Row } from 'antd';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Description extends Component {
  render() {
    return(
      <div className= "container">
          <h1> Fast and simple access to professional guidance </h1>
        <Row>
          <Col> 
            <h2 className = "col-title"> Find your field of interest </h2>
            <p className = "col-body"> Seek guidance on any fields from our team of top-rated experts</p>
          </Col>
          <Col> 
            <h3 className = "col-title">Get insights from the right people </h3>
            <p className = "col-body">Choose someone who you are comfortable working with. We have the right accommodation for everyone</p>
          </Col>
          <Col>
            <h4 className = "col-title"> Stay connected </h4>
            <p className = "col-body">In order to reach your goals, we want you to stay on track, even after the sessions</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(Description);
