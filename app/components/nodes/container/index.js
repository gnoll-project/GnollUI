import { connect } from 'react-redux';
import Renderer from './renderer';
import * as UIActions from '../../../actions/ui';
import * as EdgeActions from '../../../actions/edges';
import * as NodeActions from '../../../actions/nodes';

import { runCodeInKernal } from '../../../kernel';
console.log(UIActions)

function mapStateToProps(state, ownProps) {
  return {
    node: ownProps.node,
    selectedNode: state.ui.selectedNode
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    selectNode: (node) => {
      dispatch(UIActions.selectNode(node));
    },

    unselectNode: (node) => {
      dispatch(UIActions.unselectNode());
    },

    toggleEdge: (fromNode, toNode) => {
      dispatch(EdgeActions.toggleEdge(fromNode.id, toNode.id));
    },

    updateCode: (newCode) => {
      dispatch(NodeActions.updateNode(ownProps.node.id, {
        code: newCode
      }));
    },

    sendCodeToKernal: (code) => {
      // dispatch(NodeActions.sendToKernal(ownProps.node.id, code));
      runCodeInKernal(code);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Renderer);
