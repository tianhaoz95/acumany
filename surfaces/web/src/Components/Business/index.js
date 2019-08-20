import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps } from 'antd';
import BasicInfo from './BasicInfo';
import Payment from './Payment';
import Plans from './Plans';
import Rocket from './Rocket';
import './index.css';

const Step = Steps.Step;

class Business extends Component {
  renderContent(index) {
    switch (index) {
      case 0: {
        return(
          <Plans />
        );
      }
      case 1: {
        return(
          <Payment />
        );
      }
      case 2: {
        return(
          <BasicInfo />
        );
      }
      case 3: {
        return(
          <Rocket />
        );
      }
      default: return null;
    }
  }

  render() {
    let content = this.renderContent(this.props.currentIndex);

    return(
      <div className="business-container">
        <Steps current={this.props.currentIndex} className="business-steps-titles">
          <Step title="Choose a plan" icon="tags-o" />
          <Step title="Payment" icon="credit-card" />
          <Step title="Basic Information" icon="user" />
          <Step title="Time to Rock & Roll" icon="rocket" />
        </Steps>
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentIndex: state.business.currentIndex,
  }
}

export default connect(mapStateToProps)(Business);
