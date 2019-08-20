import React, { Component } from 'react';
import { connect } from 'react-redux';
import { refreshMySessions } from '../../../Actions/Session';
import SessionCard from './SessionCard';

// style components here
import { Icon, Tooltip, Layout, Row } from 'antd';

// original:
//    const { Header, Content, Footer, Sider } = Layout;
// commented out to clean unused variables
const { Header } = Layout;

class Sessions extends Component {
  componentDidMount() {
    this.props.dispatch(refreshMySessions());
  }

  render() {
    return(
      <Layout className="sessions-view">
        <Header>
          <h1>Sessions</h1>
          <div>
            <Tooltip placement="bottom" title={"Change View"}>
              <Icon onClick="" type="bars" />
            </Tooltip>
          </div>
        </Header>
        <Row>
          {this.props.mySessions.map((session, index) => (
            <SessionCard info={session} key={index} />
          ))}
        </Row>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    mySessions: state.session.mySessions,
  }
}

export default connect(mapStateToProps)(Sessions);
