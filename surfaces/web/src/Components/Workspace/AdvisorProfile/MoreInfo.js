import React, { Component } from 'react';
import { Tabs, Icon, Row, Col } from 'antd';
import Introduction from './Introduction';
import Credentials from './Credentials';
import Skills from './Skills';
import MySchedule from './MySchedule';
import { connect } from 'react-redux';
import { refreshAdvisorInfo } from '../../../Actions/Auth';

const TabPane = Tabs.TabPane;

class MoreInfo extends Component {
  componentDidMount() {
    this.props.dispatch(refreshAdvisorInfo());
  }

  render() {
    return(
      <Col span="16" className="advisor-profile-right-side">
        <Row>
          <Col span="24">
            <Tabs
              defaultActiveKey="1"
              >
              <TabPane tab={<span><Icon type="idcard" />Introduction</span>} key="1">
                <Introduction/>
              </TabPane>
              <TabPane tab={<span><Icon type="trophy" />Credentials</span>} key="2">
                <Credentials/>
              </TabPane>
              <TabPane tab={<span><Icon type="like-o" />Awesome Skills</span>} key="3">
                <Skills/>
              </TabPane>
              <TabPane tab={<span><Icon type="calendar" />Schedule</span>} key="4">
                <MySchedule/>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default connect()(MoreInfo);
