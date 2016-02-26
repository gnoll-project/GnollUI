import { connect } from 'react-redux';
import Renderer from './renderer';
import * as GUICreatorActions from '../../../actions/gui-components';

function mapStateToProps(state) {
  return {
    guiComponents: state.guiComponents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: (e) => {
      dispatch(GUICreatorActions.addGUIComponent({
        x: e.clientX,
        y: e.clientY
      }));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Renderer);
