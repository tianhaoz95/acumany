import React, { Component } from 'react';
import MyHeader from '../Header';
import BasicInformation from './BasicInformation';
import Introduction from './Introduction';
import Credential from './Credential';
import Skills from './Skills';
import Reviews from './Reviews';
import Schedule from './Schedule';
import { isMyself } from '../Async/Preview';

// style components here
import { Tabs, Layout, Row, Col } from 'antd';
const TabPane = Tabs.TabPane;

class Profile extends Component {

  render() {

    return(
      <div className="profile-page">
        <MyHeader />
        <BasicInformation uid={this.props.match.params.uid}/>
        <Layout className="profile-details">
          <Row>
            <Col span="16">
              <Tabs type="card">
                <TabPane tab="About" key="1">
                  <Introduction uid={this.props.match.params.uid}/>
                </TabPane>
                <TabPane tab="Credentials" key="2">
                  <Credential uid={this.props.match.params.uid}/>
                </TabPane>
                <TabPane tab="Skills" key="3">
                  <Skills uid={this.props.match.params.uid}/>
                </TabPane>
                {isMyself(this.props.match.params.uid) ? (null) : (
                  <TabPane tab="Schedule" key="4">
                    <Schedule uid={this.props.match.params.uid}/>
                  </TabPane>
                )}
                <TabPane tab="Reviews" key="5">
                  <Reviews uid={this.props.match.params.uid}/>
                </TabPane>
              </Tabs>
            </Col>
            <Col className="profile-side" span="7">
              
            </Col>
          </Row>
        </Layout>
      </div>
    );
  }
}

export default Profile;
