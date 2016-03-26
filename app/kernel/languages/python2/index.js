
export const getInitializationCode = () => {
  return require('./init.py');
};

export const setGraph = (graphSpec) => {
  return `gc.parse_spec(json.loads('${JSON.stringify(graphSpec)}'))`;
};
