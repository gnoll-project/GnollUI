import { connect } from 'react-redux';
import Renderer from './renderer';
import * as GUICreatorActions from '../../actions/gui-components';

function mapStateToProps(state, ownProps) {
  return {
    component: ownProps.component
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMouseDrag: (position) => {
      dispatch(GUICreatorActions.updateGUIComponentPosition(ownProps.component.id, position));
    }
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Renderer);
