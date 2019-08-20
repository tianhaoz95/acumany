import * as Tracking from "./Tracking";
import firebase from "firebase";

import { Component } from 'react';

import { InitCloudMsgToken } from "../Actions/Auth";
import { connect } from 'react-redux';
import { notification } from 'antd';
import { refreshMessageChain } from '../Actions/Contact';

class Monitor extends Component {
  componentDidMount() {
    var thisObj = this;
    const messaging = firebase.messaging();

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        Tracking.addPeople();
        messaging.requestPermission()
        .then(() => {
          messaging.getToken()
          .then((token) => {
            console.log("initial token => ", token);
            thisObj.props.dispatch(InitCloudMsgToken(token));
          });
        })
        .catch((err) => {
          console.log('Unable to get permission to notify.', err);
        });
      } else {
        console.log("not signed in");
      }
    });

    messaging.onTokenRefresh(() => {
      messaging.getToken()
      .then((token) => {
        console.log("refreshed token => ", token);
        thisObj.props.dispatch(InitCloudMsgToken(token));
      });
    });

    messaging.onMessage(function(payload) {
      console.log(payload);
      notification.open({
        message: payload.data.title,
        description: "From: " + payload.data.fromUser,
      });
      console.log("receive cloud message, updating message chain");
      thisObj.props.dispatch(refreshMessageChain());
    });
  }

  render() {
    return (null);
  }
}

export default connect()(Monitor);
