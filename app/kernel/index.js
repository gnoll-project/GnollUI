import fs from 'fs';
import uuid from 'node-uuid';
import spawnteract from 'spawnteract';
import { createShellSubject } from 'enchannel-zmq-backend'

const identity = uuid.v4();
const sessionId = uuid.v4();

let shell = null;


const generatePayload = (cmd) => {
  const msgId = uuid.v4();
  return {
    header: {
      msg_id: 'execute_' + msgId,
      username: 'gnoll',
      session: session,
      msg_type: 'execute_request',
      version: '5.0',
    },
    content: {
      code: cmd,
      silent: false,
      store_history: true,
      user_expressions: {},
      allow_stdin: false,
    },
  }
};

export const runCodeInKernal = (cmd) => {
  return shell.next(generatePayload(cmd));
}

export const setup = () => {

  spawnteract.launch('python3').then((kernel) => {
    shell = createShellSubject(identity, kernel.config);
    shell.subscribe(console.log);
    //
    // /// TODO - initialize gnoll python code
  });
}
