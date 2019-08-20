import React, { Component } from 'react';
import AvatarField from '../Profile/AvatarField';
import InfoField from '../Profile/InfoField';
import BecomeAdvisor from './BecomeAdvisor';
import { checkUserType } from '../../../Actions/Checker';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

class BasicProfile extends Component {
  componentWillMount() {
    this.props.dispatch(checkUserType("user"));
  }

  render() {
    return(
      <div className="basic-profile-edit">
        <Row>
          <Col span="8" offset={8} className="profile-settings">
            <AvatarField />
            <InfoField />
            <BecomeAdvisor />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(BasicProfile);
