import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row, Spin, Alert } from 'antd';
import { push } from 'react-router-redux';
import { nextStep, prevStep, updateVerifyCardStatus } from '../../../Actions/Business';
import CardForm from './CardForm';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.handleBackToPlans = this.handleBackToPlans.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeCard = this.handleChangeCard.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
  }

  handleNextStep() {
    this.props.dispatch(nextStep());
  }

  handleChangeCard() {
    this.props.dispatch(updateVerifyCardStatus("none"));
  }

  handleCancel() {
    this.props.dispatch(push("/"));
  }

  handleBackToPlans() {
    this.props.dispatch(prevStep());
  }

  renderStatus() {
    let content = null;

    if (this.props.status === "none") {
      content = (
        <Alert
          message="Verify you card"
          description="You need to verify your card before going to next step"
          type="info"
          showIcon
          />
      );
    } else if (this.props.status === "loading") {
      content = (
        <Spin className="business-payment-status-spinner" size="large"/>
      );
    } else if (this.props.status === "verified") {
      content = (
        <Alert
          message="Success!"
          description="Your card has been verified"
          type="success"
          showIcon
          />
      );
    } else if (this.props.status === "error") {
      content = (
        <Alert
          message="Error"
          description="Cannot retrieve card information"
          type="error"
          showIcon
          />
      );
    } else {
      console.log("fuck, you are a long way from home");
      content = null;
    }

    return(
      <div className="business-payment-status-container">
        {content}
      </div>
    );
  }

  render() {

    let status = this.renderStatus();

    return(
      <div>
        <CardForm />
        {status}
        <div className="business-payment-buttons-container">
          <Row>
            <Col span="6">
              <Button
                onClick={this.handleCancel}
                icon="delete"
                type="danger"
                size="large"
                >
                Cancel
              </Button>
            </Col>
            <Col span="6">
              <Button
                onClick={this.handleBackToPlans}
                icon="left-circle-o"
                size="large"
                >
                Prev Step
              </Button>
            </Col>
            <Col span="6">
              <Button
                icon="edit"
                size="large"
                onClick={this.handleChangeCard}
                >
                Change Card
              </Button>
            </Col>
            <Col span="6">
              <Button
                size="large"
                icon="right-circle-o"
                disabled={this.props.status !== "verified"}
                onClick={this.handleNextStep}
                >
                Next Step
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.business.verifyCardStatus,
  }
}

export default  connect(mapStateToProps)(Payment);
