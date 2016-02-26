import React, { Component } from 'react';
import BaseNode from '../../base';
import { VictoryLine } from "victory";

export default class Renderer extends BaseNode {
  render() {
    const node = this.props.node;
    return (
      <VictoryLine data={node.data} width={node.width} height={node.height} />
    );
  }
}
