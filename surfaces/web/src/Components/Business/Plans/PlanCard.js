import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import { updateSelectPlan, nextStep } from '../../../Actions/Business';

class PlanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardBodyStyle: {
        backgroundColor: this.props.info.metadata.color,
        padding: 0,
      }
    };
    this.handleSelectPlan = this.handleSelectPlan.bind(this);
  }

  handleSelectPlan() {
    this.props.dispatch(updateSelectPlan(this.props.info));
    this.props.dispatch(nextStep());
  }

  render() {
    console.log(this.props.info);
    return(
      <Card bodyStyle={this.state.cardBodyStyle} className="business-plan-card">
        <Row>
          <Col span="4">
            <img alt="plan-card" className="business-plan-card-img" src={this.props.info.metadata.img} />
          </Col>
          <Col span="12">
            <h1 className="business-plan-card-name">{this.props.info.name}</h1>
          </Col>
          <Col span="4">
            <h3 className="business-plan-card-price">Price: ${this.props.info.amount / 100}/{this.props.info.interval}</h3>
          </Col>
          <Col span="4">
            <Button
              icon="right-circle"
              type="primary"
              size="large"
              className="business-plan-card-button"
              onClick={this.handleSelectPlan}
              >
              Select Plan
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default connect()(PlanCard);
