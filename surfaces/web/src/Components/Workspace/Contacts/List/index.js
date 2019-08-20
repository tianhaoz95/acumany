import React, { Component } from 'react';

import Preview from './Preview';
import _ from 'lodash';
import { connect } from 'react-redux';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMessageId: 0,
    }
    this.handleSelectMessage = this.handleSelectMessage.bind(this);
  }

  renderEmpty() {
    return(
      <div>
        There is active contact requests.
      </div>
    );
  }

  handleSelectMessage(messageId) {
    this.setState({
      selectedMessageId: messageId
    })
  }

  renderList() {
    return(
      <div>
        {this.props.list.map((conversation, index) => (
          <Preview
            handleSelectMessage={this.handleSelectMessage}
            selectedMessageId={this.state.selectedMessageId}
            key={index}
            info={conversation}
          />
        ))}
      </div>
    );
  }

  render() {
    let content = null;

    if (_.isEmpty(this.props.list)) {
      content = this.renderEmpty();
    } else {
      content = this.renderList();
    }

    return(
      <div className="contacts-list">
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.contact.conversationList,
  }
}

export default connect(mapStateToProps)(List);
