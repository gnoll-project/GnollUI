import React, { Component } from 'react';
import * as COMPONENTS from '../../../constants/components';
import shouldPureComponentUpdate from 'react-pure-render/function';
import brace from 'brace';
import AceEditor from 'react-ace';


import 'brace/mode/python';
import 'brace/theme/monokai';

const getReactComponent = (node) => {
  return COMPONENTS.REACT_COMPONENT_MAP[node.component];
};

const getStyle = (node, isSelected) => {
  return {
    position: 'absolute',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 5,
    borderColor: isSelected ? 'blue' : 'black',
    backgroundColor: '#D8D8D8',
    left: node.position.x,
    top: node.position.y,
    zIndex: isSelected ? 1000 : 100
  }
};

const validateEdge = (from, to) => {
  const fromType = COMPONENTS.getNodeType(from.component);
  const toType = COMPONENTS.getNodeType(to.component);
  if(fromType === COMPONENTS.TRANSFORM_NODE) {
      return COMPONENTS.NODE_TYPES.indexOf(fromType) <= COMPONENTS.NODE_TYPES.indexOf(toType);
  }

  return COMPONENTS.NODE_TYPES.indexOf(fromType) < COMPONENTS.NODE_TYPES.indexOf(toType);
}

export default class Renderer extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleClick = this.handleClick.bind(this);
    this.handleEditorChanged = this.handleEditorChanged.bind(this);
    this.handleEditorSubmit = this.handleEditorSubmit.bind(this);
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

  handleOuterClick (e) {
    e.stopPropagation();
  }

  handleEditorClick (e) {
    e.stopPropagation();
  }

  handleEditorChanged (newValue) {
    this.props.updateCode(newValue);
  }

  handleEditorSubmit (e) {
    const code = this.props.node.code;
    console.log('sendng code');
    this.props.sendCodeToKernal(code);
  }

  renderEditor(isSelected) {
    if(!isSelected) {
      return null;
    }

    return (
      <AceEditor
        mode='python'
        theme='monokai'
        height={200 + 'px'}
        width={250 + 'px'}
        tabSize={2}
        commands={[
          {
            name: 'execute',
            bindKey: {
              mac: 'Shift-Enter'
            },
            exec: this.handleEditorSubmit
          }
        ]}
        onChange={this.handleEditorChanged}
        name={this.props.node.id.toString()}
        editorProps={{$blockScrolling: true}}
        value={this.props.node.code}
      />
    );
  }

  render() {
    const node = this.props.node;
    const C = getReactComponent(node);
    const isSelected = this.props.selectedNode && this.props.selectedNode.id === node.id;

    return (
      <div style={getStyle(node, isSelected)} onClick={this.handleOuterClick}>
        <div onClick={this.handleClick}>
          <C node={node} />
        </div>
        {this.renderEditor(isSelected)}
      </div>
    );
  }
}
