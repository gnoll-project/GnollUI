import fs from 'fs';
import uuid from 'node-uuid';
import spawnteract from 'spawnteract';
import { createShellSubject } from 'enchannel-zmq-backend';
import languages from './languages';
import { initialPayload, generatePayload } from './utils';

const CURRENT_LANGUAGE = 'python2';
const language = languages[CURRENT_LANGUAGE];

const identity = uuid.v4();
const sessionId = uuid.v4();

let shell, kernel;

export const runCodeInKernal = (cmd) => {
  const payload = generatePayload(cmd, sessionId);
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
   .subscribe(content => {
     console.log(content);
   });

   shell.next(initialPayload);
   shell.next(generatePayload(language.getInitializationCode(), generatePayload));
});
}

export const syncGraph = () => {
  runCodeInKernal(language.setGraph());
};
