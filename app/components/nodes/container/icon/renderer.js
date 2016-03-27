import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { VictoryAnimation } from "victory";
import * as COMPONENTS from '../../../../constants/components';

const validateEdge = (from, to) => {
  const fromType = COMPONENTS.getNodeType(from.component);
  const toType = COMPONENTS.getNodeType(to.component);
  if(fromType === COMPONENTS.TRANSFORM_NODE) {
      return COMPONENTS.NODE_TYPES.indexOf(fromType) <= COMPONENTS.NODE_TYPES.indexOf(toType);
  }

  return COMPONENTS.NODE_TYPES.indexOf(fromType) < COMPONENTS.NODE_TYPES.indexOf(toType);
}

const getStyles = (node, isSelected) => {
  const expandedCircleRadius = 20;
  const smallCircleRadius = 10;
  const circleRadius = isSelected ? smallCircleRadius : expandedCircleRadius;
  const outerPadding = 10;
  const svgSize = 2 * (expandedCircleRadius + outerPadding);

  return {
    svg: {
      position: 'relative',
      top: - svgSize / 2,
      left: - svgSize / 2,
      width: svgSize,
      height: svgSize
    },

    circle: {
      r: circleRadius,
      cx: svgSize / 2,
      cy: svgSize / 2,
      fill: isSelected ? 'blue' : 'white',
      stroke: isSelected ? 'blue' : 'orange',
      strokeWidth: 3,
      cursor: 'pointer'
    }
  };
};


export default class Renderer extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

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
    const isSelected = this.props.selectedNode && this.props.selectedNode.id === node.id;
    const styles = getStyles(node, isSelected);

    return (
      <svg style={styles.svg}>
        <VictoryAnimation data={styles.circle} duration={250}>
          {(style) => {
            return <circle style={style} onClick={this.handleClick} />
          }}
        </VictoryAnimation>
      </svg>
    );
  }
}
