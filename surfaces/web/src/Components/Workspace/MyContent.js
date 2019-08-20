import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import BasicProfile from './BasicProfile';
import Contacts from './Contacts';
import Settings from './Settings';
import AdvisorProfile from './AdvisorProfile';
import BasicPayment from './BasicPayment';
import AdvisorPayment from './AdvisorPayment';
import Sessions from './Sessions';
import Session from './Session';
import EnterpriseProfile from './EnterpriseProfile';

const styles = {
  container: {
    height: "100%",
  }
};

class MyContent extends Component {
  render() {
    return(
      <div style={styles.container}>
        <Route path="/workspace/basicprofile" component={BasicProfile}/>
        <Route path="/workspace/advisorprofile" component={AdvisorProfile}/>
        <Route path="/workspace/enterpriseprofile" component={EnterpriseProfile}/>
        <Route path="/workspace/basicpayment" component={BasicPayment}/>
        <Route path="/workspace/advisorpayment" component={AdvisorPayment}/>
        <Route path="/workspace/contacts" component={Contacts}/>
        <Route path="/workspace/settings" component={Settings}/>
        <Route path="/workspace/sessions" component={Sessions}/>
        <Route path="/workspace/session" component={Session}/>
      </div>
    );
  }
}

export default withRouter(MyContent);
