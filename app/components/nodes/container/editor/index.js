import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/python';
import 'brace/theme/monokai';


export default ({
  onChange,
  onSubmit,
  node
}) => {
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
          exec: onSubmit
        }
      ]}
      onChange={onChange}
      name={node.id.toString()}
      editorProps={{$blockScrolling: true}}
      value={node.code}
    />
  );
};
