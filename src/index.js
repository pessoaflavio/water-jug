// @flow weak

import _ from 'lodash';
import './scss/style.scss'
import cat from './images/cat.jpg';
import TestClass from './js/TestClass';

function square(n) {
  return n * n;
}
square("2");

function App() {
  let element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const testClass = new TestClass(element);

  return element;
}

document.body.appendChild(App());
