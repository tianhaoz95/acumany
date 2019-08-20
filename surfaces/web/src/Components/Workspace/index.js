import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import MySider from './MySider';
import {updateSiderCollapsed} from '../../Actions/Workspace';
import MyContent from './MyContent';
import {checkAuthStatus} from '../../Actions/Checker';

const {Content, Sider} = Layout;

const styles = {
  container: {
    height: "100%",
    width: "100%",
  },
  layout: {
    height: "100%",
  },
  sider: {
    height: "100%",
  },
  content: {
    height: "100%",
  },
  logo: {
    width: "100%",
  }
};

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(checkAuthStatus());

    // 2/8/2018: initialize sidebar to be collapsed
    this.props.dispatch(updateSiderCollapsed(true));
  }


  handleCollapse(collapsed, type) {
    this.props.dispatch(updateSiderCollapsed(collapsed));
  }

  render() {
    return (
      <div style={styles.container}>
        <Layout
          style={styles.layout}
          className='workspace'
        >
          { !this.props.workspace.sessionInProgress &&
          <Sider
            className="workspace-main-sider"
            style={styles.sider}
            collapsible={true}
            defaultCollapsed={true}
            onCollapse={this.handleCollapse}
          >
            <MySider/>
          </Sider>
          }
          <Content
            style={styles.content}
          >
            <MyContent/>
          </Content>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace,
    authStatus: state.auth.auth,
  }
}

export default connect(mapStateToProps)(Workspace);
