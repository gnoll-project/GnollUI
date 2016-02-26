import React from 'react';
import Surface from './surface';
import Sidebar from './sidebar';
import styles from './shelves.css';

export default () => {
  return (
    <div className="row">
      <div className="column-3">
        <Sidebar />
      </div>
      <div className="column-9">
        <Surface />
      </div>
    </div>
  );
};
