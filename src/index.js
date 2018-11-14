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

  let citiesClone = [];
  let bucketsClone = [];
  let objectsClone = [];

  function pickRandomCity() {

    if (citiesClone.length === 0) {
      // Create a new clone of that array
      const cityList = Object.keys(contribution);
      cityList.forEach(function(item) {
        citiesClone.push(item);
      });
    }

    // Pick a random index from a given array
    const randomIndex = Math.floor(Math.random() * (citiesClone.length - 1));

    // Do the splice to get that object from that index
    const newCity = citiesClone[randomIndex];
    citiesClone.splice(randomIndex, 1);

    return newCity;

  }

  function pickRandomObject() {
    if (objectsClone.length === 0) {
      // Create a new clone of that array
      gifts.forEach(function(item) {
        objectsClone.push(item);
      });
    }

    // Pick a random index from a given array
    const randomIndex = Math.floor(Math.random() * (objectsClone.length - 1));

    // Do the splice to get that object from that index
    const currentGift = objectsClone[randomIndex];
    objectsClone.splice(randomIndex, 1);

    return currentGift;
  }

  function pickRandomBucket() {
    if (bucketsClone.length === 0) {
      let bucketList = ['less than 10', '11-15', '16-20', '21-30', '31-49', '50-100', '101-499', 'greater than 500'];
      bucketList.forEach(function(item) {
        bucketsClone.push(item);
      });
    }

    // Pick a random index from a given array
    const randomIndex = Math.floor(Math.random() * (bucketsClone.length - 1));

    // Do the splice to get that object from that index
    const currentBucket = bucketsClone[randomIndex];
    bucketsClone.splice(randomIndex, 1);

    return currentBucket;

  }

  function pickRandomScene() {
    const newCity = pickRandomCity();
    const currentBucket = pickRandomBucket();
    const currentGift = pickRandomObject();

    //logging data
    console.log('random scene funct working')
    console.log(newCity + ' ' + currentBucket);
    console.log('city array is ' + citiesClone);
    console.log('bucket array is ' + bucketsClone);
    // Send city and bucket and (data) to the BarChart class;

    // Send model, number of objects, and callback to three.js
    // model.replace(name, number, pickRandomScene);

    return {
      newCity,
      currentGift,
      currentBucket
    };

  }

  let {
    newCity,
    currentBucket,
    currentGift
  } = pickRandomScene();

  console.log(currentGift);

  console.log(newCity);

  const barChart = new BarChart({
    el: document.querySelector('.donations-chart'),
    data: contribution,
    city: newCity,
    bucket: currentBucket
  });

  const model = new RenderGift({
    el: giftPanelEl,
    model: currentGift.model,
    amount: Math.round(contribution[newCity].filter(d => d.contribution == currentBucket)[0].totalContribution / currentGift.price),
    callback: pickRandomCity()
  });


  if (cityPanelEl && giftPanelEl) {
    const cityPanel = new CityPanel(cityPanelEl);
    const giftPanel = new GiftPanel(giftPanelEl);

    function sampleUpdate() {

      // pickRandomScene();
      // City panel

      console.log('the real bucket is ' + currentBucket);

      let bucketInd;

      if (currentBucket === 'less than 10') {
        bucketInd = 0
      } else if (currentBucket === '11-15') {
        bucketInd = 1
      } else if (currentBucket === '16-20') {
        bucketInd = 2
      } else if (currentBucket === '21-30') {
        bucketInd = 3
      } else if (currentBucket === '31-49') {
        bucketInd = 4
      } else if (currentBucket === '50-100') {
        bucketInd = 5
      } else if (currentBucket === '101-499') {
        bucketInd = 6
      } else {
        bucketInd = 7
      };

      console.log(bucketInd);
      const bucket = currentBucket;
      const donations = contribution[newCity][bucketInd].amount;
      const donationSum = contribution[newCity][bucketInd].totalContribution;

      cityPanel.update(newCity, donations, bucket);

      // Gift panel
      const giftValue = currentGift[price];
      const giftItem = currentGift[name];
      const giftValueTotal = donationSum;
      const giftNumberTotal = giftValueTotal/giftValue;
      const giftItemPlural = currentGift[name_plural];

      giftPanel.update(giftValue, giftItem, giftValueTotal, giftNumberTotal, giftItemPlural);

      setTimeout(() => {
        cityPanel.toggleFrame(1);
        giftPanel.toggleFrame(1);
      }, 2000);
    }

    // document.addEventListener('keypress', (event) => {
    //   const keyName = event.key;
    //   if (keyName === '1') {
    //     sampleUpdate();
    //   }
    // });

    setTimeout(() => {
      console.log('let me hear this')
      sampleUpdate();
    }, 2000);
  }
}

window.addEventListener('DOMContentLoaded', App());