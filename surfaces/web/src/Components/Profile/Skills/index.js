import React, { Component } from 'react';
import { retrieveSkills } from '../../Async/Preview';
import Skill from './Skill';

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      skills: [],
    };
  }

  componentDidMount() {
    retrieveSkills(this.props.uid)
    .then((skills) => {
      this.setState({
        status: "ready",
        skills: skills,
      });
    })
    .catch((err) => {
      console.log("fuck", err);
      this.setState({
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

  renderSkills() {
    return(
      <div>
        {this.state.skills.map((skill, index) => (
          <Skill key={index} info={skill} />
        ))}
      </div>
    );
  }

  render() {
    let content = null;

    if (this.state.status === "loading") {
      content = this.renderLoading();
    } else if (this.state.status === "ready") {
      content = this.renderSkills();
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

export default Skills;
