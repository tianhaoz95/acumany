import React, { Component } from 'react';
import { createEmptyState } from 'ory-editor-core';
import 'ory-editor-core/lib/index.css';
// original:
//    import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui';
//    commented out to clean unused variable to improve compile time
import 'ory-editor-ui/lib/index.css';
import slate from 'ory-editor-plugins-slate';
import 'ory-editor-plugins-slate/lib/index.css';
import parallax from 'ory-editor-plugins-parallax-background';
import 'ory-editor-plugins-parallax-background/lib/index.css';
import image from 'ory-editor-plugins-image';
import 'ory-editor-plugins-image/lib/index.css';
import spacer from 'ory-editor-plugins-spacer';
import 'ory-editor-plugins-spacer/lib/index.css';
import divider from 'ory-editor-plugins-divider';
import 'ory-editor-plugins-spacer/lib/index.css';
import video from 'ory-editor-plugins-video';
import 'ory-editor-plugins-video/lib/index.css';
import { fetchEnterpriseInfo } from '../Async/Enterprise';
import { HTMLRenderer } from 'ory-editor-renderer';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      content: createEmptyState(),
    };
  }

  componentDidMount() {
    var uid = this.props.uid;
    var thisObj = this;
    fetchEnterpriseInfo(uid)
    .then(function (info) {
      thisObj.setState({
        status: "ready",
        content: JSON.parse(info.homepage),
      });
    })
    .catch(function (err) {
      thisObj.setState({
        status: "error",
      });
    });
  }

  renderLoading() {
    return(
      <div>
        Loading
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

  renderReady() {
    var plugins = {
      content: [slate(), video, image, spacer, divider],
      layout: [parallax({ defaultPlugin: slate() })]
    };

    return(
      <div>
        <HTMLRenderer state={this.state.content} plugins={plugins}/>
      </div>
    );
  }

  render() {
    let content = null;

    if (this.state.status === "loading") {
      content = this.renderLoading();
    } else if (this.state.status === "ready") {
      content = this.renderReady();
    } else if (this.state.status === "error") {
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

export default Homepage;
