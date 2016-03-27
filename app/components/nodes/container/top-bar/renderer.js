import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import CloseButton from './close-button';
import { DraggableTypes } from '../../../../constants/drag';
import { DragSource } from 'react-dnd';

const getStyles = (node, isSelected) => {
  return {
    topBar: {
      position: 'relative',
      height: 20,
      width: '100%',
      backgroundColor: isSelected ? 'blue' : 'black'
    },

    closeButton: {
      position: 'absolute',
      top: 5,
      right: 5
    }
  };
};


const nodeSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    console.log('begin drag!');
    console.log({ id: props.node.id });
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

  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e) {
    e.stopPropagation();
    this.props.removeNode();
  }

  render() {
    const { node, isDragging, connectDragSource } = this.props;
    const isSelected = this.props.selectedNode && this.props.selectedNode.id === node.id;
    const styles = getStyles(node, isSelected);

    return connectDragSource(
      <div style={styles.topBar}>
        <CloseButton onClick={this.handleClose} style={styles.closeButton} />
      </div>
    );
  }
};

export default DragSource(DraggableTypes.NODE, nodeSource, collect)(Renderer);
