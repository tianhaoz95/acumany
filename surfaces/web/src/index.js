import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './Reducers';
import Lang from './Utilities/Lang';
import {LocaleProvider} from 'antd';
import firebase from "firebase/app";
import storejs from 'store';
import {refreshAutocompleteList} from "./Actions/Search";
import Monitor from './Utilities/Monitor';
import {InstantSearch} from 'react-instantsearch/dom';
import {AlgoliaSearchKey, AlgoliaAppID, AlgoliaSkilIndexID} from './Utilities/Params';
import './index.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {persistor} from './Reducers';

// import stylesheet
import './Styles/Master/styles.css';

// React 16 and above does not allow this anymore
// var injectTapEventPlugin = require("react-tap-event-plugin");
// injectTapEventPlugin();

function renderApp() {
  try {
    var rootElt = document.getElementById('root');

    ReactDOM.render(
      <LocaleProvider locale={Lang}>
        <Provider store={store}>
          <InstantSearch
            appId={AlgoliaAppID}
            apiKey={AlgoliaSearchKey}
            indexName={AlgoliaSkilIndexID}
          >
            <App/>
            <Monitor/>
          </InstantSearch>
        </Provider>
      </LocaleProvider>
      , rootElt);

    registerServiceWorker();
  } catch (err) {
    console.log(err);
    persistor.purge().then(() => {
      console.log("purged");
      window.location.reload();
    });
  }
}

// establish connection with firebase
var local_config = {
  apiKey: "AIzaSyA3jq3cYCgnSTrzGzfelTKuW14-TUl0fYo",
  authDomain: "acumany-local.firebaseapp.com",
  databaseURL: "https://acumany-local.firebaseio.com",
  projectId: "acumany-local",
  storageBucket: "",
  messagingSenderId: "1072887762823"
};

var development_config = {
  apiKey: "AIzaSyBZJ4i1yeQbW8WvWlHq-_0KOOINecgj_EU",
  authDomain: "acumany-dev.firebaseapp.com",
  databaseURL: "https://acumany-dev.firebaseio.com",
  projectId: "acumany-dev",
  storageBucket: "acumany-dev.appspot.com",
  messagingSenderId: "937144055268"
};

var deployment_config = {
  apiKey: "AIzaSyAa85ZQ81YFu_kG9BSeA6h3PocAi1YCLts",
  authDomain: "acumany-cb855.firebaseapp.com",
  databaseURL: "https://acumany-cb855.firebaseio.com",
  projectId: "acumany-cb855",
  storageBucket: "acumany-cb855.appspot.com",
  messagingSenderId: "985647058059"
};

var use_config = local_config;

if (process.env.REACT_APP_BUILD_TYPE === "local") {
  use_config = local_config;
}

if (process.env.REACT_APP_BUILD_TYPE === "deployment") {
  use_config = deployment_config;
}

if (process.env.REACT_APP_BUILD_TYPE === "development") {
  use_config = development_config;
}

firebase.initializeApp(use_config);

// automatically refresh skill set every 30 seconds
store.dispatch(refreshAutocompleteList());
window.setInterval(() => {
  console.log("refreshing autocomplete list");
  store.dispatch(refreshAutocompleteList());
}, 30000);

// cross-browser stoarage across web
// fetch authentication from localStorage
var cookie = storejs.get('auth');
if (cookie !== undefined && cookie.remember) {
  var email = cookie.email;
  var password = cookie.password;
  store.dispatch({
    type: "RESUME_LOGIN",
    payload: firebase.auth().signInWithEmailAndPassword(email, password),
  })
    .then(() => {
      console.log("successfully resume login");
      store.dispatch({
        type: "UPDATE_USER_INFO",
        payload: {userInfo: firebase.auth().currentUser},
      });
      renderApp();
    })
    .catch((err) => {
      console.log("fuck, cannot resume login => ", err);
      store.dispatch({
        type: "UPDATE_AUTH",
        payload: {auth: false}
      });
      renderApp();
    });
} else {
  console.log("no resume login available");
  store.dispatch({
    type: "UPDATE_AUTH",
    payload: {auth: false}
  });
  renderApp();
}
