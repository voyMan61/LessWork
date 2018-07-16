import React from 'react';
import { render } from 'react-dom';
import Dem from './home.js';
import Demo from './components/sidebar.js';
import Dem1 from './test.js'
import Demo2 from './components/patternActivity.js';
import Demo1 from './components/staffView.js';
      
const rootElementa = document.querySelector('#root1');
if (rootElementa) {
  render(<Dem/>, rootElementa);
}