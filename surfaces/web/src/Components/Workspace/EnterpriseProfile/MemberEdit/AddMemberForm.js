import { Button, Form, Input, Modal } from 'antd';
import React, { Component } from 'react';

import { addMemberToMyEnterprise } from '../../../../Actions/Enterprise';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class AddMemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(addMemberToMyEnterprise(values.email));
      }
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'email cannot be empty' }],
          })(
            <Input placeholder="email address" />
          )}
        </FormItem>
      </Form>
    );
  }

  render() {
    let content = this.renderForm();

    return(
      <div className="enterprise-add-member-form">
        <Button icon="plus" type="primary" onClick={this.showModal}>Add Member</Button>
        <Modal
          title="Add Member"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          >
          {content}
        </Modal>
      </div>
    );
  }
}

export default Form.create()(connect()(AddMemberForm));
