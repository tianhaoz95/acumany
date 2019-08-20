import React, { Component } from 'react';
import { connect } from 'react-redux';
import SkillCard from './SkillCard';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized';
import 'react-virtualized/styles.css';

const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 350,
  fixedWidth: true,
});

const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 2,
  columnWidth: 350,
  spacer: 10
});

const MasonryComponent = ({items, setref}) => {
  console.log(items);
  const cellRenderer = ({ index, key, parent, style}) => {
    const limit = items.length;
    return (
      limit >= index &&
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <SkillCard info={items[index]}/>
        </div>
      </CellMeasurer>
    )
  };

  return(
    <div>
      <Masonry
        className="masonry-overide-onfocus-style"
        cellCount={items.length + 1}
        cellMeasurerCache={cache}
        cellPositioner={cellPositioner}
        cellRenderer={cellRenderer}
        height={600}
        width={800}
        ref={setref}
      />
    </div>
  );
};


class Skills extends Component {
  
  constructor(props) {
    super(props);
    this.setMasonry = this.setMasonry.bind(this);
    this.masonryRef = null;
  }

  componentWillUnmount() {
    cache.clearAll();
    // this.masonryRef.clearCellPositions();
  }

  componentDidMount() {
    cellPositioner.reset({
      columnCount: 2,
      columnWidth: 350,
      spacer: 10
    });
    this.masonryRef.recomputeCellPositions();
  }

  setMasonry(node) {
    this.masonryRef = node;
  };

  render() {
    return(
      <MasonryComponent
        items={this.props.list}
        setref={this.setMasonry}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    list: state.skillList.list,
  }
}

export default connect(mapStateToProps)(Skills);
