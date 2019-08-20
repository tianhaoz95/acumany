import React, { Component } from 'react';
import { Calendar, Popover } from 'antd';
import { filterEventByDate } from '../../../Async/Schedule';
import moment from 'moment';
import EditPopover from './EditPopover';
import ViewPopover from './ViewPopover';

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: moment(),
    };
    this.dateCellRender = this.dateCellRender.bind(this);
    this.handlePanelChange = this.handlePanelChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.renderPopover = this.renderPopover.bind(this);
  }

  handleSelect(time) {
    var currentTime = this.state.currentTime;
    var newTime = time;
    this.setState({ currentTime: time });
    if (currentTime.isSame(newTime, 'month')) {
      console.log("same month, no need to update");
    } else {
      this.props.onMonthChange(newTime);
    }
  }

  handlePanelChange(time, mode) {
    console.log(time, mode);
    if (mode === "month") {
      var currentTime = this.state.currentTime;
      var newTime = time;
      this.setState({ currentTime: time });
      if (currentTime.isSame(newTime, 'month')) {
        console.log("same month, no need to update");
      } else {
        this.props.onMonthChange(newTime);
      }
    } else {
      this.setState({ currentTime: time });
      console.log("year mode, do nothing");
    }
  }

  dateCellRender(date) {
    var list = filterEventByDate(date, this.props.list);
    return (
      <div>
        {list.map((info, index) => (
          <div key={index}>
            <Popover
              content={this.renderPopover(info)}
              title={moment(Number(info.scheduleTime)).format("h:mm a")}>
              {moment(Number(info.scheduleTime)).format("h:mm a")}
            </Popover>
          </div>
        ))}
      </div>
    );
  }

  renderPopover(info) {
    switch (this.props.mode) {
      case "edit": {
        return (<EditPopover info={info}/>);
      }

      case "view": {
        return (<ViewPopover info={info} onAppointment={this.props.onAppointment}/>);
      }

      default: console.log("fuck, you are a long way from home");
    }
  }

  render() {
    return(
      <div>
        <Calendar
          fullscreen={true}
          onSelect={this.handleSelect}
          onPanelChange={this.handlePanelChange}
          mode="month"
          dateCellRender={this.dateCellRender}
          disabledDate={this.props.disabledDate}
          />
      </div>
    );
  }
}

export default Scheduler;
