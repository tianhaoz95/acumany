import React, { Component } from 'react';
import Scheduler from '../../Workspace/AdvisorProfile/Scheduler';
import { Spin } from 'antd';
import { retrieveEventListByMonth } from '../../Async/Schedule';
import { initAppointment } from '../../Async/Contact';
import { jumpToConversation } from '../../../Actions/Contact';
import { connect } from 'react-redux';
import moment from 'moment';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      status: "loading",
    };
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleAppointment = this.handleAppointment.bind(this);
    this.disabledDate = this.disabledDate.bind(this);
  }

  disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
  }

  componentDidMount() {
    var uid = this.props.uid;
    retrieveEventListByMonth(uid, moment())
    .then((list) => {
      this.setState({
        status: "ready",
        list: list,
      });
    })
    .catch((err) => {
      console.log("fuck", err);
      this.setState({
        status: "ready",
        list: [],
      });
    });
  }

  handleMonthChange(time) {
    console.log(time);
    var uid = this.props.uid;
    this.setState({
      status: "loading",
      list: [],
    });
    retrieveEventListByMonth(uid, time)
    .then((list) => {
      this.setState({
        status: "ready",
        list: list,
      });
    })
    .catch((err) => {
      console.log("fuck", err);
      this.setState({
        status: "ready",
        list: [],
      });
    });
  }

  handleAppointment(info) {
    console.log(info);
    var toUid = this.props.uid;
    initAppointment(toUid, info)
    .then((conversationID) => {
      console.log("appointment sent");
      this.props.dispatch(jumpToConversation(conversationID, toUid));
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  }

  render() {
    return(
      <div>
        <Spin spinning={this.state.status === "loading"} style={{position:"absolute",left:10}}>
          <Scheduler
            fullscreen={true}
            disabledDate={this.disabledDate}
            list={this.state.list}
            onMonthChange={this.handleMonthChange}
            mode="view"
            onAppointment={this.handleAppointment}
          />
        </Spin>
      </div>
    );
  }
}

export default connect()(Schedule);
