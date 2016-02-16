import React from 'react';
import GUIComponent from '../gui-component';

var styles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};

export default ({
  guiComponents,
  onClick
}) => {
  return (
    <div onClick={onClick} style={styles}>
      {guiComponents.map(gc => {
        return <GUIComponent component={gc} key={gc.id} />
      })}
    </div>
  );
};
