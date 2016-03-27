import React from 'react';
import {getNodeType} from '../../../../constants/components'

const getStyles = (component, isSelected) => {
  const circleRadius = 20;
  const outerPadding = 10;
  const svgSize = 2 * (circleRadius + outerPadding);

  function color () {
    switch (getNodeType(component)) {
      case 'DATA_NODE':
        return 'rgb(254,224,69)'
      case 'TRANSFORM_NODE':
        return 'rgb(207,117,40)'
      default:
        return 'rgb(228,30,37)'
    }
  }

  return {
    wrapper: {
      display: 'inline-block'
    },
    svg: {
      position: 'relative',
      top: - svgSize / 2,
      left: - svgSize / 2,
      width: svgSize,
      height: svgSize,
      marginLeft: svgSize/2,
      marginTop: svgSize/4
    },

    circle: {
      r: circleRadius,
      cx: svgSize / 2,
      cy: svgSize / 2,
      fill: isSelected ? color() : 'rgb(29,31,31)',
      stroke: isSelected ? color() : color(),
      strokeWidth: 5,
      cursor: 'pointer'
    }
  };
};

export default ({
  component,
  selectedComponent,
  onClick
}) => {

  const isSelected = component === selectedComponent;
  const styles = getStyles(component, isSelected);

  return (
    <div style={styles.wrapper} onClick={onClick}>
      <svg style={styles.svg}>
        <circle style={styles.circle}/>
      </svg>
    </div>
  );
};
