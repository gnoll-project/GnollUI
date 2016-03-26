import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

const size = 10;

const styles = {
  circle: {
    cx: size / 2,
    cy: size / 2,
    r: size / 2,
    fill: 'red',
    stroke: 'none'
  }
};

export default class Renderer extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <svg width={size} height={size} {...this.props} onClick={this.props.onClick}>
        <circle style={styles.circle} />
      </svg>
    );
  }
};
