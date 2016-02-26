import React from 'react';
import GUIComponent from '../gui-component';
import Surface from './surface';
import SidebarContent from './sidebar';
import Sidebar from 'react-sidebar';

var styles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};

export default () => {
  return (
    <Sidebar sidebar={SidebarContent}>
      <Surface />
    </Sidebar>
  );
};
