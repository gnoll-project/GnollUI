
export const getInitializationCode = () => {
  return require('./init.py');
};

export const setGraph = (graphSpec) => {
  return `gc.parse_spec(json.loads('''${JSON.stringify(graphSpec)}'''))`;
};

export const setFunctionForNode = (nodeId, code) => {
  return `${code}\r\ngc.selection.find_by_id(${nodeId}).set_transform(f)`;
};
