import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';

import MyFooter from '../Footer';
import MyHeader from '../Header';
import Description from './Description';
const {Content } = Layout;
class HowItWorks extends Component {
  render() {
    return(
      <Layout> 
        <MyHeader ishomepage='false' />
        <Content className = "how-it-works">
            <Description />
        </Content>
        <MyFooter />
      </Layout>
    );
  }
}

export default connect()(HowItWorks);