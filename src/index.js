import React from 'react';
import { render } from 'react-dom';
import M from './home.js'
import StaffTots from './components/staffTotals.js' 
import Test from './components/test.js'

const rootElementb = document.querySelector('#root');
if (rootElementb) {
  render(<M/>, rootElementb);
}
