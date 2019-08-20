import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Menu, Icon, Button, Row, Col, Tooltip } from 'antd';
import screenfull from 'screenfull';
import { Logout } from '../../Actions/Auth';

const styles = {
  button: {
    width: "70%",
    margin: 10,
  },
  circleButton: {
    margin: 10,
  },
  userButtonGroup: {

  }
};

class MySider extends Component {
  constructor(props) {
    super(props);
    this.handleFullscreen = this.handleFullscreen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHomepage = this.handleHomepage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.renderAdvisor = this.renderAdvisor.bind(this);
    this.renderEnterprise = this.renderEnterprise.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.createMenuItem = this.createMenuItem.bind(this);
  }

  createMenuItem(icon, text) {
    if (this.props.workspace.siderCollapsed) {
      return (
        <Tooltip placement="right">
          <Icon type={icon} />
          <span className="nav-text">{text}</span>
        </Tooltip>
      );
    }
    else {
      return (
        <Fragment>
          <Icon type={icon} />
          <span className="nav-text">{text}</span>
        </Fragment>
      );
    }
  }

  handleFullscreen() {
    if (screenfull.enabled) {
    	screenfull.toggle();
    }
  }

  handleClick(val) {
    console.log(val);
    this.props.dispatch(push("/workspace/" + val.key));
  }

  handleLogout() {
    this.props.dispatch(Logout());
  }

  handleHomepage() {
    this.props.dispatch(push("/search"));
  }

  renderActions() {
    return(
      <div style={styles.userButtonGroup}>
        <Row>
          <Col>
            {this.props.workspace.siderCollapsed ? (
              <Tooltip placement="right" title="Full Screen">
                <Button
                  type="primary"
                  shape="circle"
                  style={styles.circleButton}
                  icon="arrows-alt"
                  size="default"
                  onClick={this.handleFullscreen}
                  />
              </Tooltip>
            ) : (
                <Button
                  type="primary"
                  icon="arrows-alt"
                  onClick={this.handleFullscreen}
                  style={styles.button}
                  >
                  Fullscreen
                </Button>)
            }
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.workspace.siderCollapsed ? (
              <Tooltip placement="right" title="Home">
                <Button
                  type="primary"
                  shape="circle"
                  style={styles.circleButton}
                  icon="home"
                  size="default"
                  onClick={this.handleHomepage}
                  />
                </Tooltip>
            ) : (
                <Button
                  type="primary"
                  icon="home"
                  onClick={this.handleHomepage}
                  style={styles.button}
                  >
                  Home Page
                </Button>)
            }
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.workspace.siderCollapsed ? (
              <Tooltip placement="right" title="Logout">
                <Button
                  type="primary"
                  shape="circle"
                  style={styles.circleButton}
                  icon="logout"
                  size="default"
                  onClick={this.handleLogout}
                  />
              </Tooltip>
            ) : (
                <Button
                  type="primary"
                  icon="logout"
                  style={styles.button}
                  onClick={this.handleLogout}
                  >
                  Logout
                </Button>)
            }
          </Col>
        </Row>
      </div>
    );
  }

  renderUser() {

    let content = this.renderActions();

    return(
      <div className="workspace-main-menu">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['basicprofile']}
          onClick={this.handleClick}
          >
          <Menu.Item key="basicprofile">
            { this.createMenuItem("user", "Profile") }
          </Menu.Item>
          <Menu.Item key="basicpayment">
            { this.createMenuItem("credit-card", "Payment") }
          </Menu.Item>
          <Menu.Item key="contacts">
            { this.createMenuItem("contacts", "Contacts") }
          </Menu.Item>
          <Menu.Item key="sessions">
            { this.createMenuItem("video-camera", "Sessions") }
          </Menu.Item>
          <Menu.Item key="settings">
            { this.createMenuItem("setting", "Settings") }
          </Menu.Item>
        </Menu>
        {content}
      </div>
    );
  }

  renderAdvisor() {

    let content = this.renderActions();
    // let siderCollapsed = this.props.workspace.siderCollapsed;

    return(
      <div className="workspace-main-menu">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['advisorprofile']}
          onClick={this.handleClick}
          >
          <Menu.Item key="advisorprofile">
            { this.createMenuItem("user", "Profile") }
          </Menu.Item>
          <Menu.Item key="advisorpayment">
            { this.createMenuItem("credit-card", "Payment") }
          </Menu.Item>
          <Menu.Item key="contacts">
            { this.createMenuItem("contacts", "Contacts") }
          </Menu.Item>
          <Menu.Item key="sessions">
            { this.createMenuItem("video-camera", "Sessions") }
          </Menu.Item>
          <Menu.Item key="settings">
            { this.createMenuItem("setting", "Settings") }
          </Menu.Item>
        </Menu>
        {content}
      </div>
    );
  }

  renderEnterprise() {

    let content = this.renderActions();

    return(
      <div className="workspace-main-menu">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['enterpriseprofile']}
          onClick={this.handleClick}
          >
          <Menu.Item key="enterpriseprofile">
            <Icon type="user" />
            {this.props.workspace.siderCollapsed ? (null) :
              (<span className="nav-text">Basic Profile</span>)
            }
          </Menu.Item>
          <Menu.Item key="basicpayment">
            <Icon type="credit-card" />
            {this.props.workspace.siderCollapsed ? (null) :
              (<span className="nav-text">Payment</span>)
            }
          </Menu.Item>
          <Menu.Item key="contacts">
            <Icon type="contacts" />
            {this.props.workspace.siderCollapsed ? (null) :
              (<span className="nav-text">Contacts</span>)
            }
          </Menu.Item>
          <Menu.Item key="settings">
            <Icon type="setting" />
            {this.props.workspace.siderCollapsed ? (null) :
              (<span className="nav-text">Settings</span>)
            }
          </Menu.Item>
        </Menu>
        {content}
      </div>
    );
  }

  renderError() {
    return(
      <div>
        Error
      </div>
    );
  }

  render() {

    let content = null;

    if (this.props.type === "user") {
      content = this.renderUser();
    } else if (this.props.type === "advisor") {
      content = this.renderAdvisor();
    } else if (this.props.type === "enterprise") {
      content = this.renderEnterprise();
    } else {
      content = this.renderError();
    }

    return(
      <div>
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace,
    type: state.auth.basicInfo.type,
  }
}

export default connect(mapStateToProps)(MySider);
