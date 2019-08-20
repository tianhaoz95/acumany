import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, DatePicker } from 'antd';
import { verifyCreditCard } from '../../../Actions/Business';

const { MonthPicker } = DatePicker;
const FormItem = Form.Item;

const numberOption = {
  rules: [
    {
      required: true,
      len: 16,
    }
  ],
};

const nameOption = {
  rules: [
    {
      required: true,
    }
  ],
};

const cvcOption = {
  rules: [
    {
      required: true,
      len: 3,
    }
  ],
};

const expireOption = {
  rules: [
    {
      required: true,
    }
  ],
};

const monthFormat = 'MM/YYYY';

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(verifyCreditCard(values));
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return(
      <div className="business-payment-card-form-container">
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Cardholder's Name">
            {getFieldDecorator('name', nameOption)(
              <Input
                prefix={<Icon type="user"/>}
                placeholder="The name on the card"
                disabled={this.props.status === "verified"}
                />
            )}
          </FormItem>
          <FormItem label="Credit Card Number">
            {getFieldDecorator('number', numberOption)(
              <Input
                prefix={<Icon type="credit-card"/>}
                placeholder="16 digits card number, no space needed"
                disabled={this.props.status === "verified"}
                />
            )}
          </FormItem>
          <FormItem label="CVC">
            {getFieldDecorator("cvc", cvcOption)(
              <Input
                prefix={<Icon type="lock"/>}
                placeholder="3 digits code"
                disabled={this.props.status === "verified"}
                />
            )}
          </FormItem>
          <FormItem label="Expire Month/Year">
            {getFieldDecorator('expire', expireOption)(
              <MonthPicker
                disabled={this.props.status === "verified"}
                format={monthFormat}
                />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              icon="safety"
              htmlType="submit"
              disabled={this.props.status === "verified"}
              loading={this.props.status === "loading"}
              size="large">
              Verify Card
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.business.verifyCardStatus,
  }
}

export default Form.create()(connect(mapStateToProps)(CardForm));
