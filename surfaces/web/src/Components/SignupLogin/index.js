import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Tabs} from 'antd';
import {push} from 'react-router-redux'

import MyFooter from '../Footer';
import MyHeader from '../Header';
import WrappedSignupForm from './SignupForm'
import WrappedLoginForm from './LoginForm'

const { Content } = Layout;
const  TabPane = Tabs.TabPane;

class SignupLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.match.params.type === 'up'? 'up':'in'
    };
    this.handleChangeTab = this.handleChangeTab.bind(this);
  };


  handleChangeTab(e) {
    this.props.dispatch(push('/sign/' + e));
  };


  render() {
    const current = this.props.match.params.type
    return(
      <Layout>
        <MyHeader ishomepage='false' />
        <Content className='main-content'>
          <div className={"sign-form-content"}>
            <Tabs activeKey={current} onTabClick={this.handleChangeTab}>
              <TabPane tab="Sign Up" key="up" ><WrappedSignupForm /></TabPane>
              <TabPane tab="Log In" key="in" ><WrappedLoginForm /></TabPane>
            </Tabs>
          </div>

        </Content>
        <MyFooter />
      </Layout>
    );
  }

}

function mapStateToProps(state) {
  return {
  }
}
export default connect(mapStateToProps)(SignupLogin);