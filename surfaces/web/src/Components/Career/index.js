import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';

import MyFooter from '../Footer';
import MyHeader from '../Header';
import JobPosts from './JobPosts';

const { Content } = Layout;

class Career extends Component {
  render() {
    return(
      <Layout>
      	<MyHeader ishomepage='false' />
      	<Content className='career'>
            <JobPosts />
      	</Content>
      	<MyFooter />
      </Layout>
    );
  }
}

export default connect()(Career);