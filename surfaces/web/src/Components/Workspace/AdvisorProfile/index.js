import React, { Component } from 'react';
import AvatarField from '../Profile/AvatarField';
import InfoField from '../Profile/InfoField';
import MoreInfo from './MoreInfo';
import { Row, Col } from 'antd';
import './index.css';

class AdvisorProfile extends Component {
  render() {
    return(
      <div className="advisor-profile-edit">
        <Row>
          <Col span="8" className="advisor-profile-left-side">
            <AvatarField />
            <InfoField />
          </Col>
          <MoreInfo />
        </Row>
      </div>
    );
  }
}

export default AdvisorProfile;
