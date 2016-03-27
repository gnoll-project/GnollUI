import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { VictoryAnimation } from "victory";
import * as COMPONENTS from '../../../../constants/components';
import Draggable from '../draggable';
import Path from 'svg-path-generator';

const circleRadius = 30;
const outerPadding = 10;
const svgSize = 2 * (circleRadius + outerPadding);

const validateEdge = (from, to) => {
  const fromType = COMPONENTS.getNodeType(from.component);
  const toType = COMPONENTS.getNodeType(to.component);
  if(fromType === COMPONENTS.TRANSFORM_NODE) {
      return COMPONENTS.NODE_TYPES.indexOf(fromType) <= COMPONENTS.NODE_TYPES.indexOf(toType);
  }

  return COMPONENTS.NODE_TYPES.indexOf(fromType) < COMPONENTS.NODE_TYPES.indexOf(toType);
}

const getStyles = (node, isSelected) => {
  function color () {
    switch (node.nodeType) {
      case 'DATA_NODE':
        return 'rgb(254,224,69)'
      case 'TRANSFORM_NODE':
        return 'rgb(207,117,40)'
      default:
        return 'rgb(228,30,37)'
    }
  }

  return {
    svg: {
      position: 'relative',
      top: - svgSize / 2,
      left: - svgSize / 2,
      width: svgSize,
      height: svgSize,
      cursor: 'pointer'
    },
    circle: {
      r: circleRadius,
      cx: svgSize / 2,
      cy: svgSize / 2,
      strokeWidth: isSelected ? 5 : 3,
      fill: isSelected ? 'blue' : 'rgb(29,31,31)',
      stroke: isSelected ? 'blue' : color()
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

  _getArcPositionAtAngle(angle) {
    return {
      x: svgSize / 2 + circleRadius * Math.cos(angle),
      y: svgSize / 2 + circleRadius * Math.sin(angle)
    }
  }

  _generateButtonPath(start, end) {
    return new Path()
                .moveTo(start.x, start.y)
                .ellipticalArc(circleRadius, circleRadius, 0, 0, 1, end.x, end.y)
                .close();
  }

  getLeftButtonPath() {
    const start = this._getArcPositionAtAngle(Math.PI / 2);
    const end = this._getArcPositionAtAngle(Math.PI * 3 / 2);
    return this._generateButtonPath(start, end);
  }

  getRightButtonPath() {
    const start = this._getArcPositionAtAngle(Math.PI * 3 / 2);
    const end = this._getArcPositionAtAngle(Math.PI / 2);
    return this._generateButtonPath(start, end);
  }

  renderSelected(styles) {
    return (
      <g>
        <path d={this.getLeftButtonPath()} style={{fill: 'yellow'}} />
        <path d={this.getRightButtonPath()} style={{fill: 'orange'}} />
      </g>
    );
  }

  render() {
    const node = this.props.node;
    const isSelected = this.props.selectedNode && this.props.selectedNode.id === node.id;
    const styles = getStyles(node, isSelected);

    return (
      <Draggable node={node}>
        <svg style={styles.svg} onClick={this.handleClick}>
          <circle style={styles.circle} />
          {isSelected ? this.renderSelected() : null}
        </svg>
      </Draggable>
    );
  }
}
