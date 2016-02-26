import { connect } from 'react-redux';
import Renderer from './renderer';
import * as UIActions from '../../../../actions/ui';

function mapStateToProps(state, ownProps) {
  return {
    component: ownProps.component,
    selectedComponent: state.ui.componentToAdd
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => {
      dispatch(UIActions.selectComponentToAdd(ownProps.component));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Renderer);
