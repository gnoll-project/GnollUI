import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import configureStore from './store/configure-store';
import net from 'net';

const store = configureStore();
export const sockets = [];

net.createServer((socket) => {
  socket.on('data', (data) => {
    try {
      const action = JSON.parse(data);
      store.dispatch(action);
    } catch(e) {
    }
  });
}).listen(7999);


render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
