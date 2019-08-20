import React, { Component } from 'react';
import { fetchBasicInfo } from '../../../Async/Contact';

class InfoField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      fromInfo: null,
      toInfo: null,
    };
  }

  componentDidMount() {
    Promise.all([
      fetchBasicInfo(this.props.info.fromUid),
      fetchBasicInfo(this.props.info.toUid)
    ])
    .then((snap) => {
      this.setState({
        toInfo: snap[1].data,
        fromInfo: snap[0].data,
        status: "ready",
      });
    })
    .catch((err) => {
      this.setState({
        status: "error",
      });
    });
  }

  // TODO: Following is a bug don't call, shouldn't call setState on an unmounted component
  componentWillReceiveProps(nextProps) {
    this.setState({
      status: "loading",
    });
    Promise.all([
      fetchBasicInfo(this.props.info.fromUid),
      fetchBasicInfo(this.props.info.toUid)
    ])
    .then((snap) => {
      this.setState({
        toInfo: snap[1].data,
        fromInfo: snap[0].data,
        status: "ready",
      });
    })
    .catch((err) => {
      this.setState({
        status: "error",
      });
    });
  }

  renderLoading() {
    return(
      <span>
        Loading
      </span>
    );
  }

  renderError() {
    return(
      <span>
        Error
      </span>
    );
  }

  renderInfo() {
    return(
      <span>
        <img 
          alt="from-info"
          style={{width:30, height:30, borderRadius: 15}} 
          src={this.state.fromInfo.photo}
          />
        {this.state.fromInfo.name}
      </span>
    );
  }

  render() {

    let content = null;

    if (this.state.status === "ready") {
      content = this.renderInfo();
    } else if (this.state.status === "loading") {
      content = this.renderLoading();
    } else if (this.state.status === "error") {
      content = this.renderError();
    } else {
      console.log("fuck, you are a long way from home");
    }

    return(
      <div className="message-owner">
        {content}
      </div>
    );
  }
}

export default InfoField;
