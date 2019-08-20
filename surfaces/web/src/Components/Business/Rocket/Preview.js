import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cards from 'react-credit-cards';
import {Button, Card, Col, Row} from 'antd';
import {createEnterpriseAccount, prevStep} from '../../../Actions/Business';
import {push} from 'react-router-redux';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleGoBack() {
    this.props.dispatch(prevStep());
  }

  handleCancel() {
    this.props.dispatch(push("/"));
  }

  handleSubmit() {
    this.props.dispatch(createEnterpriseAccount());
  }

  render() {
    const cardBodyStyle = {
      backgroundColor: this.props.plan.metadata.color,
      padding: 0,
    };

    return(
      <div className="business-preview-container">
        <Row>
          <Col span="24">
            <h1 className="business-preview-header">Confirm All Information</h1>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <Card
              className="business-preview-plan-card"
              bodyStyle={cardBodyStyle}
              >
              <Row>
                <Col span="12">
                  <img
                    alt="business-preview-plan"
                    className="business-preview-plan-card-img" 
                    src={this.props.plan.metadata.img}
                    />
                </Col>
                <Col span="12">
                  <Row>
                    <Col className="business-preview-field" span="22" offset="1">
                      <h2>Plan: {this.props.plan.name}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="business-preview-field" span="22" offset="1">
                      <h3>
                        Price: ${this.props.plan.amount/100}/{this.props.plan.interval}
                      </h3>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span="12">
            <Cards
              // className="business-preview-credit-card"
              cvc={this.props.cardInfo.cvc}
              name={this.props.cardInfo.name}
              number={this.props.cardInfo.number}
              />
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <Row className="business-preview-basic-info-field">
              <Col span="24">
                <h2>Entity Name: {this.props.basicInfo.name}</h2>
              </Col>
            </Row>
            <Row className="business-preview-basic-info-field">
              <Col span="24">
                <h3>Email: {this.props.basicInfo.email}</h3>
              </Col>
            </Row>
            <Row className="business-preview-basic-info-field">
              <Col span="24">
                <h3>Address: {this.props.basicInfo.address}</h3>
              </Col>
            </Row>
            <Row className="business-preview-basic-info-field">
              <Col span="24">
                <h3>Entity Type: {this.props.basicInfo.type}</h3>
              </Col>
            </Row>
          </Col>
          <Col span="12">
            <Button
              className="business-preview-edit-btn"
              icon="edit"
              size="large"
              onClick={this.handleGoBack}
              >
              Go Back To Edit
            </Button>
            <Button
              className="business-preview-edit-btn"
              icon="delete"
              size="large"
              type="danger"
              onClick={this.handleCancel}
              >
              Cancel
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            {this.props.error ? "Whoops, something is wrong" : null}
            <Button
              className="business-preview-confirm-btn"
              icon="rocket"
              size="large"
              type="primary"
              loading={this.props.loading}
              onClick={this.handleSubmit}
              >
              Confirm and Ready to Rock & Roll
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.business.submitLoading,
    error: state.business.submitError,
    plan: state.business.selectedPlan,
    cardInfo: state.business.cardInfo,
    basicInfo: state.business.basicObj,
  }
}

export default connect(mapStateToProps)(Preview);
