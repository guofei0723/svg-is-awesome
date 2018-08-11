import React from 'react';
import ReactDOM from 'react-dom';

export function runInRoot (Comp) {
  ReactDOM.render(<Comp />, document.getElementById('root'))
}