webpackHotUpdateyodda("app",{

/***/ "./src/js/BarChart.js":
/*!****************************!*\
  !*** ./src/js/BarChart.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BarChart; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BarChart =
/*#__PURE__*/
function () {
  function BarChart(opts) {
    var _this = this;

    _classCallCheck(this, BarChart);

    var self = this;
    self.el = d3.select(opts.el);
    self.city = opts.city;
    self.data = opts.data[self.city];
    this.margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 5
    };
    this.width = parseInt(this.el.style('width')) - this.margin.left - this.margin.right;
    this.height = parseInt(this.el.style('width')) * 0.4 - this.margin.top - this.margin.bottom;
    this.draw();
    window.addEventListener("resize", function () {
      _this.resize();
    });
  }

  _createClass(BarChart, [{
    key: "draw",
    value: function draw() {
      var _this2 = this;

      // moves the 'group' element to the top left margin
      this.el.html("");
      this.svg = this.el.append("svg").attr("width", this.width + this.margin.left + this.margin.right).attr("height", this.height + this.margin.top + this.margin.bottom).attr("class", "bar-svg");
      this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
      this.x = d3.scaleLinear().range([this.width, 0]);
      this.y = d3.scaleBand().rangeRound([0, this.height]).padding(0.1); // Scale the range of the data

      this.x.domain([0, d3.max(this.data, function (d) {
        return d.amount;
      })]);
      this.y.domain(this.data.map(function (d) {
        return d.contribution;
      }));
      this.g.selectAll("rect").data(this.data).enter().append("rect").attr("x", function (d) {
        return _this2.x(d.amount);
      }).attr("y", function (d) {
        return _this2.y(d.contribution);
      }).attr("height", this.y.bandwidth() / 2) // .attr("height", this.y.bandwidth())
      .attr("width", function (d) {
        return _this2.width - _this2.x(d.amount);
      }).attr("class", "rect").style("opacity", 0.9);
      this.g.append("g").attr("class", "x axis").attr("transform", "translate(0," + this.height + ")").call(d3.axisBottom(this.x).ticks(5));
      this.g.append("g").attr("class", "y axis").attr("transform", "translate(0,0)").call(d3.axisLeft(this.y));
      this.g.select('.y.axis').selectAll('text').attr('x', 10);
    }
  }, {
    key: "numberFormat",
    value: function numberFormat(d) {
      return d3.format(',')(d);
    }
  }, {
    key: "enter",
    value: function enter() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    }
  }, {
    key: "exit",
    value: function exit() {}
  }, {
    key: "resize",
    value: function resize() {
      this.width = parseInt(this.el.style('width')) - this.margin.left - this.margin.right;
      this.height = parseInt(this.el.style('width')) * 0.6 - this.margin.top - this.margin.bottom;
      this.draw();
    }
  }]);

  return BarChart;
}();



/***/ })

})
//# sourceMappingURL=app.1c6d0ab7cfd14516e610.hot-update.js.map