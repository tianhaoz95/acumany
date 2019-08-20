import React, { Component } from 'react';
import { Row, Col, Tabs, Spin, message, Modal, Button } from 'antd';
import SimpleWebrtc from 'simplewebrtc/src/simplewebrtc';
import { SignalAPI } from '../../../Utilities/Params';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Whiteboard from './Whiteboard';
import Editor from './Editor';
import Chat from './Chat';
import './index.css';
import { connect } from 'react-redux';
import { updateSessionState } from "../../../Actions/Workspace";
import {push} from "react-router-redux";

const TabPane = Tabs.TabPane;
const tabs = ["Editor", "Whiteboard"];

const styles = {
  tabBarStyle: {
    marginBottom: 0,
  }
};

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionID: props.currentSessionID,
      loading: true, // remember to set this true
      sessionJoined: false,
      peerCreated: false,
      connected: false,
      timeLapse: 0,
      modalVisible: false,
      userInfo: {
        name: firebase.auth().currentUser.displayName,
        photo: firebase.auth().currentUser.photoURL,
        id: firebase.auth().currentUser.uid
      },
    };
    this.rtc = new SimpleWebrtc(
      {
        localVideoEl: 'localVideo',
        remoteVideosEl: '',
        autoRequestMedia: true,
        url: SignalAPI,
      }
    );
    console.log("constructing all the webrtc tools => ", this.rtc);
    this.timer = null;
    this.editorFB = firebase.database().ref("/SessionData/sessionID/Editor");
    this.msgFB = firebase.database().ref("/SessionData/sessionID/Message");
    this.whiteboardFB = firebase.database().ref("/SessionData/sessionID/Whiteboard");
    this.handleExit = this.handleExit.bind(this);
    this.handleExitOK = this.handleExitOK.bind(this);
    this.handleExitCancel = this.handleExitCancel.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleExitOK = this.handleExitOK.bind(this);
    this.handleExitCancel = this.handleExitCancel.bind(this);
  }
  
  componentDidMount() {
    console.log("adding all the listeners to => ", this.rtc);
    this.props.dispatch(updateSessionState(true));
    var thisObj = this;

    this.rtc.on('connectionReady', (sessionIdentifier) => {
      console.log("auto assigned session identifier => ", sessionIdentifier);
      this.setState({ connected: true });
      console.log("joining session with id ", thisObj.state.sessionID);
      message.success('Connnection Ready');
    });

    this.rtc.on('readyToCall', () => {
      message.info('Ready To Call');
      this.rtc.joinRoom(thisObj.state.sessionID, (err, room) => {
        if (err) {
          message.error('Error Detected, Try Refresh');
          console.log(err);
        } else {
          console.log(room);
          message.success('Entered Room');
          this.setState({
            sessionJoined: true,
            loading: false,
          });
        }
      });
    });

    this.rtc.on('iceFailed', function (peer) {
      var connstate = document.querySelector('#container_' + this.rtc.getDomId(peer) + ' .connectionstate');
      console.log('local fail', connstate);
      if (connstate) {
        message.error('Local Connection Failed');
      }
    });

    this.rtc.on('connectivityError', function (peer) {
      var connstate = document.querySelector('#container_' + this.rtc.getDomId(peer) + ' .connectionstate');
      console.log('remote fail', connstate);
      if (connstate) {
        message.error('Remote connection failed');
      }
    });

    this.rtc.on('videoAdded', function (video, peer) {
      message.info('Another Participant Joined');
      if (peer && peer.pc) {
        peer.pc.on('iceConnectionStateChange', function (event) {
          switch (peer.pc.iceConnectionState) {
          case 'checking':
            message.info('Connecting to peer...');
            break;
          case 'connected':
            message.info('Connected');
            break;
          case 'completed': // on caller side
            message.success('Connection established');
            break;
          case 'disconnected':
            message.info('Disconnected');
            break;
          case 'failed':
            message.error('Failed');
            break;
          case 'closed':
            message.info('Connection closed');
            break;
          default:
            message.info('Unknown event');
            break;
          }
        });
      }
      console.log('video added', peer);
      var remotes = document.getElementById('remotes');
      if (remotes) {
        var container = document.createElement('div');
        container.className = 'videoContainer';
        container.id = 'container_' + thisObj.rtc.getDomId(peer);
        container.appendChild(video);
        video.oncontextmenu = function () { return false; };
        remotes.appendChild(container);
      }
    });

    this.rtc.on('videoRemoved', function (video, peer) {
      message.info('Another Participant Left');
      console.log('video removed ', peer);
      var remotes = document.getElementById('remotes');
      var el = document.getElementById(peer ? 'container_' + thisObj.rtc.getDomId(peer) : 'localScreenContainer');
      if (remotes && el) {
        remotes.removeChild(el);
      }
      clearInterval(thisObj.timer);
    });

    this.rtc.on('createdPeer', (peer) => {
      console.log(peer);
      thisObj.setState({ peerCreated: true });
      thisObj.timer = setInterval(() => {
        var current = thisObj.state.timeLapse;
        thisObj.setState({ timeLapse: current + 1 });
      }, 60000);
    });

    this.rtc.on('stunservers', (args) => {
      console.log("using stun servers => ", args);
    });

    this.rtc.on('turnservers', (args) => {
      console.log("using turn servers => ", args);
    });
  }

  componentWillUnmount() {
    this.rtc.stopLocalVideo();
    this.rtc.leaveRoom();
    this.rtc.disconnect();
    this.props.dispatch(updateSessionState(false));
    clearInterval(this.timer);
  }

  handleTabChange(key) {
    console.log("key =>", key);
  }

  handleExit() {
    this.setState({
      modalVisible: true
    });
  };

  handleExitOK() {
    this.props.dispatch(push("/workspace/sessions"));
  };

  handleExitCancel() {
    this.setState({
      modalVisible: false
    });
  };

  renderTool(name) {
    switch (name) {
      case "Whiteboard": {
        return (
          <div className="workspace-session-tool-container">
            <Whiteboard
              rtc={this.rtc}
              fb={this.whiteboardFB}
              peerCreated={this.state.peerCreated}
              type="webrtc"/>
          </div>
        );
      }

      case "Editor": {
        return (
          <div className="workspace-session-tool-container">
            <Editor
              rtc={this.rtc}
              fb={this.editorFB}
              type="webrtc"
              />
          </div>
        );
      }

      default: console.log("fuck, a long way from home");
    }
  }

  render() {
    return(
      <div className="meeting-view">
        <Spin spinning={this.state.loading} tip="Connecting...(if cannot connect in 5 sec please refresh page)" >
          <Row className="meeting-container">
            <Modal
              title="Basic Modal"
              visible={this.state.modalVisible}
              onOk={this.handleExitOK}
              onCancel={this.handleExitCancel}
            >
              <p>Are you sure?</p>
            </Modal>
            <Col className="meeting-tools" span="20">
              <Tabs
                onChange={this.handleTabChange}
                type="card"
                className="workspace-session-tool-tabs" tabBarStyle={styles.tabBarStyle}>
                {tabs.map((tool, index) => (
                  <TabPane tab={tool} key={tool}>
                    {this.renderTool(tool)}
                  </TabPane>
                ))}
              </Tabs>
            </Col>
            <Col className="video-text-chat" span="4">
              <div className="session-video-container">
                <Row className="session-timer">
                  <Button
                    onClick={this.handleExit}
                  >Exit</Button>
                  <Col span="24">
                    Time lapse: {this.state.timeLapse} min
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <div id="remotes"></div>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <video
                      id="localVideo"
                      className="workspace-session-local-video"
                      />
                  </Col>
                </Row>
              </div>
              <Row className="text-chat">
                <Col className="text-chat-outer" span="24">
                  <Chat
                    rtc={this.rtc}
                    fb={this.msgFB}
                    type="webrtc"
                    userInfo={this.state.userInfo}
                    auth={this.props.auth}
                    />
                </Col>
              </Row>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSessionID: state.session.currentSessionID,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Session);
