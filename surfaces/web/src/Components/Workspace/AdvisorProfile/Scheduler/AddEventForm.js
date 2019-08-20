import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, DatePicker, TimePicker, Input, Alert } from 'antd';
import { addEvent } from '../../../../Actions/Schedule';

const FormItem = Form.Item;

class AddEventForm extends Component {
  constructor(props) {
    super(props);
    this.dateRules = {
      rules: [{ required: true }],
    };
    this.timeRules = {
      rules: [{ required: true }],
    };
    this.noteRules = {
      rules: [{ required: true }],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(addEvent(values));
        this.props.form.resetFields();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('note', this.noteRules)(
            <Input placeholder="Leave a note"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('date', this.dateRules)(
            <DatePicker/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('time', this.timeRules)(
            <TimePicker format={'HH:mm'}/>
          )}
        </FormItem>
        <FormItem>
          {this.props.status === "done" ?
            (<Alert message="Added" type="success" />) : (null)}
          <Button loading={this.props.status === "loading"} type="primary" htmlType="submit">
            Add To My Schedule
          </Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.advisorSchedule.addEventStatus,
  }
}

export default Form.create()(connect(mapStateToProps)(AddEventForm));
