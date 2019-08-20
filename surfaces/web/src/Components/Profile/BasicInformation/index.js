// style components here
import { Avatar, Button, Icon, Modal, Rate, Tag, Tooltip } from 'antd';
import React, { Component } from 'react';
import { isMyself, retrieveSkills } from '../../Async/Preview';

import Schedule from '../Schedule';
import SendFormModal from '../../Search/SendFormModal';
import { retrieveBasicInformation } from '../../Async/Preview';
import { retrieveOverallReview } from '../../Async/Review';

class BasicInformation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      basicInfo: null,
      tags: [],
      star: 0,
      review: 0,
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    var thisObj = this;
    retrieveOverallReview(this.props.uid)
    .then(function (review) {
      thisObj.setState({
        star: parseFloat(review.starCnt),
        review: Number(review.reviewCnt)
      });
    })

    retrieveBasicInformation(this.props.uid)
    .then((basicInfo) => {
      this.setState({
        basicInfo: basicInfo,
        status: "ready"
      });
    })
    .catch((err) => {
      this.setState({
        status: "error"
      });
    });

    retrieveSkills(this.props.uid)
    .then((skills) => {
      this.setState({
        status: "ready",
        tags: skills,
      });
    })
    .catch((err) => {
      console.log("fuck", err);
      this.setState({
        status: "error",
      });
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
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

  renderInformation() {

    return(
      <div className="basic-info">
        <Avatar type="square" size="large" src={this.state.basicInfo.photo} />
        <span className="user-summary">
          <h3>{this.state.basicInfo.name} <small><Icon type='global' />{this.state.basicInfo.timezone}</small></h3>
          <p>Introduction: {this.state.basicInfo.introduction}</p>
          <div><Rate allowHalf disabled value={this.state.star} /> ({this.state.review} Reviews)</div>

          <div>
            {this.state.tags.map((tag, index) => {
              const isLongTag = tag.skill.length > 20;
              const tagElem = (
                <Tag key={index} color='#e2687a'>
                  {isLongTag ? `${tag.skill.slice(0, 20)}...` : tag.skill}
                </Tag>
              );
              return isLongTag ? <Tooltip key={index} title={tag.skill}>{tagElem}</Tooltip> : tagElem;
            })}
          </div>

        </span>
        {isMyself(this.props.uid) ? (null) : (
          <span className="profile-actions">
            <SendFormModal type="primary" icon="message" uid={this.props.uid} text=" Message"/>
            <Button type="primary" onClick={this.showModal}><Icon type="calendar"/> Schedule</Button>
          </span>
        )}
        <Modal
          title="Make Appointments"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Schedule uid={this.props.uid}/>
        </Modal>
      </div>
    );
  }

  render() {
    let content = null;

    if (this.state.status === "loading") {
      content = this.renderLoading();
    } else if (this.state.status === "ready") {
      content = this.renderInformation();
    } else if (this.state.status === "error") {
      content = this.renderError();
    } else {
      console.log("fuck, you are a long way from home");
    }

    return(
      <div className="profile-hero">
        {content}
      </div>
    );
  }
}

export default BasicInformation;
