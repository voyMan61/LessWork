import React from 'react';
import { render } from 'react-dom';
import M from './home.js'


const rootElementb = document.querySelector('#root');
if (rootElementb) {
  render(<M />, rootElementb);
}
