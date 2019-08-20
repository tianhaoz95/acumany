import React, { Component } from 'react';
import Composer from './Composer';
import Message from './Message';
import { connect } from 'react-redux';

class Content extends Component {
  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  renderNoSelect() {
    return(
      <div className="no-message-selected">
        Select Message
      </div>
    );
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  // Scroll the message chain to bottom
  componentDidUpdate(prevProps) {
    if (prevProps.chain.length !== this.props.chain.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    const messages = document.querySelector('.message-items');
    if (messages) {
      messages.scrollTop = messages.scrollHeight;
    }
  }

  renderList() {
    return(
      <div className="message-trail">
        <div className="message-items">
          {this.props.chain.map((message, index) => (
            <Message info={message} key={index}/>
          ))}
        </div>
        <Composer/>
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

    if (this.props.status === "ready" || this.props.status === "loading") {
      content = this.renderList();
    } else if (this.props.status === "no_select") {
      content = this.renderNoSelect();
    } else {
      console.log("fuck, you are a long way from home");
    }

    return(
      <div className="contacts-content">
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ID: state.contact.showConversationID,
    status: state.contact.chainStatus,
    chain: state.contact.showMessageChain,
  }
}

export default connect(mapStateToProps)(Content);
