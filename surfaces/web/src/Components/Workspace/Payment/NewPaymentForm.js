import React, { Component } from 'react';
import { Form, Input, Button, Icon, DatePicker } from 'antd';
import { connect } from 'react-redux';
import { ReFetchBasicInfo } from '../../../Actions/Auth';
import { verifyCard, createCustomer } from '../../Async/Business';

const FormItem = Form.Item;
const { MonthPicker } = DatePicker;

const monthFormat = 'MM/YYYY';

class NewPaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
    };
    this.numberOption = {
      rules: [
        {
          required: true,
          len: 16,
        }
      ],
    };

    this.nameOption = {
      rules: [
        {
          required: true,
        }
      ],
    };

    this.cvcOption = {
      rules: [
        {
          required: true,
          len: 3,
        }
      ],
    };

    this.expireOption = {
      rules: [
        {
          required: true,
        }
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        console.log('Received values of form: ', values);
        verifyCard(values)
        .then((snap) => {
          createCustomer(snap.info)
          .then(() => {
            this.props.refresh();
            this.props.dispatch(ReFetchBasicInfo());
            this.setState({
              error: false,
              loading: false
            });
          })
        })
        .catch((err) => {
          this.setState({
            error: true,
            loading: false
          });
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return(
      <div className='new-payment-form'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Cardholder's Name">
            {getFieldDecorator('name', this.nameOption)(
              <Input
                prefix={<Icon type="user"/>}
                placeholder="The name on the card"
                />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Credit Card Number">
            {getFieldDecorator('number', this.numberOption)(
              <Input
                prefix={<Icon type="credit-card"/>}
                placeholder="16 digits card number, no space needed"
                />
            )}
          </FormItem>
          <FormItem className="cvc" label="CVC">
            {getFieldDecorator("cvc", this.cvcOption)(
              <Input
                prefix={<Icon type="lock"/>}
                placeholder="3 digits code"
                />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Expire Month/Year">
            {getFieldDecorator('expire', this.expireOption)(
              <MonthPicker
                format={monthFormat}
                />
            )}
          </FormItem>
          <FormItem {...formItemLayout} className="add-card-container">
            {this.state.error ? "Whoops, something is wrong" : null}
            <Button
              type="primary"
              icon="safety"
              htmlType="submit"
              loading={this.state.loading}
              size="large">
              Add Card
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(connect()(NewPaymentForm));
