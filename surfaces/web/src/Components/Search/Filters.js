import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  resetList, 
  sortDisplayList, 
  applyRateRange, 
  applyStarRange, 
  disableDefaultSort, 
  disableRateRanger, 
  disableStarRanger, 
  clearAllFilter 
} from '../../Actions/Search';
import { Row, Col, Select, Slider, Button, Rate } from 'antd';

// original:
//    const { Header, Content, Footer, Sider } = Layout;
//    commented out to clean unused variables

const Option = Select.Option;

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rateRange: [0, 100],
      sortType: "default",
      starCnt: 3,
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeRateRange = this.handleChangeRateRange.bind(this);
    this.handleApplyRateRange = this.handleApplyRateRange.bind(this);
    this.handleClearFilters = this.handleClearFilters.bind(this);
    this.handleStarCntChange = this.handleStarCntChange.bind(this);
    this.handleApplyStarRange = this.handleApplyStarRange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // bug: every time to applay rateRange filter,
    // this function will be called, which reset
    // the rateRange even though you do not want to

    // 2/12/2018: delete these lines:
    //var maxRate = getMaxRate(newProps.display);
    //console.log("setting max rate limit to ", maxRate);
    //this.setState({ rateRange: [0, maxRate + 1] });
  }

  handleStarCntChange(val) {
    this.setState({ starCnt: val });
  }

  handleApplyStarRange() {
    this.props.dispatch(applyStarRange(this.state.starCnt));
    this.props.dispatch(disableDefaultSort());
    this.props.dispatch(disableStarRanger());
  }

  handleChangeRateRange(val) {
    this.setState({ rateRange: val });
  }

  handleApplyRateRange() {
    this.props.dispatch(applyRateRange(this.state.rateRange));
    this.props.dispatch(disableDefaultSort());
    this.props.dispatch(disableRateRanger());
  }

  handleClearFilters() {
    this.props.dispatch(clearAllFilter());
    this.setState({ sortType: "default" });
  }

  handleChangeSort(value) {
    this.setState({ sortType: value });
    switch (value) {
      case "default": {
        this.props.dispatch(resetList());
        break;
      }

      case "review_asc": {
        this.props.dispatch(sortDisplayList("review", "asc"));
        break;
      }

      case "review_desc": {
        this.props.dispatch(sortDisplayList("review", "desc"));
        break;
      }

      case "star_asc": {
        this.props.dispatch(sortDisplayList("star", "asc"));
        break;
      }

      case "star_desc": {
        this.props.dispatch(sortDisplayList("star", "desc"));
        break;
      }

      case "rate_desc": {
        this.props.dispatch(sortDisplayList("rate", "desc"));
        break;
      }

      case "rate_asc": {
        this.props.dispatch(sortDisplayList("rate", "asc"));
        break;
      }

      default: console.log("wrong value");
    }
  }

  render() {
    return(
      <div className='search-filter'>
        <Row className="filter-row sort-filter">
            <p>Sort By:</p>
            <Select defaultValue="default" style={{ width: 120 }} onChange={this.handleChangeSort} value={this.state.sortType}>
              <Option disabled={this.props.disableDefaultSort} value="default">Default</Option>
              <Option value="rate_desc">Rate Desc</Option>
              <Option value="rate_asc">Rate Asc</Option>
              <Option value="star_desc">Star Desc</Option>
              <Option value="star_asc">Star Asc</Option>
              <Option value="review_desc">Review Desc</Option>
              <Option value="review_asc">Review Asc</Option>
            </Select>
        </Row>
        <Row className="filter-row rate-filter">
          <span>${this.state.rateRange[0]}/hr to</span>
          <span>&nbsp;${this.state.rateRange[1]}/hr</span>
        </Row>
        <Row className="filter-row">
          <Col span="24">
            <Slider
              range
              value={this.state.rateRange}
              onChange={this.handleChangeRateRange}
              disabled={this.props.disableRateRanger}
              defaultValue={[0, 20]}/>
              <Button
                icon="filter"
                onClick={this.handleApplyRateRange}
                disabled={this.props.disableRateRanger}
                >
                Apply Rate Range
              </Button>
          </Col>
        </Row>
        <Row className="filter-row">
          <Col span="24">
            <Rate disabled={this.props.disableStarRanger}
              onChange={this.handleStarCntChange}
              value={this.state.starCnt} />
            <Button
              icon="filter"
              disabled={this.props.disableStarRanger}
              onClick={this.handleApplyStarRange}
              >
              Apply minimum star
            </Button>
          </Col>
        </Row>
        <Row className="filter-row">
          <Col span="24">
            <Button
              icon="delete"
              type="danger"
              disabled={this.props.disableClearFilter}
              onClick={this.handleClearFilters}
              >
              Clear all filters
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    display: state.search.display,
    disableRateRanger: state.search.disableRateRanger,
    disableDefaultSort: state.search.disableDefaultSort,
    disableClearFilter: state.search.disableClearFilter,
    disableStarRanger: state.search.disableStarRanger,
  }
}

export default connect(mapStateToProps)(Filters);
