import React, { Component } from 'react';
import { Form, Input, Button, Modal, Icon } from 'antd';
import { initConversation } from '../Async/Search';

const FormItem = Form.Item;

class SendFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      error: false,
      visible: false,
    };
    this.titleOptions = {
      rules: [{ required: true, message: 'Title cannot be empty' }],
    };
    this.titleOptions = {
      rules: [{ required: true, message: 'Message cannot be empty' }],
    };
    this.handleSend = this.handleSend.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  handleSend(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        console.log('Received values of form: ', values);
        var content = { text: values.content };
        initConversation(this.props.uid, values.title, content, "plain_message")
        .then(() => {
          this.setState({
            confirmLoading: false,
            error: false,
            visible: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            confirmLoading: false,
            error: true,
          });
        });
      }
    });
  }

  handleCancel() {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return(
      <div>
        <Button type={this.props.type} onClick={this.showModal}>
          <Icon type={this.props.icon}/>{this.props.text}
        </Button>
        <Modal title="Start Conversation"
          visible={this.state.visible}
          onOk={this.handleSend}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSend}>
            <FormItem label="Title" className="send-form-item">
              {getFieldDecorator('title', this.titleOptions)(
                <Input placeholder="Title" />
              )}
            </FormItem>
            <FormItem label="Message" className="send-form-item">
              {getFieldDecorator('content', this.contentOptions)(
                <Input type="textarea"/>
              )}
              {this.state.error ? "Whoops, something is wrong" : null}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(SendFormModal);
