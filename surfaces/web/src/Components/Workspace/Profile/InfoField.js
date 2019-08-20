import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Icon, Input, Button, AutoComplete} from 'antd';
import {updateUsername, updateIntroduction, updateTimezone} from '../../../Actions/Profile';
import _ from 'lodash';
import moment from 'moment-timezone';
import './introfield.css';

const { TextArea } = Input;

class InfoField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      userName: this.props.userInfo.displayName,
      userIntro: this.props.basicInfo.introduction,
      userTimeZone: this.props.basicInfo.timezone
    };
    this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
    this.handleOption = this.handleOption.bind(this);
    this.datasource = [];
    _.forEach(moment.tz.names(), (val) => {
      this.datasource.push(val.split('_').join(' '));
    });
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
    this.renderIntro = this.renderIntro.bind(this);
  }

  handleOpenEdit() {
    this.setState({edit: true});
  };

  handleCancelEdit() {
    this.setState({
      edit: false,
      userName: this.props.userInfo.displayName,
      userIntro: this.props.basicInfo.introduction,
      userTimeZone: this.props.basicInfo.timezone
    });
  };

  updateInput(evt, type) {
    const updateValue = evt.target.value;
    this.setState({[type]: updateValue});
  };

  handleConfirmEdit() {
    // TODO: update info to store
    this.props.dispatch(updateUsername(this.state.userName));
    this.props.dispatch(updateIntroduction(this.state.userIntro));
    this.props.dispatch(updateTimezone(this.state.userTimeZone));
    this.setState({edit: false});
  };

  handleAutocompleteChange(val, label) {
    console.log(val, label);
  }

  handleOption(inputValue, option) {
    return (option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1);
  }

  renderName() {
    if (!this.state.edit) {
      return (
        <Row>
          <Col>
            <p>
              {this.state.userName}
            </p>
          </Col>
        </Row>
      )
    } else {
      return (
        <Row className={"input-field"}>
          <Col span={5} className={"input-label"}>
            <label>Name</label>
          </Col>
          <Col span={19}>
            <Input
              value={this.state.userName}
              onChange={(evt) => { this.updateInput(evt, 'userName'); }}
            />
          </Col>
        </Row>
      );
    }
  }

  renderIntro() {
    if (!this.state.edit) {
      return (
        <Row>
          <Col>
            <p>
              {this.state.userIntro}
            </p>
          </Col>
        </Row>
      )
    } else {
      return (
        <Row className={"input-field"}>
          <Col span={5} className={"input-label"}>
            <label>Introduction</label>
          </Col>
          <Col span={19}>
            <TextArea
              value={this.state.userIntro}
              onChange={(evt) => { this.updateInput(evt, 'userIntro'); }}
            />
          </Col>
        </Row>
      );
    }
  };

  renderTimezone() {
    if (!this.state.edit) {
      return (
        <Row>
          <Col>
            <p>
              Timezone: {this.state.userTimeZone.split('_').join(' ')}
            </p>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row className={"input-field"} type="flex" justify={"center"} align={"center"}>
          <Col span={5} className={"input-label"}>
            <label>Time Zone</label>
          </Col>
          <Col span={19}>
            <AutoComplete
              className={"input-area"}
              dataSource={this.datasource}
              onChange={this.handleAutocompleteChange}
              value={this.state.userTimeZone.split('_').join(' ')}
              filterOption={this.handleOption}
              allowClear={true}
            />
          </Col>
        </Row>
      )
    }
  }

  renderEditTools() {
    if (!this.state.edit) {
      return (
        <Row>
          <Col>
            <Icon
              className="basic-information-icon"
              onClick={this.handleOpenEdit}
              type="edit"/>
          </Col>
        </Row>
      )
    } else {
      return (
        <Row justify="center" align="center">
          <Col span={12}>
            <Button
              type={"primary"}
              className="button"
              icon="check"
              onClick={() => this.handleConfirmEdit()}
            >
            </Button>
          </Col>
          <Col span={12}>
            <Button
              className="button"
              icon="close"
              onClick={this.handleCancelEdit}
            >
            </Button>
          </Col>
        </Row>
      )
    }
  }

  renderError() {
    // TODO: render error if update fail
  }

  render() {
    return (
      <div className={"advisor-profile-information-container"}>
        {this.renderName()}
        {this.renderIntro()}
        {this.renderTimezone()}
        {this.renderEditTools()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    basicInfo: state.auth.basicInfo,
    userInfo: state.auth.userInfo,
    basicInfoField: state.basicInfoField,
  }
}

export default connect(mapStateToProps)(InfoField);
