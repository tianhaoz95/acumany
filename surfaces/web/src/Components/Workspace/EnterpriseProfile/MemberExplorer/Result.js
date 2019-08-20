import { Card, Col, Row, Tag } from 'antd';
import React, { Component } from 'react';

class Result extends Component {
  render() {
    console.log(this.props.info);
    let skillContent = null;

    if (this.props.info.skill !== null && this.props.info.skill !== undefined) {
      skillContent = (
        <div>
          <p>Skills: </p>
          {this.props.info.skill.map((info, index) => (
            <Tag color="pink" key={index}>
              {info.skill}
            </Tag>
          ))}
        </div>
      );
    }

    return(
      <Card>
        <Row>
          <Col span="8">
            <img alt="member-pic" src={this.props.info.photo}/>
          </Col>
          <Col span="16">
            <p>Name: {this.props.info.name}</p>
            <p>Email: {this.props.info.email}</p>
            <p>Timezone: {this.props.info.timezone}</p>
            {skillContent}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Result;
