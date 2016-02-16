import React, { Component } from 'react';
import { VictoryPie, VictoryLine, VictoryScatter } from "victory";

const width = 300;
const height = 300;

const getVictoryComponent = (component) => {
  switch(component.chartType) {
    case 'scatter':
      return VictoryScatter;
    case 'line':
      return VictoryLine;
    case 'pie':
      return VictoryPie;
    default:
      return VictoryPie;
  }
}

const getStyle = (component) => {
  return {
    position: 'absolute',
    border: 'solid 1px black',
    borderTop: 'solid 5px black',
    backgroundColor: 'khaki',
    left: component.position.x - width / 2,
    top: component.position.y - height / 2,
  }
};

export default class Renderer extends Component {

  state = {
    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
  }

  handleMouseDown(e) {
    console.log('mouse down');
    e.stopPropagation();
    this.setState({
      dragging: true,
      dragX: e.clientX,
      dragY: e.clientY
    });
  }

  handleMouseMove(e) {
    e.stopPropagation();
    const maxX = 50;
    const maxY = 50;
    const snapWidth = 10;
    const snapHeight = 10;

    if(this.state.dragging) {
      let dx = e.clientX - this.state.dragX;
      let dy = e.clientY - this.state.dragY;

      dx = dx > 0 ? Math.min(dx, maxX) : Math.max(dx, -maxX);
      dy = dy > 0 ? Math.min(dy, maxY) : Math.max(dy, -maxY);

      dx = dx - (dx % snapWidth);
      dy = dy - (dy % snapHeight);

      this.setState({
        dragX: e.clientX,
        dragY: e.clientY,
      });

      this.props.onMouseDrag({
        x: this.props.component.position.x + dx,
        y: this.props.component.position.y + dy
      });
    }
  }

  handleMouseUp(e) {
    console.log('mouse up');
    e.stopPropagation();
    this.setState({
      dragging: false
    });
  }

  handleClick(e) {
    e.stopPropagation();
    console.log('onclick');
  }

  render() {
    const C = getVictoryComponent(this.props.component);
    return (
      <div
        style={getStyle(this.props.component)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onClick={this.handleClick.bind(this)} >
          <C width={width} height={height} />
      </div>
    );
  }
}
