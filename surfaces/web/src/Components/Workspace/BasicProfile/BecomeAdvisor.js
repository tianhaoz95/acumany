import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { SwitchToAdvisor } from '../../../Actions/Auth';

class BecomeAdvisor extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch(SwitchToAdvisor());
  }

  render() {
    return(
      <div className="become-advisor">
        {this.props.error ? (<p>{this.props.errorMsg}</p>) : (null)}
        <Button
          icon="bulb"
          className="become-advisor-button"
          type="primary"
          size="large"
          loading={this.props.loading}
          onClick={this.handleClick}
          >
          Become Advisor
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.basicInfoField.becomeAdvisorLoading,
    error: state.basicInfoField.becomeAdvisorError,
    errorMsg: state.basicInfoField.becomeAdvisorErrorMsg,
  }
}

export default connect(mapStateToProps)(BecomeAdvisor);
