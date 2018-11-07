webpackHotUpdateyodda("app",{

/***/ "./src/js/GiftPanel.js":
/*!*****************************!*\
  !*** ./src/js/GiftPanel.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GiftPanel; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//  weak
var GiftPanel =
/*#__PURE__*/
function () {
  function GiftPanel(parentNode) {
    _classCallCheck(this, GiftPanel);

    var self = this; // Registering HTML elements as class variables,
    // so we don't need to query the DOM again

    self.headerFrames = parentNode.querySelectorAll('.js-header-frame');
    self.giftValue = parentNode.querySelector('.js-gift-value');
    self.giftItem = parentNode.querySelector('.js-gift-item');
    self.giftValueTotal = parentNode.querySelector('.js-gift-value-total');
    self.giftNumberTotal = parentNode.querySelector('.js-gift-number-total');
    self.giftItemPlural = parentNode.querySelector('.js-gift-item-plural');
    console.log(self);
  }

  _createClass(GiftPanel, [{
    key: "toggleFrame",
    value: function toggleFrame(frameNumber) {
      var self = this;
      var headerFrames = self.headerFrames;
      Array.prototype.forEach.call(headerFrames, function (el, i) {
        if (i === frameNumber) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    }
  }, {
    key: "update",
    value: function update(value, item, valueTotal, numberTotal, itemPlural) {
      var self = this;
      var giftValue = self.giftValue,
          giftItem = self.giftItem,
          giftValueTotal = self.giftValueTotal,
          giftNumberTotal = self.giftNumberTotal,
          giftItemPlural = self.giftItemPlural;
      giftValue.innerHTML = "".concat(value);
      giftItem.innerHTML = item;
      giftValueTotal.innerHTML = "$".concat(valueTotal);
      giftNumberTotal.innerHTML = numberTotal.toString();
      giftItemPlural.innerHTML = itemPlural;
      self.toggleFrame(0);
    }
  }]);

  return GiftPanel;
}();



/***/ })

})
//# sourceMappingURL=app.03cf9fbb192dfae9fb13.hot-update.js.map