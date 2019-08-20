import { Button, Spin } from 'antd';
import React, { Component } from 'react';
import { deleteCustomer, retrieveCustomerInformation } from '../../Async/Payment';

import NewPaymentForm from './NewPaymentForm';
import { ReFetchBasicInfo } from '../../../Actions/Auth';
import { connect } from 'react-redux';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      source: [],
      loadingDelete: false,
    };
    this.refresh = this.refresh.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.setState({ status: "loading" });
    retrieveCustomerInformation()
    .then((snap) => {
      var customer = snap.data;
      this.setState({
        source: customer.sources.data[0],
        status: "show_info",
      });
    })
    .catch((err) => {
      console.log("error => ", err);
      this.setState({ status: "no_payment" });
    });
  }

  handleDelete() {
    this.setState({ loadingDelete: true });
    deleteCustomer()
    .then(() => {
      this.setState({ loadingDelete: false });
      this.refresh();
      this.props.dispatch(ReFetchBasicInfo());
    })
    .catch((err) => {
      this.setState({ loadingDelete: false });
      console.log("fuck", err);
    })
  }

  renderLoading() {
    return(
      <div>
        <Spin size="large" />
      </div>
    );
  }

  renderCustomerInfo() {
    console.log(this.state.source);
    return(
      <div className="credit-card-information-display">
        <p>Card Number: **** **** **** {this.state.source.last4}</p>
        <p>Expire Date: {this.state.source.exp_month}/{this.state.source.exp_year}</p>
        <p>Card type: {this.state.source.brand}</p>
        <Button
          onClick={this.handleDelete}
          loading={this.state.loadingDelete}
          type="danger"
          icon="delete"
          >
          Delete
        </Button>
      </div>
    );
  }

  renderNoPayment() {
    return(
      <NewPaymentForm refresh={this.refresh}/>
    );
  }

  render() {

    let content = null;

    if (this.state.status === "loading") {
      content = this.renderLoading();
    } else if (this.state.status === "no_payment") {
      content = this.renderNoPayment();
    } else if (this.state.status === "show_info") {
      content = this.renderCustomerInfo();
    } else {
      console.log("fuck, you are a long way from home");
    }

    return(
      <div>
        {content}
      </div>
    );
  }
}

export default connect()(Payment);
