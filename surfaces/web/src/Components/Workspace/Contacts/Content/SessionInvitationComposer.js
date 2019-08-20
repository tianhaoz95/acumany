import { Button, DatePicker, Form, Input, InputNumber, TimePicker } from 'antd';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { sendSessionInvitation } from '../../../../Actions/Contact';

const FormItem = Form.Item;

class SessionInvitationComposer extends Component {
  constructor(props) {
    super(props);
    this.titleOption = {
      rules: [{ required: true, message: 'Title cannot be empty!' }],
    };
    this.contentOption = {
      rules: [{ required: true, message: 'Content cannot be empty!' }],
    };
    this.priceOption = {
      rules: [{ required: true }],
    };
    this.dateOption = {
      initialValue: props.defaultTime,
      rules: [{ required: true }],
    };
    this.timeOption = {
      initialValue: props.defaultTime,
      rules: [{ required: true }],
    };
    this.durationOption = {
      rules: [{ required: true }],
    };
    this.defaultTime = props.defaultTime;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.form.resetFields();
        this.props.dispatch(sendSessionInvitation(values));
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultTime.valueOf() !== this.defaultTime.valueOf()) {
      console.log("next => ", nextProps.defaultTime);
      console.log("this => ", this.defaultTime);
      console.log("need update defaultTime");
      this.defaultTime = nextProps.defaultTime;
      this.props.form.setFields({ date: { value: nextProps.defaultTime, errors: null } });
      this.props.form.setFields({ time: { value: nextProps.defaultTime, errors: null } });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <span className="message-invite-details">
          <FormItem label="Title">
            {getFieldDecorator('title', this.titleOption)(
              <Input/>
            )}
          </FormItem>
          <FormItem label="Date">
            {getFieldDecorator('date', this.dateOption)(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem label="Time">
            {getFieldDecorator('time', this.timeOption)(
              <TimePicker format="HH:mm"/>
            )}
          </FormItem>
          <FormItem label="Price">
            {getFieldDecorator('price', this.priceOption)(
              <InputNumber />
            )}
          </FormItem>
          <FormItem label="Duration">
            {getFieldDecorator('duration', this.durationOption)(
              <InputNumber/>
            )}
          </FormItem>
        </span>
        <FormItem label="Content">
          {getFieldDecorator('content', this.contentOption)(
            <Input type="textarea" rows={4}/>
          )}
        </FormItem>
        <FormItem>
          {this.props.status === "error" ? "Whoops, something is wrong" : null}
          <Button
            loading={this.props.status === "loading"}
            htmlType="submit"
            >
            Send Invitation
          </Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.contact.messageComposerStatus,
    defaultTime: state.contact.invitationDefaultTime,
  }
}

export default Form.create()(connect(mapStateToProps)(SessionInvitationComposer));
