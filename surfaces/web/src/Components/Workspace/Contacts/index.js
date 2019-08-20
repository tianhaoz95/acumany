// style components here
import { Col, Layout, Row } from 'antd';
import React, { Component } from 'react';
import { refreshConversationList, updateInvitationDefaultTime } from '../../../Actions/Contact';

import Content from './Content';
import List from './List';
import { connect } from 'react-redux';
import moment from 'moment';

class Contacts extends Component {
  componentWillMount() {
    this.props.dispatch(refreshConversationList());
    var currentTime = moment();
    this.props.dispatch(updateInvitationDefaultTime(currentTime));
  }

  render() {
    return(
      <Layout className="contacts-view">
        <Row>
          <Col span="5">
            <List/>
          </Col>
          <Col span="19">
            <Content/>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default connect()(Contacts);
