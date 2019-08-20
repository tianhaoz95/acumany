import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Row, Col, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';
import { updateEditAvatar, updateAvatarFile, uploadAvatar } from '../../../Actions/Profile';
import './avatar.css';

const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    postUrl: 'no-url',
};

const djsConfig = {
  autoProcessQueue: false,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div>
      <img alt="" data-dz-thumbnail="true" className="avatar-upload-thumbnail" />
    </div>
  )
};

class AvatarField extends Component {
  constructor(props) {
    super(props);
    this.eventHandlers = {
      addedfile: (file) => {this.props.dispatch(updateAvatarFile(file));}
    };
    this.handleEditAvatar = this.handleEditAvatar.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  handleEditAvatar() {
    this.props.dispatch(updateEditAvatar(true));
  }

  handleUploadAvatar() {
    this.props.dispatch(uploadAvatar());
  }

  handleCancelEdit() {
    this.props.dispatch(updateEditAvatar(false));
  }

  renderEditTools() {
    return(
      <div className="avatar-edit-active">
        <Row>
          <Col className="avatar-dropzone-cell">
            <DropzoneComponent
              className="avatar-dropzone-container"
              config={componentConfig}
              eventHandlers={this.eventHandlers}
              djsConfig={djsConfig}
              />
          </Col>
        </Row>
        <Row className="avatar-upload-actions">
          <Col className="avatar-upload-button-cell">
            <Button
              className="avatar-upload-button"
              onClick={this.handleUploadAvatar}
              loading={this.props.loading}
              icon="check"
              >
              Upload
            </Button>
          </Col>
          <Col className="avatar-cancel-button-cell">
            <Button
              className="avatar-cancel-button"
              onClick={this.handleCancelEdit}
              icon="close"
              >
              Cancel
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  renderEditIcon() {
    return(
        <Button
          className="avatar-edit-button"
          onClick={this.handleEditAvatar}
          >
          <Icon type="edit" /> Edit Avatar
        </Button>
    );
  }

  render() {
    return(
      <Row className="avatar-field-row">
        <Col className="avatar-cell">
          <img className="avatar-img" alt="" src={this.props.url}/>
        </Col>
        <Col className="avatar-edit-cell">
          {this.props.edit ? (this.renderEditTools()) : (this.renderEditIcon())}
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    url: state.auth.basicInfo.photo,
    edit: state.avatar.edit,
    loading: state.avatar.loading,
  }
}

export default connect(mapStateToProps)(AvatarField);
