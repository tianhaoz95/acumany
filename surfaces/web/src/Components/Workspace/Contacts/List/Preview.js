import { Avatar, Badge, Card, Icon } from 'antd';
import React, { Component } from 'react';

import { checkConversation } from '../../../../Actions/Contact';
import { connect } from 'react-redux';
import { fetchBasicInfo } from '../../../Async/Contact';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      name: "",
      photo: "",
      active: false,
      timestamp: 0,
      conversationID: "",
      withUid: "",
    };
    this.handleDetail = this.handleDetail.bind(this);
    this.isSelectedMessage = this.isSelectedMessage.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
  }

  componentDidMount() {
    fetchBasicInfo(this.props.info.withUid)
    .then((snap) => {
      this.setState({
        status: "ready",
        name: snap.data.name,
        photo: snap.data.photo,
        active: this.props.info.newMessage,
        timestamp: this.props.info.timestamp,
        conversationID: this.props.info.conversationID,
        withUid: this.props.info.withUid,
      });
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  }

  // TODO: don't set state in here, can cause memory leaks
  componentWillReceiveProps(nextProps) {
    this.setState({
      status: "loading",
    });
    fetchBasicInfo(nextProps.info.withUid)
    .then((snap) => {
      this.setState({
        status: "ready",
        name: snap.data.name,
        photo: snap.data.photo,
        active: nextProps.info.newMessage,
        timestamp: nextProps.info.timestamp,
        conversationID: nextProps.info.conversationID,
        withUid: nextProps.info.withUid,
      });
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  }

  isSelectedMessage() {
    if (this.state.conversationID === this.props.selectedMessageId) {
      return 'selected-message';
    }
    return;
  }

  handleDetail() {
    this.props.handleSelectMessage(this.state.conversationID);
    this.props.dispatch(checkConversation(this.state.conversationID, this.state.active, this.state.withUid));
  }

  renderLoading() {
    return(
      <Card loading>
        Loading
      </Card>
    );
  }

  renderReady() {
    return(
      <Card className={this.isSelectedMessage()} onClick={this.handleDetail}>
        <Avatar shape="circle" src={this.state.photo} style={{width:50, height:50, borderRadius: 25}}/>
        <span className="sender-name">{this.state.name}</span>
        <span>
          <Badge status={this.state.active ? "success" : "default"}
                 text={this.state.active ? "Unread" : "Read"}
                 style={this.state.active ? { backgroundColor: '#87d068' } : { backgroundColor: '#dddddd' }}
                 >
                 <Icon type="mail" />
          </Badge>
        </span>
      </Card>
    );
  }

  render() {

    let content = null;

    if (this.state.status === "loading") {
      content = this.renderLoading();
    } else if (this.state.status === "ready") {
      content = this.renderReady();
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

export default connect()(Preview);
