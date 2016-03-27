import { connect } from 'react-redux';
import Renderer from './renderer';
import * as UIActions from '../../../actions/ui';
import * as EdgeActions from '../../../actions/edges';
import * as NodeActions from '../../../actions/nodes';

function mapStateToProps(state, ownProps) {
  return {
    node: ownProps.node,
    selectedNode: state.ui.selectedNode
  };
}

export default connect(mapStateToProps)(Renderer);
