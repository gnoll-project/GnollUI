import React, { Component } from 'react';
import * as COMPONENTS from '../../../constants/components';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Editor from './editor';
import TopBar from './top-bar';
import Icon from './icon';
import { DragSource } from 'react-dnd';

const getReactComponent = (node) => {
  return COMPONENTS.REACT_COMPONENT_MAP[node.component];
};

const getStyles = (node, isSelected) => {
  return {
    outer: {
      position: 'absolute',
      // backgroundColor: '#D8D8D8',
      left: node.position.x,
      top: node.position.y,
      zIndex: isSelected ? 1000 : 100
    }
  };
};


export default class Renderer extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleClick = this.handleClick.bind(this);
    this.handleEditorChanged = this.handleEditorChanged.bind(this);
    this.handleEditorSubmit = this.handleEditorSubmit.bind(this);
  }

  handleOuterClick (e) {
    e.stopPropagation();
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

  handleEditorChanged (newValue) {
    this.props.updateCode(newValue);
  }

  handleEditorSubmit (e) {
    const code = this.props.node.code;
    this.props.sendCodeToKernal(code);
  }

  renderEditor(isSelected) {
    return (
      <Editor
        onSubmit={this.handleEditorSubmit}
        onChange={this.handleEditorChanged}
        node={this.props.node} />
    );
  }

  render() {
    const node = this.props.node;
    const C = getReactComponent(node);
    const isSelected = this.props.selectedNode && this.props.selectedNode.id === node.id;
    const styles = getStyles(node, isSelected);

    return (
      <div
        style={styles.outer}
        onClick={this.handleOuterClick}>

        <Icon node={node} />
        {isSelected ? this.renderEditor() : null}

          {/*<TopBar node={node} />
          <div onClick={this.handleClick}>
            <C node={node} />
          </div>
          {isSelected ? this.renderEditor() : null}
          */}
      </div>
    );
  }
}
