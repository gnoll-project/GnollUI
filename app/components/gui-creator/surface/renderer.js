import React, { Component } from 'react';
import NodeContainer from '../../nodes/container';

const styles = {

  container: {
    height: '100vh',
    position: 'relative',
    borderLeft: 'solid 1px black'
  },

  edge: {
    stroke: 'black',
    strokeWidth: 2,
    fill: 'black'
  }
};

export default class Base extends Component {

  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleSurfaceClick = this.handleSurfaceClick.bind(this);
  }

  handleSurfaceClick (e) {
    if(!this.props.componentToAdd) {
      return;
    }

    console.log(e);
    const offset = this.refs.surface.getBoundingClientRect();
    console.log(offset);
    const position = {
      x: e.clientX - offset.left,
      y: e.clientY - offset.top,
    };

    console.log(position);
    console.log(this.props.componentToAdd);

    this.props.onClick(this.props.componentToAdd, position);
  }

  render () {
    const nodes = this.props.nodes;
    const edges = this.props.edges;

    const nodeMap = nodes.reduce((memo, node) => {
      memo[node.id] = node;
      return memo;
    }, {});

    return (
      <div ref='surface' onClick={this.handleSurfaceClick} style={styles.container}>
        <svg width="100%" height="100%">
          {Object.keys(edges).map((fromId) => {
            const fromNode = nodeMap[fromId];
            const toNode = nodeMap[edges[fromId]];

            return (
              <line
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
    );
  }
}
