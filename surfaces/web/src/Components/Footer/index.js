import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Layout } from 'antd';
import { push } from 'react-router-redux';

// original:
// const { Header, Content, footer } = Layout;
//    commented out to clean unused variables

const { footer } = Layout;

class Footer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(val) {
    switch(val.key){
      case "1": {
        //TODO
        break;
      }
      case "2": {
        //TODO
        break;
      }
      case "3": {
        //TODO
        break;
      }
      case "4": {
        this.props.dispatch(push("/howitworks"));
        break;
      }
      case "5": {
        this.props.dispatch(push("/career"));
        break;
      }

      default: return;

    }
  }

  render(){
    return(
      <footer>
        <Menu
          selectable={false}
          theme="light"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          onClick={this.handleClick}
          >
          <Menu.Item key="1">About Us</Menu.Item>
          <Menu.Item key="2">Contact Us</Menu.Item>
          <Menu.Item key="3">FAQ</Menu.Item>
          <Menu.Item key="4">How it Works?</Menu.Item>
          <Menu.Item key="5">Careers</Menu.Item>
        </Menu>
      </footer>
    )
  }
}

export default connect()(Footer);

