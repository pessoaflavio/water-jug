// @flow weak
import { numbercommas } from '../js/util';

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
    self.giftValue = parentNode.querySelector('.js-gift-value');
    self.giftItem = parentNode.querySelector('.js-gift-item');
    self.giftValueTotal = parentNode.querySelector('.js-gift-value-total');
    self.giftNumberTotal = parentNode.querySelector('.js-gift-number-total');
    self.giftItemPlural = parentNode.querySelector('.js-gift-item-plural');

    console.log(self);
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
    value: number,
    item: string,
    valueTotal: number,
    numberTotal: number,
    itemPlural: string) {

    const self = this;
    const {
      giftValue,
      giftItem,
      giftValueTotal,
      giftNumberTotal,
      giftItemPlural } = self;

    const formValue = numbercommas(value);
    const formTotalValue = numbercommas(valueTotal);

    giftValue.innerHTML = `$${formValue}`;
    giftItem.innerHTML = item;
    giftValueTotal.innerHTML = `$${formTotalValue}`;
    giftNumberTotal.innerHTML = numberTotal.toString();
    giftItemPlural.innerHTML = itemPlural;

    self.toggleFrame(0);
  }
}
