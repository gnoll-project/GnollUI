import fs from 'fs';
import uuid from 'node-uuid';
import spawnteract from 'spawnteract';
import { createShellSubject } from 'enchannel-zmq-backend';

const identity = uuid.v4();
const sessionId = uuid.v4();

let shell, kernel;


const generatePayload = (cmd) => {
  const msgId = uuid.v4();
  return {
    header: {
      msg_id: 'execute_' + msgId,
      username: 'gnoll',
      session: sessionId,
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
  const payload = generatePayload(cmd);
  shell.next(payload);
}

export const shutdown = () => {
  console.log('kernel shutdown');
  kernel.spawn.kill();
  fs.unlink(kernel.connectionFile);
}

export const setup = () => {
  console.log('kernel setup');
    return spawnteract.launch('python2').then((k) => {
    kernel = k;

    const request = {
      header: {
        username: 'gnoll',
        sessionId,
        msg_type: 'kernel_info_request',
        msg_id: uuid.v4(),
        date: new Date(),
        version: '5.0',
      },
      metadata: {},
      parent_header: {},
      content: {},
    };

    shell = createShellSubject(identity, kernel.config);
    shell
     .subscribe(content => {
       console.log(content);
     });

     const initialPython = require('./init.py');

     shell.next(request);
     shell.next(generatePayload(initialPython))
  });
}
