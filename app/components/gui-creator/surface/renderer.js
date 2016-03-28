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

let left

const surfaceTarget = {
  drop(props, monitor) {
    const type = monitor.getItemType();
    const item = monitor.getItem();
    const difference = monitor.getDifferenceFromInitialOffset();
    const offset = monitor.getClientOffset();

    switch (type) {
      case DraggableTypes.NODE:
        props.updateNode(item.id, {
          position: {
            x: item.position.x + difference.x,
            y: item.position.y + difference.y
          }
        });
        break
      case DraggableTypes.INSERT:
        props.addNode({
          component: item.component,
          nodeType: getNodeType(item.component),
          position: {
            x: offset.x - left,
            y: offset.y
          }
        });
        break
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Renderer extends Component {

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
          ref={(surface) => {
            if (surface) left = surface.getBoundingClientRect().left
          }}
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


export default DropTarget([DraggableTypes.NODE, DraggableTypes.INSERT], surfaceTarget, collect)(Renderer);
