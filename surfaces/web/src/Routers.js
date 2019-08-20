import React, { Component, Suspense, lazy } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Loading from './Components/Loading';

const styles = {
  container: {
    height: "100%",
  }
};

const AsyncProfile = lazy(() => import("./Components/Profile"));
const AsyncSearch = lazy(() => import("./Components/Search"));
const AsyncHome = lazy(() => import("./Components/Home"));
const AsyncWorkspace = lazy(() => import("./Components/Workspace"));
const AsyncBusiness = lazy(() => import("./Components/Business"));
const AsyncEnterprise = lazy(() => import("./Components/Enterprise"));
const AsyncCareer = lazy(() => import("./Components/Career"));
const AsyncHowItWorks = lazy(() => import("./Components/HowItWorks"));
const AsyncSignupLogin = lazy(() => import("./Components/SignupLogin"));

// code splitting on a route level.
//    refer to https://reacttraining.com/react-router/web/guides/code-splitting for react-router instructions.
//    refer to https://facebook.github.io/create-react-app/docs/code-splitting for create-react-app instructions.
class Routers extends Component {
  render() {
    return(
      <div style={styles.container}>
        <Suspense fallback={Loading}>
          <Route exact path="/" component={AsyncHome}/>
          <Route path="/search" component={AsyncSearch}/>
          <Route path="/workspace" component={AsyncWorkspace}/>
          <Route path="/business" component={AsyncBusiness}/>
          <Route path="/profile/:uid" component={AsyncProfile}/>
          <Route path="/enterprise/:uid" component={AsyncEnterprise}/>
          <Route path="/career" component={AsyncCareer}/>
          <Route path="/howitworks" component={AsyncHowItWorks}/>
          <Route path="/sign/:type" component={AsyncSignupLogin}/>
        </Suspense>
      </div>
    );
  }
}

export default withRouter(Routers);
