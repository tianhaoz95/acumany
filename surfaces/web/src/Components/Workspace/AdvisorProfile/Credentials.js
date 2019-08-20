import React, { Component } from 'react';
import MyEditor from './MyEditor';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import { updateEditAdvisorCredential, updateAdvisorCredentialContent, uploadAdvisorCredential } from '../../../Actions/Profile';

class Credentials extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleEdit() {
    this.props.dispatch(updateEditAdvisorCredential(true));
  }

  handleCancel() {
    this.props.dispatch(updateEditAdvisorCredential(false));
  }

  handleSubmit() {
    this.props.dispatch(uploadAdvisorCredential());
  }

  handleUpdate(state) {
    this.props.dispatch(updateAdvisorCredentialContent(state));
  }

  renderEdit() {
    return(
      <div ref="editBox">
        <Row>
          <Col span="22">
            {this.props.original ? (
              <MyEditor
                type="edit"
                content={this.props.original}
                update={this.handleUpdate}
                />
            ) : (
              <p>Loading</p>
            )}
          </Col>
          <Col span="2">
            <Row>
              <Col span="24">
                <Button
                  className="advisor-introduction-button"
                  shape="circle"
                  icon="check"
                  onClick={this.handleSubmit}
                  loading={this.props.loading}
                  />
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <Button
                  className="advisor-introduction-button"
                  shape="circle"
                  onClick={this.handleCancel}
                  icon="close" />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  renderView() {
    return(
      <div>
        <Row>
          <Col span="22">
            {this.props.original ? (
              <MyEditor
                content={this.props.original}
                update={this.handleUpdate}
                type="preview"
                />
            ) : (
              <p>Loading</p>
            )}
          </Col>
          <Col span="2">
            <Row>
              <Col span="24">
                <Button
                  className="advisor-introduction-button"
                  shape="circle"
                  onClick={this.handleEdit}
                  icon="edit" />
              </Col>
              <Col span="24">
                <Button
                  className="advisor-introduction-button"
                  shape="circle"
                  icon="share-alt" />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  render() {

    let content = null;

    if (this.props.edit) {
      content = this.renderEdit();
    } else {
      content = this.renderView();
    }

    return(
      <div>
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    edit: state.advisorCredential.edit,
    loading: state.advisorCredential.loading,
    original: state.auth.advisorInfo ? (state.auth.advisorInfo.credential) : (null),
  }
}

export default connect(mapStateToProps)(Credentials);
