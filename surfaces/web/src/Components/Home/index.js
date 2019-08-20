// style components here
import { Col, Layout, Row, Tag, Tooltip } from 'antd';
import React, { Component } from 'react';
import MyFooter from '../Footer';
import MyHeader from '../Header';
import SearchBar from '../Header/SearchBar';
import { newSearch } from '../../Actions/Search';
import { connect } from 'react-redux';
import { refreshSkillAutocomplete } from "../Async/Search";
import { retrieveStatistics } from "../Async/Statistics";

const { Content } = Layout;

// display experts area may not be needed saving here for now
/*<Row className='display-experts' gutter={16}>
    <h2>Meet Some of Our Experts</h2>
    {this.state.popularAdvisors.map((advisor, index) => {
      //console.log(advisor);
      return (
        <Col span={8} key={index}>
          <Card title={advisor.basicInfo.name} bordered={false}>
            <img src={advisor.basicInfo.photo} style={{height:100,width:100}}/>
            <p>{advisor.basicInfo.introduction}</p>
          </Card>
        </Col>
      );
    })}
  </Row>);*/

class Home extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      labels: [],
      popularAdvisors: [],
      experts: 0,
      sessions: 0,
      topics: 0,
    };

    this.handleLabelClick = this.handleLabelClick.bind(this);
  }

  handleLabelClick(e) {
    e.preventDefault();
    this.props.dispatch(newSearch(e.target.innerText));
  }

  componentDidMount() {
    retrieveStatistics()
    .then((snap) => {
      this.setState(snap);
    });
    refreshSkillAutocomplete()
    .then((snap) => {
      this.setState({
        labels: snap.data,
      });
    });
  }

  render() {
    // use following above the search bar once we have enough users
    /*
    const counterFields = (
                <Row className="counters">
                    <Col><strong>{this.state.experts}</strong><p>Experts</p></Col>
                    <Col><strong>{this.state.topics}</strong><p>Topics</p></Col>
                    <Col><strong>{this.state.sessions}</strong><p>Sessions</p></Col>
                </Row>);*/
    return(
      <Layout className='homepage'>
        <MyHeader ishomepage='true' />
        <Content>
          <Row className="home-hero">
            <Col className='center-container'>
              <h1>Be your best self.</h1>
              <h5>Find the exact guidance you seek from top rated experts.</h5>
              <SearchBar />
              <Row className="expert-tags">
                {this.state.labels.map((label, index) => {
                    if (index > 12) return null;
                    let tag = label.title;
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag onClick={this.handleLabelClick} key={tag} color='#2db7f5'>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ?
                      <Tooltip 
                        onClick={this.handleLabelClick}
                        key={index}
                        title={tag}
                        >
                        {tagElem}
                      </Tooltip> :
                      tagElem;
                  })}
              </Row>
            </Col>
          </Row>
          <Row style={{ maxWidth: '1200px', margin: '0 auto' }} className='home-pitch' gutter={80}>
            <h2>Acumany: a reliable and empowering platform for you</h2>
            <Col className="gutter-row" span={8}>
              <h4>Get and Give Help Instantly</h4>
              <p>At Acumany we believe that humans grow by helping others grow.
              We are a large and diverse community of professors, business people, students,
              experts, hobbyists who believe in helping others and ourselves.</p>
            </Col>
            <Col className="gutter-row" span={8}>
              <h4>Earn and Learn Without Hassle</h4>
              <p>We promise our users are be able to easily offer and receive the knowledge
              or expertise they seek. All within the rules and rates they set by using secure
              payment.</p>
            </Col>
            <Col className="gutter-row" span={8}>
              <h4>All Within Your Own Terms</h4>
              <p>That's right, we will give you all tools and technology you need to success.
              You choose your rate (free if you wish!), schedule and terms. We only keep 8.5% of transactions.
              </p>
            </Col>
          </Row>
        </Content>
        <MyFooter />
      </Layout>
    );
  }
}

export default connect()(Home);
