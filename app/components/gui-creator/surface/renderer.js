import React, { Component } from 'react';
import NodeContainer from '../../nodes/container';
import { getNodeType } from '../../../constants/components';
import { DraggableTypes } from '../../../constants/drag';
import { DropTarget } from 'react-dnd';

const styles = {
  container: {
    height: '100vh',
    position: 'relative',
    borderLeft: 'solid 2px rgb(113,115,117)'
  },
  edge: {
    stroke: 'rgb(186,188,190)',
    strokeWidth: 3,
    fill: 'black'
  }
};

const surfaceTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    const difference = monitor.getDifferenceFromInitialOffset();
    props.updateNode(item.id, {
      position: {
        x: item.position.x + difference.x,
        y: item.position.y + difference.y
      }
    });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Renderer extends Component {

  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleSurfaceClick = this.handleSurfaceClick.bind(this);
  }

  handleSurfaceClick (e) {
    if(!this.props.componentToAdd) {
      return;
    }

    const offset = this.refs.surface.getBoundingClientRect();
    const position = {
      x: e.clientX - offset.left,
      y: e.clientY - offset.top,
    };

    this.props.onClick({
      component: this.props.componentToAdd,
      nodeType: getNodeType(this.props.componentToAdd),
      position: position
    });
  }

  render () {
    const { nodes, edges, connectDropTarget } = this.props;

    const nodeMap = nodes.reduce((memo, node) => {
      memo[node.id] = node;
      return memo;
    }, {});

    return connectDropTarget(
      <div
        style={styles.container}>
        <div
          ref='surface'
          onClick={this.handleSurfaceClick}
          style={{width: '100%', height: '100%'}} >
          <svg width='100%' height='100%'>
            {Object.keys(edges).map((fromId, i) => {
              const fromNode = nodeMap[fromId];
              const toNode = nodeMap[edges[fromId]];

              return (
                <line
                  key={i}
                  x1={fromNode.position.x}
                  y1={fromNode.position.y}
                  x2={toNode.position.x}
                  y2={toNode.position.y}
                  style={styles.edge} />
              )
            })}
          </svg>
          {nodes.map((node) => {
            return (
              <NodeContainer key={node.id} node={node} />
            );
          })}
        </div>
      </div>
    );
  }
}


export default DropTarget(DraggableTypes.NODE, surfaceTarget, collect)(Renderer);
