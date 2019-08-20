import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { enterSession } from '../../../Actions/Session';
import { sessionReviewed, isOwner } from '../../Async/Session';
import ReviewForm from './ReviewForm';

// styles and ant design
import { Button, Card, Col, Icon } from 'antd';

class SessionCard extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter() {
    this.props.dispatch(enterSession(this.props.info.sessionID));
  }

  render() {
    var scheduleTime = moment(Number(this.props.info.scheduleTime)).format("dddd, MMMM Do YYYY, h:mm a");
    return(
      <Col span={8}>
        <Card className="session-card"
          title={this.props.info.title}>
          <p>{this.props.info.content}</p>
          <p><Icon type="calendar" /> {scheduleTime}</p>
          <Button
            onClick={this.handleEnter}
            >
            Enter Session
          </Button>
          {isOwner(this.props.info.ownerUid) ? (
            <p>Your own session, no need to review</p>
          ) : (
            sessionReviewed(this.props.info) ? (
              <p>Thanks for your review</p>
            ) : (
              <ReviewForm info={this.props.info}/>
            )
          )}
        </Card>
      </Col>
    );
  }
}

export default connect()(SessionCard);
