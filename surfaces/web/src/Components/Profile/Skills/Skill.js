import React, { Component } from 'react';

class Skill extends Component {
  render() {
    return(
      <div className="single-skill">
        <h3>{this.props.info.skill}</h3>
        {this.props.info.description}
      </div>
    );
  }
}

export default Skill;
