import React, {Component} from 'react';
import {getNodeType} from '../../../../constants/components'
import { DraggableTypes } from '../../../../constants/drag';
import { DragSource } from 'react-dnd';

const getStyles = (component) => {
  const circleRadius = 20;
  const outerPadding = 10;
  const svgSize = 2 * (circleRadius + outerPadding);

  function color () {
    switch (getNodeType(component)) {
      case 'DATA_NODE':
        return 'rgb(254,224,69)'
      case 'TRANSFORM_NODE':
        return 'rgb(207,117,40)'
      default:
        return 'rgb(228,30,37)'
    }
  }

  return {
    wrapper: {
      display: 'inline-block'
    },
    svg: {
      position: 'relative',
      top: - svgSize / 2,
      left: - svgSize / 2,
      width: svgSize,
      height: svgSize,
      marginLeft: svgSize/2,
      marginTop: svgSize/4
    },

    circle: {
      r: circleRadius,
      cx: svgSize / 2,
      cy: svgSize / 2,
      fill: 'rgb(29,31,31)',
      stroke: color(),
      strokeWidth: 5,
      cursor: 'pointer'
    }
  };
};

const insertSource = {
  beginDrag(props) {
    return { component: props.component };
  }
};

const collect = (connect, monitor) => {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class Renderer extends Component {

  render () {
    const {component, selectedComponent, onClick, connectDragSource} = this.props 

    const styles = getStyles(component);

    return connectDragSource(
      <div style={styles.wrapper} onClick={onClick}>
        <svg style={styles.svg}>
          <circle style={styles.circle}/>
        </svg>
      </div>
    );
  }
};

export default DragSource(DraggableTypes.INSERT, insertSource, collect)(Renderer);