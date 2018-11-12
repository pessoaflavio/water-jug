import _ from 'lodash';
import './scss/style.scss'
// import cat from './images/cat.jpg';
import CityPanel from './js/CityPanel';
import GiftPanel from './js/GiftPanel';
import BarChart from './js/BarChart';
import RenderGift from './js/RenderGift';

import contribution from './data/contribution.json';
import gifts from './data/giftList.json';

function App() {
  const cityPanelEl = document.querySelector('.panel--city');
  const giftPanelEl = document.querySelector('.panel--gift');

  // const currentCity = "New York"

  let citiesClone = [];
  let bucketsClone = [];
  let objectsClone = [];

  function pickRandomCity() {

    if (citiesClone.length === 0) {
      // Create a new clone of that array
      const cityList = Object.keys(contribution);
      cityList.forEach(function(item){
        citiesClone.push(item);
      });
    }

    // Pick a random index from a given array
    const randomIndex = Math.floor(Math.random() * objectsClone.length);

    // Do the splice to get that object from that index
    const object = objectsClone[randomIndex];
    objectsClone.splice(randomIndex, 1);

    return city;

  }

  function pickRandomObject() {
    if (objectsClone.length === 0) {
      // Create a new clone of that array
      gits.forEach(function(item){
        objectsClone.push(item);
      });
    }

    // Pick a random index from a given array
    const randomIndex = Math.floor(Math.random() * objectsClone.length);

    // Do the splice to get that object from that index
    const object = objectsClone[randomIndex];
    objectsClone.splice(randomIndex, 1);

    return object;
  }

  function pickRandomBucket() {
    if (bucketsClone.length === 0) {
      let bucketList = ['less than 10', '11-15', '16-20', '21-30', '31-49', '50-100', '101-499', 'greater than 500'];
      bucketList.forEach(function(item){
        bucketsClone.push(item);
      });
    }

    // Pick a random index from a given array
    const randomIndex = Math.floor(Math.random() * bucketsClone.length);

    // Do the splice to get that object from that index
    const currentBucket = bucketsClone[randomIndex];
    bucketsClone.splice(randomIndex, 1);

    return bucket;

  }

  function pickRandomScene() {
    const currentCity = pickRandomCity();
    const currentBucket = pickRandomBucket();
    const currentGift = pickRandomObject();

    // Send city and bucket and (data) to the BarChart class;

    // Send model, number of objects, and callback to three.js
    // model.replace(name, number, pickRandomScene);

  }

  const barChart = new BarChart({
    el: document.querySelector('.donations-chart'),
    data: contribution,
    city: currentCity,
    bucket: currentBucket
  });

  const model = new RenderGift({
    el: giftPanelEl,
    model: "jerrycan"
  });

  if (cityPanelEl && giftPanelEl) {
    const cityPanel = new CityPanel(cityPanelEl);
    const giftPanel = new GiftPanel(giftPanelEl);

    function sampleUpdate() {

      // City panel
      const city = currentCity;
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
