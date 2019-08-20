import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { getCurrentEmailAddr, updateEmailAddr } from '../../Async/Settings';

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
        updateEmailAddr(values.email)
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
      <div className="update-email">
        <h2>Update E-mail</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="New Email Address">
            {getFieldDecorator('enter new email', {
              initialValue: getCurrentEmailAddr(),
              rules: [{ required: true, message: 'New email cannot be empty!' }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem>
            {this.state.status === "error" ? ("Whoops, something is wrong") : (null)}
            <Button loading={this.state.status === "loading"} type="primary" htmlType="submit">
              Update Email Address
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Email);
