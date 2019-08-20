import React, { Component } from 'react';
import MyHeader from '../Header';
import { connect } from 'react-redux';
import { connectSearchBox } from 'react-instantsearch/connectors';
import Result from './Result';
import Filters from './Filters';
import './index.css';
import SearchListener from './SearchListener';
import LazyLoad from 'react-lazyload';

// style components here
import { Card, Layout, Row, Col } from 'antd';

const { Sider } = Layout;

const styles = {
  container: {
    height: window.innerHeight - 100,
  }
};

class Search extends Component {

  componentDidMount() {
    if (this.props.searchText === "") {
      return;
    }
    if (this.props.searchText !== this.props.currentRefinement) {
      console.log(this.props.searchText, this.props.currentRefinement, "search text is different, updating");
      this.props.refine(this.props.searchText);
    }
  }

  componentWillReceiveProps(newProps) {
    console.log("searchText updated => ", newProps);
    if (newProps.searchText === "") {
      return;
    }
    if (newProps.searchText !== newProps.currentRefinement) {
      console.log("search text is different, updating");
      newProps.refine(newProps.searchText);
    }
  }

  render() {
    return(
      <Layout className='search-page'>
        <MyHeader />
          <Layout className='search-content'>
          <div className='centralize'>
            <Sider>
              <Filters />
            </Sider>
            <SearchListener/>
            <Row className="search-result-container">
              <Col span="24" style={styles.container}>
                {this.props.display.map((hit, index) => (
                  <LazyLoad key={index} once overflow={true} placeholder={<Card className="search-result-loading" loading />}>
                    <Result hit={hit} />
                  </LazyLoad>
                ))}
              </Col>
            </Row>
          </div>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchText: state.search.searchText,
    display: state.search.display,
  }
}

export default connectSearchBox(connect(mapStateToProps)(Search));
