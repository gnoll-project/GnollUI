import React from 'react';

const styles = {
};

export default ({
  component,
  selectedComponent,
  onClick
}) => {

  const isSelected = component === selectedComponent;

  return (
    <div style={styles} onClick={onClick}>
      {isSelected ? '==>' : ''}
      {component}
    </div>
  );
};
