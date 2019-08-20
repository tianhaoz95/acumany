import React, {Component} from 'react';
import {Button, Form, Icon, Input} from 'antd';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {EmailSignUp} from '../../Actions/Auth';

// Never ever use => const { FormItem } = Form.Item
const FormItem  = Form.Item;

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.compareToSecondPassword = this.compareToSecondPassword.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(EmailSignUp(values.email, values.password, values.name));
      }
    });
  };

  handleLoginClick(e) {
    e.preventDefault();
    console.log(this.props);
    this.props.dispatch(push("/sign/in"));
  };

  compareToFirstPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  compareToSecondPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Sign Up</h1>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email address!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email Address" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' },
                    { validator: this.compareToSecondPassword } ],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: 'Please verify your Password!' },
                    { validator: this.compareToFirstPassword } ]
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Confirm Password" />
          )}
        </FormItem>
        <FormItem>
          <p className={"login-form-error"}>{this.props.header.signUpError}</p>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.header.signUpLoading}>
            Sign Up
          </Button>
          <a onClick={this.handleLoginClick}>Already a member?</a>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.header,
  }
}

const WrappedSignupForm = Form.create()(connect(mapStateToProps)(SignupForm));

export default WrappedSignupForm;
