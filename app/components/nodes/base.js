import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Base extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  static defaultProps = {
    node: {}
  }

  static propTypes = {
    node: React.PropTypes.object.isRequired
  }
}
