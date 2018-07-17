import React from 'react';
import { render } from 'react-dom';
import Dem from './home.js';

const rootElementa = document.querySelector('#root1');
if (rootElementa) {
  render(<Dem/>, rootElementa);
}