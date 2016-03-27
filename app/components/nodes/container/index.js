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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateCode: (newCode) => {
      dispatch(NodeActions.updateNode(ownProps.node.id, {
        code: newCode
      }));
    },
    sendCodeToKernal: (code) => {
      dispatch(NodeActions.sendToKernal(ownProps.node.id, code));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Renderer);
