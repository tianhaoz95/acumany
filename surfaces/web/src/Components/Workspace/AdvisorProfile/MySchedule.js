import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scheduler from './Scheduler';
import AddEventForm from './Scheduler/AddEventForm';
import { refreshMonthEventList } from '../../../Actions/Schedule';
import moment from 'moment';
import { Spin } from 'antd';

class MySchedule extends Component {
  constructor(props) {
    super(props);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(refreshMonthEventList(moment()));
  }

  handleMonthChange(newTime) {
    this.props.dispatch(refreshMonthEventList(newTime));
  }

  render() {
    return(
      <div>
        <Spin spinning={this.props.status === "loading"} style={{position:"absolute",left:10}}>
          <Scheduler
            list={this.props.list}
            onMonthChange={this.handleMonthChange}
            mode="edit"
            />
        </Spin>
        <AddEventForm/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.advisorSchedule.status,
    list: state.advisorSchedule.eventList,
  }
}

export default connect(mapStateToProps)(MySchedule);
