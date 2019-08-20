import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import { uploadAction, sendInitReq } from './helper';
import _ from 'lodash';
import moment from 'moment';
import './index.css';

const FormItem = Form.Item;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      disabled: true,
    };
    this.timestamp = 0;
    this.chatboxRef = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMessageClass = this.setMessageClass.bind(this);
    this.showMessageOwner = this.showMessageOwner.bind(this);
  }

  setMessageClass(message) {
    // TODO: each message should have a senderID, following is a temp hack
    if (message.photo === this.props.userInfo.photo) {
      return 'self-message';
    }
    return 'regular-message';
  }

  showMessageOwner(curr, i, arr) {
    if (arr.length === i + 1 || arr[i + 1].name !== curr.name)
      return true;
  }

  componentDidUpdate(prevProps, prevState) {
    this.chatboxRef.scrollTop = this.chatboxRef.scrollHeight;
  }

  componentDidMount() {
    var thisObj = this;

    if (this.props.type === "webrtc") {
      sendInitReq(this.props.rtc)
      .then((snap) => {
        this.setState({
          disabled: false,
          messages: snap.data.payload.messages,
        });
      })
      .catch((err) => {
        this.setState({
          disabled: false,
        });
      });
    } else {
      this.setState({
        disabled: false,
      });
    }

    this.props.rtc.on('channelMessage', (room, label, message) => {
      if (label === "textchat" && message.type === "initReq") {
        this.props.rtc.sendDirectlyToAll("textchat", "initRes", { messages: this.state.messages });
      }
      if (label === "textchat" && message.type === "message") {
        var oldList = this.state.messages;
        oldList.push(message.payload.message);
        var newList = _.orderBy(oldList, ['timestamp'], ['asc']);
        this.timestamp = message.payload.timestamp;
        console.log("updating state in webrtc");
        this.setState({ messages: newList });
      }
    });

    this.props.fb.on("child_added", (snap) => {
      var data = snap.val();
      if (thisObj.timestamp !== data.timestamp) {
        var oldList = thisObj.state.messages;
        oldList.push(data.message);
        var newList = _.orderBy(oldList, ['timestamp'], ['asc']);
        this.timestamp = data.timestamp;
        console.log("updating state in firebase");
        this.setState({ messages: newList });
      }
    });
  }

  handleSubmit(e) {
    var thisObj = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var timestamp = moment().valueOf();
        this.timestamp = timestamp;
        var message = {
          name: this.props.userInfo.name,
          photo: this.props.userInfo.photo,
          content: values.message,
          timestamp: timestamp,
        };
        uploadAction(message, this.props.fb, this.props.rtc, this.props.type, timestamp);
        var list = thisObj.state.messages;
        list.push(message);
        thisObj.setState({ messages: list });
        this.props.form.setFieldsValue({ message: "" });
      }
    });
  }

  render() {

    // original:
    //    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    //    commented out to clean our unused variable and improve compile time
    const { getFieldDecorator } = this.props.form;

    return(
      <div className="text-chat-inner">
        <div className="chat-box-container" ref={(ref) => this.chatboxRef = ref}>
          {this.state.messages.map((message, index, arr) => (
            <span className="chat-box-message " key={index}>
              <p className={this.setMessageClass(message)}>{message.content}</p>
              { this.showMessageOwner(message, index, arr) &&
                <p className="message-stamp">{message.name} {moment(message.timestamp).format("h:mm a")}</p>
              }
            </span>
          ))}
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('message', {
              rules: [{ required: true , message: 'Message cannot be empty'}],
            })(
              <Input
                disabled={this.state.disabled}
                placeholder="Type your message"
                autoComplete="off"
                suffix={
                  <Button
                    htmlType="submit"
                    icon="message"
                    disabled={this.state.disabled}
                    ></Button>}
                    />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Chat);
