// @flow weak

export default class GiftPanel {

  headerFrames: Array<HTMLElement>;
  giftValue: HTMLElement;
  giftItem: HTMLElement;
  giftValueTotal: HTMLElement;
  giftNumberTotal: HTMLElement;
  giftItemPlural: HTMLElement;

  constructor(parentNode) {
    const self = this;

    // Registering HTML elements as class variables,
    // so we don't need to query the DOM again
    self.headerFrames = parentNode.querySelectorAll('.js-header-frame');
    self.giftValue = parentNode.querySelector('js-gift-value');
    self.giftItem = parentNode.querySelector('');
    self.giftValueTotal = parentNode.querySelector('');
    self.giftNumberTotal = parentNode.querySelector('');
    self.giftItemPlural = parentNode.querySelector('');
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

    Array.prototype.forEach.call(citySpans, el => el.innerHTML = city);
    donationsTotal.innerHTML = `${donations} donations`;
    donationsBucket.innerHTML = `between $${bucket[0]} and $${bucket[1]}`;

    self.toggleFrame(0);
  }
}
