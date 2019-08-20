import { Button, Checkbox, Form, Input, Modal, Rate, Select } from 'antd';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchSkillList } from '../../Async/Session';
import { reviewSession } from '../../../Actions/Session';

const FormItem = Form.Item;
const Option = Select.Option;

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      status: "inactive",
      skillList: [],
      confirmLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var thisObj = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        thisObj.setState({ confirmLoading: true });
        console.log('Received values of form: ', values);
        var reviewObj = values;
        reviewObj.skill = JSON.parse(values.skill);
        console.log(reviewObj.skill);
        thisObj.props.dispatch(reviewSession(reviewObj, this.props.info));
      }
    });
  }

  showModal() {
    var thisObj = this;
    this.setState({ status: "loading" });
    fetchSkillList(this.props.info.ownerUid)
    .then(function (skillList) {
      thisObj.setState({
        visible: true,
        status: "ready",
        skillList: skillList,
      });
    })
    .catch(function (err) {
      console.log("fuck", err);
      thisObj.setState({
        status: "error",
      });
    });
  }

  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Button loading={this.state.status === "loading"} disabled={this.state.status === "error"} type={this.state.status === "error" ? "danger" : "primary"} onClick={this.showModal}>Review Session</Button>
        <Modal
          title="Review"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          >
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('starCnt', {
                rules: [{ required: true, message: 'Review cannot be empty!' }],
              })(
                <Rate allowHalf/>
              )}
            </FormItem>
            <FormItem label="subject">
              {getFieldDecorator('skill', {
                rules: [{ required: true, message: 'Subject cannot be empty!' }],
              })(
                <Select>
                  {this.state.skillList.map((skillObj, index) => (
                    <Option key={index} value={JSON.stringify(skillObj)}>
                      {skillObj.skill}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem label="Review">
              {getFieldDecorator('review', {
                rules: [{ required: true, message: 'Review cannot be empty!' }],
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('anonymous', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Review Anonymously</Checkbox>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(connect()(ReviewForm));
