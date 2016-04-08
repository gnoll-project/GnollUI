import React, { Component } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import { ResizableBox } from 'react-resizable';

import styles from 'react-resizable/css/styles.css';

import 'brace/mode/python';
import 'brace/theme/monokai';



export default class Editor extends Component {

  state = {
    width: 250,
    height: 200
  }

  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize () {
    console.log('handle resize');
  }


  render () {
    const { onChange, onSubmit, node } = this.props;
    const { width, height } = this.state;
    return (
      <ResizableBox width={width} height={height}>
        <AceEditor
          mode='python'
          theme='monokai'
          height={'100%'}
          width={'100%'}
          tabSize={2}
          commands={[
            {
              name: 'execute',
              bindKey: {
                mac: 'Shift-Enter'
              },
              exec: onSubmit
            }
          ]}
          onChange={onChange}
          name={node.id.toString()}
          editorProps={{$blockScrolling: true}}
          value={node.code}
        />
      </ResizableBox>
    );
  };
};
