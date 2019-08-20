import React, { Component } from 'react';
import Email from './Email';
import Password from './Password';

class Settings extends Component {
  render() {
    return(
      <div className="settings-view">
        <Email/>
        <Password/>
      </div>
    );
  }
}

export default Settings;
