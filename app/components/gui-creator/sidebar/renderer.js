import React from 'react';
import { COMPONENTS } from '../../../constants/components';
import NodeThumbnail from './node-thumbnail';

const styles = {
  fontFamily: 'Hack',
  color: 'rgb(254,254,254)'
};

export default () => {
  return (
    <div style={styles}>
      <h1>
        add a node +
      </h1>
      {
        Object.keys(COMPONENTS).map((componentType, i) => {
          return (
            <div key={i}>
              <h2>
                {componentType}
              </h2>
              {
                COMPONENTS[componentType].map((component, j) => {
                  return (
                    <NodeThumbnail key={j} component={component} />
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};
