import React from 'react';
import Surface from './surface';
import Sidebar from './sidebar';
import shelves from './shelves.css';
import styles from './style.css';

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
