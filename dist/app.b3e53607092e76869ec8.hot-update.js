webpackHotUpdateyodda("app",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_CityPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/CityPanel */ "./src/js/CityPanel.js");
/* harmony import */ var _js_GiftPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/GiftPanel */ "./src/js/GiftPanel.js");
/* harmony import */ var _js_BarChart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/BarChart */ "./src/js/BarChart.js");
/* harmony import */ var _js_RenderGift__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/RenderGift */ "./src/js/RenderGift.js");
/* harmony import */ var _data_contribution_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data/contribution.json */ "./src/data/contribution.json");
var _data_contribution_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data/contribution.json */ "./src/data/contribution.json", 1);

 // import cat from './images/cat.jpg';







function App() {
  var cityPanelEl = document.querySelector('.panel--city');
  var giftPanelEl = document.querySelector('.panel--gift');
  var currentCity = "New York";
  var barChart = new _js_BarChart__WEBPACK_IMPORTED_MODULE_4__["default"]({
    el: document.querySelector('.donations-chart'),
    data: _data_contribution_json__WEBPACK_IMPORTED_MODULE_6__,
    city: currentCity
  });
  var model = new _js_RenderGift__WEBPACK_IMPORTED_MODULE_5__["default"]({
    el: giftPanelEl,
    model: "vaccines"
  });

  if (cityPanelEl && giftPanelEl) {
    var sampleUpdate = function sampleUpdate() {
      // City panel
      var city = currentCity;
      var donations = 8500;
      var bucket = [1000, 9999];
      cityPanel.update(currentCity, donations, bucket); // Gift panel

      var giftValue = 1890;
      var giftItem = 'refugee housing unit';
      var giftValueTotal = 1200000;
      var giftNumberTotal = 98;
      var giftItemPlural = 'refugee housing units';
      giftPanel.update(giftValue, giftItem, giftValueTotal, giftNumberTotal, giftItemPlural);
      setTimeout(function () {
        cityPanel.toggleFrame(1);
        giftPanel.toggleFrame(1);
      }, 2000);
    };

    var cityPanel = new _js_CityPanel__WEBPACK_IMPORTED_MODULE_2__["default"](cityPanelEl);
    var giftPanel = new _js_GiftPanel__WEBPACK_IMPORTED_MODULE_3__["default"](giftPanelEl);
    document.addEventListener('keypress', function (event) {
      var keyName = event.key;

      if (keyName === '1') {
        sampleUpdate();
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', App());

/***/ })

})
//# sourceMappingURL=app.b3e53607092e76869ec8.hot-update.js.map