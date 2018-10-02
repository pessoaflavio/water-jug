import _ from 'lodash';
import './scss/style.scss'
import cat from './images/cat.jpg';
import TestClass from './js/TestClass';
import CityPanel from './js/CityPanel';

function App() {
  const cityPanelEl = document.querySelector('.panel--city');
  const giftPanelEl = document.querySelector('.panel--gift');

  if (cityPanelEl && giftPanelEl) {
    const cityPanel = new CityPanel(cityPanelEl);

    // Example update for panel #1:
    function sampleUpdatePanel1() {
      const city = 'Chicago';
      const donations = 8500;
      const bucket = [1000, 9999];

      cityPanel.update(city, donations, bucket);

      setTimeout(() => {
        console.log('hello');
        cityPanel.toggleFrame(1);
      }, 2000);
    }

    document.addEventListener('keypress', (event) => {
      const keyName = event.key;
      if (keyName === '1') {
        sampleUpdatePanel1();
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', App());
