import React, { Component } from 'react';
import { StripeWebsite } from '../../../Utilities/Params';
import { connect } from 'react-redux';
import { retrieveAccount, redirectURL } from '../../Async/Payment';

class StripeConnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
    }
  }

  componentDidMount() {
    retrieveAccount()
    .then(() => {
      this.setState({ status: "connected" })
    })
    .catch(() => {
      this.setState({ status: "not_connected" })
    });
  }

  renderConnect() {
    return(
      <div>
        <a href={redirectURL()}>
          Connect With Stripe
        </a>
      </div>
    );
  }

  renderStripe() {
    return(
      <div>
        <a href={StripeWebsite} target="_blank">
          Login to your account
        </a>
      </div>
    );
  }

  renderLoading() {
    return(
      <div>
        Loading
      </div>
    );
  }

  render() {
    let content = null;

    if (this.state.status === "loading") {
      content = this.renderLoading();
    } else if (this.state.status === "not_connected") {
      content = this.renderConnect();
    } else if (this.state.status === "connected") {
      content = this.renderStripe();
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

export default connect()(StripeConnect);
