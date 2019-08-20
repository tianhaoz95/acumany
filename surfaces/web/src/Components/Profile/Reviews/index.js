import React, { Component } from 'react';
import { retrieveReviewList } from '../../Async/Review';
import ReviewCard from './ReviewCard';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      reviewList: [],
    };
  }

  componentDidMount() {
    var uid = this.props.uid;
    var thisObj = this;
    retrieveReviewList(uid)
    .then(function (reviewList) {
      thisObj.setState({
        reviewList: reviewList,
        status: "ready",
      });
    })
    .catch(function (err) {
      console.log("fuck", err);
      thisObj.setState({
        status: "error",
      });
    });
  }

  render() {
    return(
      <div className="profile-reviews">
        {this.state.reviewList.map((review, index) => (
          <ReviewCard info={review} key={index}/>
        ))}
      </div>
    );
  }
}

export default Reviews;
