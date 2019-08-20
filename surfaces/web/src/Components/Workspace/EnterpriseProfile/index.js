import React, { Component } from 'react';

import BasicInfo from './BasicInfo';
import HomepageEdit from './HomepageEdit';
import MemberEdit from './MemberEdit';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class EnterpriseProfile extends Component {

  handleKeyChange(key) {
    console.log(key);
  }

  render() {
    return(
      <div>
        <Tabs defaultActiveKey="homepage" onChange={this.handleKeyChange} tabBarStyle={{marginBottom:0}}>
          <TabPane tab="Homepage" key="homepage">
            <HomepageEdit/>
          </TabPane>
          <TabPane tab="Members" key="members">
            <MemberEdit/>
          </TabPane>
          <TabPane tab="Basic Information" key="basicInfo">
            <BasicInfo/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default EnterpriseProfile;
