import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { initConversation } from '../Async/Search';

const FormItem = Form.Item;

class SendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
    };
    this.titleOptions = {
      rules: [{ required: true, message: 'Title cannot be empty' }],
    };
    this.titleOptions = {
      rules: [{ required: true, message: 'Message cannot be empty' }],
    };
    this.handleSend = this.handleSend.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSend(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        console.log('Received values of form: ', values);
        var content = { text: values.content };
        initConversation(this.props.uid, values.title, content, "plain_message")
        .then(() => {
          this.setState({
            loading: false,
            error: false,
          });
          this.props.close();
        })
        .catch((err) => {
          this.setState({
            loading: false,
            error: true,
          });
        });
      }
    });
  }

  handleCancel() {
    this.props.close();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return(
      <Form onSubmit={this.handleSend}>
        <FormItem label="Title" className="send-form-item">
          {getFieldDecorator('title', this.titleOptions)(
            <Input placeholder="Title" />
          )}
        </FormItem>
        <FormItem label="Message" className="send-form-item">
          {getFieldDecorator('content', this.contentOptions)(
            <Input
              type="textarea"
              />
          )}
        </FormItem>
        <FormItem className="send-form-item">
          {this.state.error ? "Whoops, something is wrong" : null}
          <Button
            icon="delete"
            type="danger"
            onClick={this.handleCancel}
            className="send-form-buttons"
            >
            Cancel
          </Button>
          <Button
            type="primary"
            icon="rocket"
            htmlType="submit"
            className="send-form-buttons"
            loading={this.state.loading}
            >
            Send
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SendForm);
