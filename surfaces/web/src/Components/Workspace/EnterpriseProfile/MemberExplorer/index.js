import { Icon, Input } from 'antd';
import React, { Component } from 'react';

import Result from './Result';
import fuse from 'fuse.js';

var options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 50,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    {
      name: "name",
      weight: 0.4
    },
    {
      name: "email",
      weight: 0.3,
    },
    {
      name: "introduction",
      weight: 0.1,
    },
    {
      name: "skill.skill",
      weight: 0.1,
    },
    {
      name: "skill.descritpion",
      weight: 0.1
    },
  ]
};

class MemberExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: props.list,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.myFuse = new fuse(props.list, options);
  }

  componentWillReceiveProps(nextProps) {
    this.myFuse = new fuse(nextProps.list, options);
    this.setState({ results: nextProps.list });
  }

  handleSearch(e) {
    console.log("event => ", e.target.value);
    if (e.target.value === "") {
      this.setState({ results: this.props.list });
    } else {
      var results = this.myFuse.search(e.target.value);
      console.log(results);
      this.setState({ results: results });
    }
  }

  render() {
    return(
      <div className="enterprise-member-explorer">
        <Input onChange={this.handleSearch} prefix={<Icon type="search"/>} placeholder="Search" />
        {this.state.results.map((result, index) => (
          <Result info={result} key={index}/>
        ))}
      </div>
    );
  }
}

export default MemberExplorer;
