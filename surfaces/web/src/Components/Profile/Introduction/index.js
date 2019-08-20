import React, { Component } from 'react';
import MyEditor from '../../Workspace/AdvisorProfile/MyEditor';
import { retrieveAdvisorIntroduction } from '../../Async/Preview';

class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      content: null,
    };
  }

  componentDidMount() {
    retrieveAdvisorIntroduction(this.props.uid)
    .then((content) => {
      this.setState({
        status: "ready",
        content: content,
      });
    })
    .catch((err) => {
      console.log("fuck", err);
      this.setState({
        status: "error",
      });
    })
  }

  renderLoading() {
    return(
      <div>
        Loading
      </div>
    );
  }

  renderIntroduction() {
    return(
      <div>
        <MyEditor
          content={this.state.content}
          type="preview"
          />
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

  render() {
    let content = null;

    if (this.state.status === "loading") {
      content = this.renderLoading();
    } else if (this.state.status === "ready") {
      content = this.renderIntroduction();
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

export default Introduction;
