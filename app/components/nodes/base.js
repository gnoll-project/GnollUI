import React, { Component } from 'react';

export default class Base extends Component {
  static defaultProps = {
    node: {}
  }

  static propTypes = {
    node: React.PropTypes.object.isRequired
  }
}
