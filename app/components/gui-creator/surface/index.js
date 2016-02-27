import { connect } from 'react-redux';
import Renderer from './renderer';
import * as NodeActions from '../../../actions/nodes';

function mapStateToProps(state) {
  return {
    nodes: state.nodes,
    edges: state.edges,
    componentToAdd: state.ui.componentToAdd,
    selectedNode: state.ui.selectedNode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: (properties) => {
      dispatch(NodeActions.addNode(properties));
    },
    deleteNode: (node) => {
      dispatch(NodeActions.removeNode(node.id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Renderer);
