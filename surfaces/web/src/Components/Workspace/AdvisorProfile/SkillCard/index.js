import React, { Component } from 'react';
import { Card, Row, Col, Icon, Button, Input, InputNumber, Select, Form, Rate, Modal } from 'antd';
import './index.css';
import { connect } from 'react-redux';
import { addSkill, removeSkill, updateSkillObject, updateSkill } from '../../../Async/Skill';
import { refreshProfileSkillList } from '../../../../Actions/Profile';

const ButtonGroup = Button.Group;
const Option = Select.Option;
const FormItem = Form.Item;

class SkillCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      spinning: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleDeleteSkill = this.handleDeleteSkill.bind(this);
  }

  handleEdit() {
    this.setState({
      modalVisible: true
    });
  };

  handleSubmitAdd(e) {
    e.preventDefault();
    this.props.form.validateFields((err, info) => {
      if (err) {
        return;
      }
      this.setState({ spinning: true });
      addSkill(info)
      .then(() => {
        this.setState({
          spinning: false,
          modalVisible: false
        });
        this.props.dispatch(refreshProfileSkillList());
      })
      .catch((err) => {
        console.error("err", err);
      });
    });
  };

  handleSubmitEdit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, info) => {
      if (!err) {
        console.log('Received values of form: ', info);
        this.setState({ spinning: true });
        const newSkill = updateSkillObject({
          original: this.props.info,
          update: info,
        });
        updateSkill(newSkill)
        .then(() => {
          this.setState({
            spinning: false,
            modalVisible: false
          });
          this.props.dispatch(refreshProfileSkillList());
        })
        .catch((err) => {
          console.log("fuck", err);
        });
      } else {
        console.log("fuck", err);
      }
    });
  };

  handleCancelEdit() {
    this.setState({
      modalVisible: false
    });
  };

  handleDeleteSkill() {
    removeSkill(this.props.info)
    .then(() => {
      this.setState({
        modalVisible: false
      });
      this.props.dispatch(refreshProfileSkillList());
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  };

  renderNewButton() {
    return(
      <Card title="Add New Skill" className="skill-card-outter-container">
        <Button shape="circle" icon="plus" onClick={this.handleEdit} className="add-new-skill-button"/>
      </Card>
    );
  }

  renderView() {
    const CardExtras = <div className={" skill-card-extra-container"}>
      <Icon type="edit" onClick={this.handleEdit} spin={false}
            style={{ fontSize: 16, color: '#08c', paddingRight: '5px' }}/>
      <Icon type={"delete"} onClick={this.handleDeleteSkill} spin={false}
            style={{ fontSize: 16, color: 'red', paddingLeft: '5px' }}/>
    </div>;

    return(
      <Card title={this.props.info.skill}
            extra={CardExtras}
            className="skill-card-outter-container">
        <div>
          <h4>Description: </h4>
          <p>{this.props.info.description}</p>
        </div>
        <Row>
        <Col span={12}>
          <h4>Rate: </h4>
          <p>${this.props.info.rate}/hr</p>
        </Col>
        <Col span={12}>
          <h4>Audience: </h4>
          <p>{this.props.info.audience}</p>
        </Col>
        </Row>
        <div>
          <h4>Rate: </h4>
          <Rate disabled defaultValue={this.props.info.star}/>
        </div>
      </Card>
    );
  }

  renderModal() {
    const { getFieldDecorator } = this.props.form;
    // Only show error after a field is touched.
    return (
      <Modal
        title="Skill Card"
        visible={this.state.modalVisible}
        footer={null}
        closable={false}>
        <Form onSubmit={this.props.info ? this.handleSubmitEdit : this.handleSubmitAdd}>
          {!this.props.info && (
            <FormItem label="Title: " className="skill-card-edit-description-input">
              {getFieldDecorator('skill', {
                rules: [{ required: true, message: 'Please input your skill!' }],
                initialValue: this.props.info ? this.props.info.skill: '',
              })(
                <Input type="textarea" autosize={{ minRows: 1, maxRows: 2 }}/>
              )}
            </FormItem>
          )}
          <FormItem label="Description: " className="skill-card-edit-description-input">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please input your description!' }],
              initialValue: this.props.info ? this.props.info.description : '',
            })(
              <Input type="textarea" autosize={{ minRows: 1, maxRows: 2 }}/>
            )}
          </FormItem>
          <FormItem label="Rate ($/hr): " className="skill-card-edit-rate-input">
            {getFieldDecorator('rate', {
              initialValue: Number(this.props.info ? this.props.info.rate : 0),
              rules: [{ required: true, type: "number" }]
            })(
              <InputNumber style={{ width: "100%" }} />
            )}
          </FormItem>
          <FormItem label="Audience: " className="skill-card-edit-audience-input">
            {getFieldDecorator('audience', {
              initialValue: this.props.info ? this.props.info.audience : '',
            })(
              <Select>
                <Option value="public">Public</Option>
                <Option value="optimize">Optimize</Option>
                <Option value="um">University of Michigan</Option>
              </Select>
            )}
          </FormItem>
          <FormItem style={{ textAlign: "center" }}>
            <ButtonGroup className="skill-card-edit-button-group">
              <Button icon="close" onClick={this.handleCancelEdit}>Cancel</Button>
              <Button type="primary" htmlType="submit" icon="check">Save</Button>
            </ButtonGroup>
          </FormItem>
        </Form>
      </Modal>
    )
  }

  render() {
    if (this.props.info) {
      return(
        <div>
          {this.renderView()}
          {this.renderModal()}
        </div>
      );
    } else {
      return(
        <div>
          {this.renderNewButton()}
          {this.renderModal()}
        </div>
      );
    }
  }
}

const WrappedSkillCard = Form.create()(connect()(SkillCard));

export default WrappedSkillCard;
