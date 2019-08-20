import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Select, Row, Col, Alert } from 'antd';
import { push } from 'react-router-redux';
import { nextStep, prevStep, setBasicObject } from '../../../Actions/Business';

const FormItem = Form.Item;
const Option = Select.Option;

class BasicForm extends Component {
  constructor(props) {
    super(props);
    this.descriptionOption = {
      initialValue: this.props.basicInfo ? this.props.basicInfo.description : null,
      rules: [
        {
          required: true,
        }
      ],
    };
    this.skillOption = {
      initialValue: this.props.basicInfo ? this.props.basicInfo.skill : null,
      rules: [
        {
          required: true,
        }
      ],
    };
    this.typeOption = {
      initialValue: "public",
      rules: [
        {
          required: true,
        }
      ],
    };
    this.nameOption = {
      initialValue: this.props.basicInfo ? this.props.basicInfo.name : null,
      rules: [
        {
          required: true,
        }
      ],
    };
    this.emailOption = {
      initialValue: this.props.basicInfo ? this.props.basicInfo.email : null,
      type: "email",
      rules: [
        {
          required: true,
        }
      ],
    };
    this.passwordOption = {
      min: 8,
      rules: [
        {
          required: true,
        }
      ],
    };
    this.confirmOption = {
      min: 8,
      rules: [
        {
          required: true,
        }
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBackToPayment = this.handleBackToPayment.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
    this.renderStatus = this.renderStatus.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(setBasicObject(values));
      }
    });
  }

  handleNextStep() {
    this.props.dispatch(nextStep());
  }

  handleCancel() {
    this.props.dispatch(push("/"));
  }

  handleBackToPayment() {
    this.props.dispatch(prevStep());
  }

  renderStatus() {
    let content = null;

    if (this.props.status === "error") {
      content = (
        <Alert
          message="Network Error"
          type="error"
          showIcon
          />
      );
    } else if (this.props.status === "passwordnotmatch") {
      content = (
        <Alert
          message="Passwords do not match"
          type="error"
          showIcon
          />
      );
    } else {
      content = (
        <Alert
          message="Almost there"
          type="success"
          showIcon
          />
      );
    }

    return(
      <div>
        {content}
      </div>
    );
  }

  render() {
    let status = this.renderStatus();

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };

    return(
      <div className="business-basic-info-form-container">
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Organization Name">
            {getFieldDecorator('name', this.nameOption)(
              <Input
                prefix={<Icon type="user"/>}
                placeholder="name of your entity"
                />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Specialty">
            {getFieldDecorator('skill', this.skillOption)(
              <Input
                prefix={<Icon type="trophy"/>}
                placeholder="What is your organization dealing with"
                />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Description">
            {getFieldDecorator('description', this.descriptionOption)(
              <Input
                prefix={<Icon type="bars"/>}
                placeholder="Tell us about your organization"
                />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Email">
            {getFieldDecorator("email", this.emailOption)(
              <Input
                prefix={<Icon type="mail"/>}
                placeholder="email address"
                />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {getFieldDecorator('password', this.passwordOption)(
              <Input
                prefix={<Icon type="lock"/>}
                type="password"
                placeholder="password"
                />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password">
            {getFieldDecorator('confirm', this.confirmOption)(
              <Input
                prefix={<Icon type="lock"/>}
                type="password"
                placeholder="confirm password"
                />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Type">
            {getFieldDecorator('audience', this.typeOption)(
              <Select>
                <Option value="public">Public</Option>
                <Option value="private">Private</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Row>
              <Col span="4">
                <Button
                  onClick={this.handleCancel}
                  icon="delete"
                  type="danger"
                  size="large"
                  >
                  Cancel
                </Button>
              </Col>
              <Col span="4">
                <Button
                  onClick={this.handleBackToPayment}
                  icon="left-circle-o"
                  size="large"
                  >
                  Prev Step
                </Button>
              </Col>
              <Col span="4">
                <Button
                  size="large"
                  icon="right-circle-o"
                  htmlType="submit"
                  >
                  Next Step
                </Button>
              </Col>
              <Col span="12">
                {status}
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.business.basicStatus,
    basicInfo: state.business.basicObj,
  }
}

export default Form.create()(connect(mapStateToProps)(BasicForm));
