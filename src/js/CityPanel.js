// @flow weak
import { numbercommas } from '../js/util';

export default class CityPanel {

  headerFrames: Array<HTMLElement>;
  citySpans: Array<HTMLElement>;
  donationsTotal: HTMLElement;
  donationsBucket: HTMLElement;

  constructor(parentNode) {
    const self = this;

    // Registering HTML elements as class variables,
    // so we don't need to query the DOM again
    self.headerFrames = parentNode.querySelectorAll('.js-header-frame');
    self.citySpans = parentNode.querySelectorAll('.js-city');
    self.donationsTotal = parentNode.querySelector('.js-donations-total');
    self.donationsBucket = parentNode.querySelector('.js-donations-bucket');
  }

  toggleFrame(frameNumber: 0 | 1) {
    const self = this;
    const { headerFrames } = self;

    Array.prototype.forEach.call(headerFrames, (el, i) => {
      if (i === frameNumber) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  update(
    city: string,
    donations: number,
    bucket: string) {

    const self = this;
    const { citySpans, donationsTotal, donationsBucket } = self;
    console.log(donationsTotal, donationsBucket);
    const formDon = numbercommas(donations);
    Array.prototype.forEach.call(citySpans, el => el.innerHTML = city);
    donationsTotal.innerHTML = `${formDon} donations<br>`;

    if (bucket === 'less than 10' || bucket === 'greater than 500') {
      const nameSplit = bucket.split(' ');
      donationsBucket.innerHTML = `that were ${nameSplit[0]} ${nameSplit[1]} $${nameSplit[2]}`;
      console.log('first conditional');
    } else if (bucket === '11-15' || bucket === '16-20' || bucket === '21-30' || bucket === '31-49' || bucket === '50-100') {
      const nameSplit = bucket.split('-');
      donationsBucket.innerHTML = `between $${nameSplit[0]} and $${nameSplit[1]}`;
      console.log('second conditional');
    };

    self.toggleFrame(0);
  }
}
