import React, { Component } from 'react';
import { Rate, Card, Tag } from 'antd';
import moment from 'moment';
import { retrieveSkillName } from '../../Async/Skill';

class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: "loading..."
    };

    // we will have reviewer's name, avatar eventually
    // will also have anonymous review option, for now all reviews are anon
  }

  componentDidMount() {
    var thisObj = this;
    retrieveSkillName(this.props.info.objectID)
    .then(function (name) {
      thisObj.setState({ skill: name });
    });
  }

  render() {
    return(
      <Card>
        <Rate allowHalf disabled defaultValue={parseFloat(this.props.info.star)} />
        <p className="review-text">{this.props.info.review}</p>
        <time>Rated: <Tag key={this.state.skill} color='#e2687a'>{this.state.skill}</Tag>
        on {moment(this.props.info.timestamp).format("dddd, MMMM Do YYYY")}</time>

      </Card>
    );
  }
}

export default ReviewCard;
