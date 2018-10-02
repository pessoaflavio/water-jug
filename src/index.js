import _ from 'lodash';
import './scss/style.scss'
import cat from './images/cat.jpg';
import TestClass from './js/TestClass';
import CityPanel from './js/CityPanel';

function App() {
  let element = document.createElement('div');
  console.log('hello');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const testClass = new TestClass(element);

  const cityPanelEl = document.querySelector('.panel--city');
  if (cityPanelEl) {
    const cityPanel = new CityPanel(cityPanelEl);
  }

  return element;
}

document.body.appendChild(App());
