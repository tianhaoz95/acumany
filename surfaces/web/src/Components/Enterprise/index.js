import React, { Component } from 'react';
import { fetchAllMemberInfo, fetchEnterpriseInfo } from '../Async/Enterprise';

import Header from '../Header';
import Homepage from './Homepage';
import MemeberExplorer from '../Workspace/EnterpriseProfile/MemberExplorer';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class Enterprise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    fetchEnterpriseInfo(this.props.match.params.uid)
    .then((info) => {
      fetchAllMemberInfo(info.member)
      .then((list) => {
        this.setState({ list: list });
      })
      .catch((err) => {
        console.log("fuck", err);
      });
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  }

  handleKeyChange(key) {
    console.log(key);
  }

  render() {
    return(
      <div>
        <Header/>
        <Tabs tabPosition="left" defaultActiveKey="home" onChange={this.handleKeyChange} style={{marginTop:60}}>
          <TabPane tab="Home" key="home">
            <Homepage uid={this.props.match.params.uid}/>
          </TabPane>
          <TabPane tab="Members" key="members">
            <MemeberExplorer list={this.state.list}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Enterprise;
