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
    bucket: [number, number]) {

    const self = this;
    const { citySpans, donationsTotal, donationsBucket } = self;
    console.log(donationsTotal, donationsBucket);
    const formDon = numbercommas(donations);
    Array.prototype.forEach.call(citySpans, el => el.innerHTML = city);
    donationsTotal.innerHTML = `${formDon} donations<br>`;
    donationsBucket.innerHTML = `between $${bucket[0]} and $${bucket[1]}`;

    self.toggleFrame(0);
  }
}
