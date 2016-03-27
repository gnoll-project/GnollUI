import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { DraggableTypes } from '../../../../constants/drag';
import { DragSource } from 'react-dnd';

const nodeSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    return { id: props.node.id, position: props.node.position };
  },

  endDrag(props, monitor, component) {
    console.log('end drag!');
  }
};

/**
 * Specifies which props to inject into your component.
 */
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
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { node, isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        {this.props.children}
      </div>
    );
  }
};

export default DragSource(DraggableTypes.NODE, nodeSource, collect)(Renderer);
