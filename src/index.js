import _ from 'lodash';
import './scss/style.scss'
// import cat from './images/cat.jpg';
import CityPanel from './js/CityPanel';
import GiftPanel from './js/GiftPanel';

function App() {
  const cityPanelEl = document.querySelector('.panel--city');
  const giftPanelEl = document.querySelector('.panel--gift');

  if (cityPanelEl && giftPanelEl) {
    const cityPanel = new CityPanel(cityPanelEl);
    const giftPanel = new GiftPanel(giftPanelEl);

    function sampleUpdate() {

      // City panel
      const city = 'Chicago';
      const donations = 8500;
      const bucket = [1000, 9999];

      cityPanel.update(city, donations, bucket);

      // Gift panel
      const giftValue = 1890;
      const giftItem = 'refugee housing unit';
      const giftValueTotal = 1200000;
      const giftNumberTotal = 98;
      const giftItemPlural = 'refugee housing units';

      giftPanel.update(giftValue, giftItem, giftValueTotal, giftNumberTotal, giftItemPlural);

      setTimeout(() => {
        cityPanel.toggleFrame(1);
        giftPanel.toggleFrame(1);
      }, 2000);
    }

    document.addEventListener('keypress', (event) => {
      const keyName = event.key;
      if (keyName === '1') {
        sampleUpdate();
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', App());
