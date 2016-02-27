import React, { Component } from 'react';
import * as COMPONENTS from '../../../constants/components';

const getReactComponent = (node) => {
  return COMPONENTS.REACT_COMPONENT_MAP[node.component];
};

const getStyle = (node, isSelected) => {
  return {
    position: 'absolute',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 5,
    borderColor: isSelected ? 'blue' : 'black',
    backgroundColor: '#D8D8D8',
    left: node.position.x,
    top: node.position.y
  }
};

const validateEdge = (from, to) => {
  const fromType = COMPONENTS.getNodeType(from.component);
  const toType = COMPONENTS.getNodeType(to.component);
  if(fromType === COMPONENTS.TRANSFORM_NODE) {
      return COMPONENTS.NODE_TYPES.indexOf(fromType) <= COMPONENTS.NODE_TYPES.indexOf(toType);
  }

  return COMPONENTS.NODE_TYPES.indexOf(fromType) < COMPONENTS.NODE_TYPES.indexOf(toType);
}

export default class Renderer extends Component {

  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.stopPropagation();

    const node = this.props.node;
    const selectedNode = this.props.selectedNode;

    if(!this.props.selectedNode) {
      return this.props.selectNode(node)
    }

    const isSelected = selectedNode.id === node.id;

    if(isSelected) {
      this.props.unselectNode();
    } else {
      if(validateEdge(selectedNode, node)) {
        this.props.toggleEdge(selectedNode, node);
      }
      this.props.unselectNode();
    }
  }

  render() {
    const node = this.props.node;
    const C = getReactComponent(node);
    const isSelected = this.props.selectedNode && this.props.selectedNode.id === node.id;

    return (
      <div style={getStyle(node, isSelected)} onClick={this.handleClick} >
        <C node={node} />
      </div>
    );
  }
}
