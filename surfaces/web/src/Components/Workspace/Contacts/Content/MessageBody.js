import React, { Component } from 'react';

class MessageBody extends Component {
  render() {
    return(
      <div className="message-body">
        <strong>{this.props.info.title}</strong>
        <p>{this.props.info.content.text}</p>
      </div>
    );
  }
}

export default MessageBody;
