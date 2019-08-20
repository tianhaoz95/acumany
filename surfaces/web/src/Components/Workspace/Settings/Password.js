import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { updateUserPassword } from '../../Async/Settings';

const FormItem = Form.Item;

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "pending",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var thisObj = this;
    this.props.form.validateFields((err, values) => {
      thisObj.setState({ status: "loading" });
      if (!err) {
        console.log('Received values of form: ', values);
        updateUserPassword(values.password, values.confirmation)
        .then(function () {
          thisObj.setState({ status: "done" });
        })
        .catch(function (err) {
          console.log("fuck", err);
          thisObj.setState({ status: "error" });
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="update-password">
        <h2>Update Password</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="New Password">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'New email cannot be empty!' }],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem label="Confirm New Password">
            {getFieldDecorator('confirmation', {
              rules: [{ required: true, message: 'New email cannot be empty!' }],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem>
            {this.state.status === "error" ? ("Whoops, something is wrong") : (null)}
            <Button loading={this.state.status === "loading"} type="primary" htmlType="submit">
              Update Password
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Email);
