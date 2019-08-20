import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import Routers from './Routers';
import history from './History';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <Routers />
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
