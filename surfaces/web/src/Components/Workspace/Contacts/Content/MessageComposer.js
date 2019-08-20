import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { sendPlainMessage } from '../../../../Actions/Contact';

const FormItem = Form.Item;

class MessageComposer extends Component {
  constructor(props) {
    super(props);
    this.contentOption = {
      rules: [{ required: true, message: 'Content cannot be empty!' }],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values["title"] = "Reply";
        this.props.form.resetFields();
        this.props.dispatch(sendPlainMessage(values));
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="Reply">
          {getFieldDecorator('content', this.contentOption)(
            <Input autoComplete="off" placeholder="Message Body" type="textarea" rows={4} />
          )}
        </FormItem>
        <FormItem>
          {this.props.status === "error" ? "Whoops, something is wrong" : null}
          <Button
            loading={this.props.status === "loading"}
            htmlType="submit"
            >
            Reply
          </Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.contact.messageComposerStatus,
  }
}

export default Form.create()(connect(mapStateToProps)(MessageComposer));
