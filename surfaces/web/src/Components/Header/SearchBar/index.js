import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Debounce } from 'react-throttle';
import { Icon, Input, AutoComplete, Button } from 'antd';
import fuzzysearch from 'fuzzysearch';
import { newSearch } from '../../../Actions/Search';

const Option = AutoComplete.Option;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  renderOption(item) {
    return (
      <Option key={item.title} text={item.title} className="global-search-item-container">
        <span className="global-search-item-label">{item.title}</span>
        <span className="global-search-item-count">has {item.count} experts</span>
      </Option>
    );
  }

  handleFilter(inputValue, option) {
    return fuzzysearch(inputValue.toLowerCase(), option.key.toLowerCase());
  }

  handleChange(value, label) {
    console.log(value);
    this.setState({ searchText: value });
  }

  handleSubmit() {
    this.props.dispatch(newSearch(this.state.searchText));
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  render() {

    // original:
    //    let registered = null;
    //    commented out to clean unused variable

    return(
      <Debounce time='200' handler='onChange'>
        <AutoComplete
          size="large"
          placeholder='What do you need help with?'
          dataSource={this.props.list.map(this.renderOption)}
          optionLabelProp="text"
          filterOption={this.handleFilter}
          onChange={this.handleChange}
          className="search-field">
          <Input
            onKeyDown={this.handleKeyDown}
            suffix={(
              <Button className="search-btn" size="large" type="primary" onClick={this.handleSubmit}>
                <Icon type="search" />
              </Button>
            )}
          />
        </AutoComplete>
      </Debounce>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.search.autocomplete,
    path: state.router.location.pathname,
  }
}

export default connect(mapStateToProps)(SearchBar);
