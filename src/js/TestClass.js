import { map, constrain } from './util';

export default class TestClass {
  constructor(parentNode) {
    const self = this;
    self.someClassVar = 'hi there';
    self.createElements(parentNode);
  }

  createElements(parentNode) {
    const self = this;
    const { someClassVar } = self;

    let element = document.createElement('div');
    element.innerHTML = someClassVar;

    parentNode.appendChild(element);
  }
}
