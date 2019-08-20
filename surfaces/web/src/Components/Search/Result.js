import React, { Component } from 'react';
import { Highlight } from 'react-instantsearch/dom';
import { Tag, Avatar, Card, Rate, Button } from 'antd';
import { connect } from 'react-redux';
import SendFormModal from './SendFormModal';
import { openAdvisorProfile } from '../../Actions/Search';
import { isMyself } from '../Async/Preview';

const styles = {
  bodyStyle: {
    padding: 0,
  }
};

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleVisitAdvisor = this.handleVisitAdvisor.bind(this);
  }

  handleClose() {
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange(visible) {
    this.setState({ visible });
  }

  handleVisitAdvisor() {
    this.props.dispatch(openAdvisorProfile(this.props.hit.uid));
  }

  render() {
    var starCnt = parseFloat(this.props.hit.star) / this.props.hit.review;
    return(
      <Card className="search-result-card" bodyStyle={styles.bodyStyle}>
        <Avatar size="large" src={this.props.hit.photo} />
        <span className="expert-summary">
          <h5><a onClick={this.handleVisitAdvisor}>{this.props.hit.name}</a></h5>
          <span>Expertise: <Tag>{this.props.hit.skill}</Tag></span>
          <Highlight attributeName="description" hit={this.props.hit} />
        </span>
        <span className="expert-key-details">
          <h2>$ {this.props.hit.rate} / hr</h2>
          <span className="expert-reviews"><Rate allowHalf disabled value={starCnt} />
            ( {this.props.hit.review} )
          </span>
          <span className="expert-actions">
            {isMyself(this.props.hit.uid) ? (null) : (
              <SendFormModal icon="message" type="default" uid={this.props.hit.uid}/>
            )}
            <Button onClick={this.handleVisitAdvisor} icon="user"></Button>
          </span>
        </span>
      </Card>
    );
  }
}

export default connect()(Result);
