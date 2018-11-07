webpackHotUpdateyodda("app",{

/***/ "./src/js/CityPanel.js":
/*!*****************************!*\
  !*** ./src/js/CityPanel.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CityPanel; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//  weak
var CityPanel =
/*#__PURE__*/
function () {
  function CityPanel(parentNode) {
    _classCallCheck(this, CityPanel);

    var self = this; // Registering HTML elements as class variables,
    // so we don't need to query the DOM again

    self.headerFrames = parentNode.querySelectorAll('.js-header-frame');
    self.citySpans = parentNode.querySelectorAll('.js-city');
    self.donationsTotal = parentNode.querySelector('.js-donations-total');
    self.donationsBucket = parentNode.querySelector('.js-donations-bucket');
  }

  _createClass(CityPanel, [{
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
    value: function update(city, donations, bucket) {
      var self = this;
      var citySpans = self.citySpans,
          donationsTotal = self.donationsTotal,
          donationsBucket = self.donationsBucket;
      console.log(donationsTotal, donationsBucket);
      Array.prototype.forEach.call(citySpans, function (el) {
        return el.innerHTML = city;
      });
      donationsTotal.innerHTML = "".concat(donations, " donatio\n    ns <br>");
      donationsBucket.innerHTML = "between $".concat(bucket[0], " and $").concat(bucket[1]);
      self.toggleFrame(0);
    }
  }]);

  return CityPanel;
}();



/***/ })

})
//# sourceMappingURL=app.d8a34162a19a78c8cdf2.hot-update.js.map