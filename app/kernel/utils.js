import uuid from 'node-uuid';

export const generatePayload = (cmd, sessionId) => {
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


export const initialPayload = {
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
