import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginButton from './LoginButton';
import Logo from './Logo';
import SearchBar from './SearchBar';
import SignupButton from './SignupButton';
import MyWorkSpace from './MyWorkspace';
// import style components
import {header, Row} from 'antd';
import './index.css';

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ishomepage: props.ishomepage
    };
    //this.handleClick = this.handleClick().bind(this);
  }

  handleClick() {
    //this.props.dispatch(push('/signup'));
  }

  renderGuest() {
    return(
      <Row align='middle'>
        <Logo />
        <SearchBar />
        <SignupButton />
        <LoginButton />
         {/*<Business />*/}
      </Row>
    );
  }

  renderUser() {
    return(
      <Row align='middle'>
        <Logo />
        <SearchBar />
        <MyWorkSpace />
      </Row>
    );
  }

  render() {

    let content = null;
    let visibleSearch = this.state.ishomepage ? 'hide-top-search' : null;

    if (this.props.auth.auth) {
      content = this.renderUser();
    } else {
      content = this.renderGuest();
    }

    return(
      <header className={'main-header ' + visibleSearch}>
        {content}
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(MainHeader);
