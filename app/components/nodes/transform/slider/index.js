import React, { Component } from 'react';
import BaseNode from '../../base';
import { VictoryLine } from "victory";
import _ from 'lodash';
import net from 'net';

export default class Renderer extends BaseNode {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendUpdate = _.throttle(this.sendUpdate, 50).bind(this);
  }

  sendUpdate (msg) {
    const client = new net.Socket();
    client.on('error', (e) => {
      console.log(e)
    });
    client.connect(7998, '127.0.0.1', () => {
      client.write(JSON.stringify(msg));
    });

  }

  handleChange (e) {
    e.stopPropagation();
    const val = e.target.value;

    this.sendUpdate({
      type: 'UPDATE_NODE',
      id: this.props.node.id,
      properties: {
        transformAttributes: {
          x: parseFloat(val),
          min: 0,
          max: 100
        }
      }
    });
  }
  handleClick (e) {
    e.stopPropagation();
  }

  render () {
    return (
      <input type='range' onClick={this.handleClick} onChange={this.handleChange} />
    );
  }
}
