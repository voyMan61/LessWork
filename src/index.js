import React from 'react';
import { render } from 'react-dom';
import M from './home.js'
import T from './components/test.js'
const rootElementb = document.querySelector('#main');
if (rootElementb) {
  render(<M/>, rootElementb);
}
