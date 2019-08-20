import React, {Component} from 'react';
import {Button, Checkbox, Form, Icon, Input, message} from 'antd';
import {connect} from 'react-redux';
import {EmailLogin} from '../../Actions/Auth';
import {sendPasswordReset} from '../Async/AuthHelper';
import {push} from "react-router-redux";

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(EmailLogin(values.email, values.password, values.remember));
      }
    });
  }

  handleSignUpClick(e) {
    e.preventDefault();
    console.log(this.props);
    this.props.dispatch(push("/sign/up"));
  };

  handleForgotPassword(e) {
    console.log("this idiot forgot password");
    var email = this.props.form.getFieldValue("email");
    sendPasswordReset(email)
      .then(() => {
        message.success('Password reset email sent');
      })
      .catch((err) => {
        message.error('Double check your email address');
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Log In</h1>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email address!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email Address" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a
            className="login-form-forgot"
            onClick={this.handleForgotPassword}>
            Forgot password
          </a>
        </FormItem>
        <FormItem>
          {this.props.header.loginError ? "Whoops, something is wrong" : null}
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.header.loginLoading}>
            Log in
          </Button>
          <a onClick={this.handleSignUpClick}>Not a member?</a>
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

const WrappedLoginForm = Form.create()(connect(mapStateToProps)(LoginForm));

export default WrappedLoginForm;
