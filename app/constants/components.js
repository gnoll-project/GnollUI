// IMPORT REACT COMPNENTS
import DataComponent from '../components/nodes/data';
import SliderComponent from '../components/nodes/transform/slider';
import LineComponent from '../components/nodes/sink/line';
import ScatterComponent from '../components/nodes/sink/scatter';

export const DATA_NODE = 'DATA_NODE';
export const TRANSFORM_NODE = 'TRANSFORM_NODE';
export const SINK_NODE = 'SINK_NODE';

export const NODE_TYPES = [DATA_NODE, TRANSFORM_NODE, SINK_NODE];


// COMPONENT TYPES
// data
export const DATA_COMPONENT = 'DATA_COMPONENT';

// transform
export const SLIDER_COMPONENT = 'SLIDER_COMPONENT';

// sink
export const SCATTER_COMPONENT = 'SCATTER_COMPONENT';
export const LINE_COMPONENT = 'LINE_COMPONENT';


export const COMPONENTS = {
  DATA_NODE: [DATA_COMPONENT],
  TRANSFORM_NODE: [SLIDER_COMPONENT],
  SINK_NODE: [SCATTER_COMPONENT, LINE_COMPONENT]
};

export const REACT_COMPONENT_MAP = {
  DATA_COMPONENT: DataComponent,
  SLIDER_COMPONENT: SliderComponent,
  LINE_COMPONENT: LineComponent,
  SCATTER_COMPONENT: ScatterComponent
};

export const getNodeType = (node) => {
  const component = node.component;
  const nodeTypes = NODE_TYPES.filter((t) => {
    return COMPONENTS[t].indexOf(component) > -1;
  });

  if (nodeTypes.length) {
    return nodeTypes[0];
  }
}
