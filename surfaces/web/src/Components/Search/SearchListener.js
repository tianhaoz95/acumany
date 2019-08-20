import { Component } from 'react';
import { connectHits } from 'react-instantsearch/connectors';
import { connect } from 'react-redux';
import { updateHits, updateDisplay } from '../../Actions/Search';

class SearchListener extends Component {
  constructor(props) {
    super(props);
    console.log("initial hits => ", props);
    this.props.dispatch(updateHits(props.hits));
    this.props.dispatch(updateDisplay(props.hits));
  }

  componentWillReceiveProps(newProps) {
    console.log("receive new hits => ", newProps);
    this.props.dispatch(updateHits(newProps.hits));
    this.props.dispatch(updateDisplay(newProps.hits));
  }

  render() {
    return null;
  }
}

export default connect()(connectHits(SearchListener));
