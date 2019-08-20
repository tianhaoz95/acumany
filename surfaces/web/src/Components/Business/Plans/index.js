import React, { Component } from 'react';
import { Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchUpdatePlans } from '../../../Actions/Business';
import PlanCard from './PlanCard';

class Plans extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchUpdatePlans());
  }

  handleCancel() {
    this.props.dispatch(push("/"));
  }

  renderList() {
    return(
      <div>
        {this.props.list.map((item, index) => (
          <PlanCard key={index} info={item} />
        ))}
      </div>
    );
  }

  renderLoading() {
    return(
      <div className="business-plans-loading-container">
        <Spin className="business-plans-loading" size="large" />
      </div>
    );
  }

  render() {

    let content = null;

    if (this.props.loading) {
      content = this.renderLoading();
    } else {
      content = this.renderList();
    }

    return(
      <div>
        {content}
        <Button
          className="business-plans-cancel-btn"
          onClick={this.handleCancel}
          icon="delete"
          size="large"
          type="danger"
          >
          Cancel
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.business.plansLoading,
    list: state.business.plans,
  }
}

export default connect(mapStateToProps)(Plans);
