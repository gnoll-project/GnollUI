import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import CloseButton from './close-button';

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

export default class Renderer extends Component {
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
    const node = this.props.node;
    const isSelected = this.props.selectedNode && this.props.selectedNode.id === node.id;
    const styles = getStyles(node, isSelected);

    return (
      <div style={styles.topBar}>
        <CloseButton onClick={this.handleClose} style={styles.closeButton} />
      </div>
    );
  }
};
