import fs from 'fs';
import uuid from 'node-uuid';
import spawnteract from 'spawnteract';
import { createShellSubject } from 'enchannel-zmq-backend';
import languages from './languages';
import { initialPayload, generatePayload } from './utils';

const CURRENT_LANGUAGE = 'python2';
const language = languages[CURRENT_LANGUAGE];

const identity = uuid.v4();

let shell, kernel;

const _runCodeInKernal = (cmd) => {
  console.log('running code:');
  console.log(cmd);
  const payload = generatePayload(cmd);
  shell.next(payload);
}

export const shutdown = () => {
  console.log('kernel shutdown');
  kernel.spawn.kill();
  fs.unlink(kernel.connectionFile);
}

export const setup = () => {
  return spawnteract.launch(CURRENT_LANGUAGE).then((k) => {
    kernel = k;
    shell = createShellSubject(identity, kernel.config);
    shell
     .subscribe(message => {
       if (message.content.status && message.content.status !== 'ok') {
         console.log(message.content);
       }
     });

     shell.next(initialPayload);
     shell.next(generatePayload(language.getInitializationCode()));
  });
}

export const syncGraph = (graphSpec) => {
  // filter out the un-used properties
  const nodes = graphSpec.nodes.map((node) => {
    const { id, nodeType } = node;
    return {
      id,
      nodeType
    };
  });

  _runCodeInKernal(language.setGraph({
    nodes: nodes,
    edges: graphSpec.edges
  }));
};

export const setFunctionForNode = (nodeId, f) => {
  _runCodeInKernal(language.setFunctionForNode(nodeId, f));
};
