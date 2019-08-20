import 'ory-editor-core/lib/index.css';
import 'ory-editor-ui/lib/index.css';
import 'ory-editor-plugins-slate/lib/index.css';
import 'ory-editor-plugins-parallax-background/lib/index.css';
import 'ory-editor-plugins-image/lib/index.css';
import 'ory-editor-plugins-spacer/lib/index.css';
import 'ory-editor-plugins-spacer/lib/index.css';
import 'ory-editor-plugins-video/lib/index.css';

import { Button, Col, Row } from 'antd';
import { DisplayModeToggle, Toolbar, Trash } from 'ory-editor-ui';
import Editor, { Editable, createEmptyState } from 'ory-editor-core';
import React, { Component } from 'react';
import { previewHomepage, refreshEnterpriseInfo, saveMyHomepage } from '../../../../Actions/Enterprise';
import { connect } from 'react-redux';
import { determineContent } from '../../../Async/Enterprise';
import divider from 'ory-editor-plugins-divider';
import image from 'ory-editor-plugins-image';
import parallax from 'ory-editor-plugins-parallax-background';
import slate from 'ory-editor-plugins-slate';
import spacer from 'ory-editor-plugins-spacer';
import video from 'ory-editor-plugins-video';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.updateContent = null;
    this.handleContentChange = this.handleContentChange.bind(this);
    this.renderReady = this.renderReady.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(refreshEnterpriseInfo());
  }

  handlePreview() {
    this.props.dispatch(previewHomepage());
  }

  handleUpload() {
    this.props.dispatch(saveMyHomepage(this.updateContent));
  }

  handleContentChange(content) {
    this.updateContent = content;
  }

  renderReady() {
    var plugins = {
      content: [slate(), video, image, spacer, divider],
      layout: [parallax({ defaultPlugin: slate() })]
    };

    this.content = determineContent(createEmptyState(), this.props.info.homepage);

    this.editor = new Editor({
      plugins,
      editables: [this.content],
      defaultPlugin: slate(),
    });

    return(
      <div className="enterprise-homepage-edit">
        <Row>
          <Col span="20">
            <Editable onChange={this.handleContentChange} editor={this.editor} id={this.content.id}/>
            <Trash editor={this.editor}/>
            <DisplayModeToggle editor={this.editor}/>
            <Toolbar editor={this.editor}/>
          </Col>
          <Col span="4">
            <div>
              <Row>
                <Col span="24">
                  <Button icon="cloud-upload-o" onClick={this.handleUpload}>
                    Upload Changes
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <Button icon="eye-o" onClick={this.handlePreview}>
                    Preview
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  renderError() {
    return(
      <div>
        Error
      </div>
    );
  }

  renderLoading() {
    return(
      <div>
        Loading
      </div>
    );
  }

  render() {
    let content = null;

    if (this.props.status === "loading") {
      content = this.renderLoading();
    } else if (this.props.status === "ready") {
      content = this.renderReady();
    } else if (this.props.status === "error") {
      content = this.renderError();
    } else {
      console.log("fuck, you are a long way from home");
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
    info: state.enterprise.info,
    status: state.enterprise.status,
  }
}

export default connect(mapStateToProps)(Homepage);
